const pluralize = require('pluralize');
const _ = require('lodash');
// todo - handle constraints, relationships

const getEntityFormField = (field, nextFieldName, numRelationships) => {
    const fieldType = field.fieldType;
    const fieldName = field.fieldName;
    const fieldNameHumanized = _.startCase(fieldName);
    let attributes = `
        name='${fieldName}'
        ref={${fieldName}Ref}
        label='${fieldNameHumanized}'
        placeholder='Enter ${fieldNameHumanized}'
        testID='${field.fieldName}Input'
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
    } else if (field.fieldIsEnum) {
        attributes += `
        inputType='list'
        listItems={${field.fieldType}}
        `;
    }

    if (nextFieldName) {
        attributes += `
        onSubmitEditing={() => ${nextFieldName}Ref.current?.focus()}
        `;
    } else {
        attributes += `
        onSubmitEditing={() => formRef.current?.submitForm()}
        `;
    }

    return attributes;
};

const getRelationshipFormField = (relation, index, total, context) => {
    const relationshipType = relation.relationshipType;
    const ownerSide = relation.ownerSide;
    if (relationshipType === 'many-to-one' || (relationshipType === 'one-to-one' && ownerSide === true)) {
        return `${relation.otherEntityName}Id: this.get${context.pascalCase(relation.otherEntityNamePlural)}()${
            index !== total - 1 ? ',' : ''
        }`;
    }
    if (relationshipType === 'many-to-many' && ownerSide === true) {
        return `${pluralize(relation.relationshipNamePlural)}: t.list(this.get${context.pascalCase(relation.otherEntityNamePlural)}())${
            index !== total - 1 ? ',' : ''
        }`;
    }
    return '';
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
    getRelationshipFormField,
    getFieldValidateType,
};
