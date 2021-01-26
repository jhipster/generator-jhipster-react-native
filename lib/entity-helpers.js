const _ = require('lodash');
// todo - handle constraints, relationships

const getEntityFormFieldType = field => {
  const fieldType = field.fieldType;
  const fieldIsEnum = field.fieldIsEnum;
  if (fieldType === 'String') {
    return 'text';
  }
  if (
    fieldType === 'Integer' ||
    fieldType === 'Long' ||
    fieldType === 'Float' ||
    fieldType === 'Decimal' ||
    fieldType === 'Double' ||
    fieldType === 'BigDecimal'
  ) {
    return 'number';
  }
  if (fieldType === 'LocalDate') {
    return 'date';
  }
  if (fieldType === 'Instant' || fieldType === 'ZonedDateTime') {
    return 'datetime';
  }
  if (fieldType === 'Boolean') {
    return 'boolean';
  }
  if (fieldIsEnum) {
    return 'select-one';
  }
  return 'text';
};

const getEntityFormFieldAttributes = (fieldType, fieldName, fieldIsEnum, nextFieldName, numRelationships) => {
  const fieldNameHumanized = _.startCase(fieldName);
  let attributes = `
        name='${fieldName}'
        ref={${fieldName}Ref}
        label='${fieldNameHumanized}'
        placeholder='Enter ${fieldNameHumanized}'
        testID='${fieldName}Input'
        `;
  if (fieldType === 'String') {
    attributes += `
        inputType='text'
        autoCapitalize='none'
        `;
  } else if (
    fieldType === 'Integer' ||
    fieldType === 'Long' ||
    fieldType === 'Float' ||
    fieldType === 'Decimal' ||
    fieldType === 'Double' ||
    fieldType === 'BigDecimal'
  ) {
    attributes += `
        inputType='number'
        `;
  } else if (fieldType === 'LocalDate') {
    attributes += `
        inputType='date'
        `;
  } else if (fieldType === 'Instant' || fieldType === 'ZonedDateTime') {
    attributes += `
        inputType='datetime'
        `;
  } else if (fieldType === 'Boolean') {
    attributes += `
        inputType='boolean'
        `;
  } else if (fieldIsEnum) {
    attributes += `
        inputType='select-one'
        listItems={${fieldType}}
        `;
  }

  if (nextFieldName) {
    attributes += `
        onSubmitEditing={() => ${nextFieldName}Ref.current?.focus()}
        `;
  } else if (numRelationships === 0) {
    attributes += `
        onSubmitEditing={() => formRef.current?.submitForm()}
        `;
  }
  return attributes;
};

const getEntityFormField = (field, nextFieldName, numRelationships) => {
  const fieldType = field.fieldType;
  const fieldName = field.fieldName;
  const fieldIsEnum = field.fieldIsEnum;

  if (field.fieldType === 'byte[]' && field.fieldTypeBlobContent !== 'text') {
    // need to add a contentType input for blobs
    const attributes = getEntityFormFieldAttributes(fieldType, fieldName, fieldIsEnum, `${fieldName}ContentType`, numRelationships);
    const attributesContentType = getEntityFormFieldAttributes('String', `${fieldName}ContentType`, false, nextFieldName, numRelationships);
    return `<FormField ${attributes} />
<FormField ${attributesContentType} />`;
  }
  const attributes = getEntityFormFieldAttributes(fieldType, fieldName, fieldIsEnum, nextFieldName, numRelationships);
  return `<FormField ${attributes} />`;
};

const getRelationshipFormField = relation => {
  const ref = relation.relationshipType === 'many-to-many' ? `${relation.relationshipNamePlural}Ref` : `${relation.relationshipName}Ref`;
  const inputType = relation.relationshipType === 'many-to-many' ? 'select-multiple' : 'select-one';
  const testID = `${relation.otherEntityName}SelectInput`;
  const name = relation.relationshipType === 'many-to-many' ? relation.relationshipNamePlural : relation.relationshipName;

  return `<FormField
  name="${name}"
  inputType="${inputType}"
  ref={${ref}}
  listItems={${relation.otherEntityName}List}
  listItemLabelField="${relation.otherEntityField || 'id'}"
  label="${relation.relationshipNameHumanized}"
  placeholder="Select ${relation.relationshipNameHumanized}"
  testID="${testID}"
/>`;
};

const getFieldValidateType = fieldType => {
  let fieldValidateType;
  switch (fieldType) {
    case 'LocalDate':
    case 'ZonedDateTime':
    case 'Instant':
      fieldValidateType = 'date';
      break;
    case 'Integer':
    case 'Long':
    case 'Float':
    case 'Double':
    case 'BigDecimal':
      fieldValidateType = 'number';
      break;
    case 'Boolean':
      fieldValidateType = 'boolean';
      break;
    case 'byte[]':
    case 'String':
    case 'Duration':
    default:
      fieldValidateType = 'string';
  }
  return fieldValidateType;
};

module.exports = {
  getEntityFormField,
  getEntityFormFieldType,
  getRelationshipFormField,
  getFieldValidateType,
};
