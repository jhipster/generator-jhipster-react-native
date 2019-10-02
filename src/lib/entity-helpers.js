const pluralize = require('pluralize')

const getEntityFormField = (field, index, total, numRelationships) => {
  const isFieldRequired = field.fieldValidateRules && field.fieldValidateRules.includes('required')
  let tcombFieldType = 't.String'
  // todo - handle constraints, relationships
  if (
    field.fieldType === 'Integer' ||
    field.fieldType === 'Long' ||
    field.fieldType === 'Float' ||
    field.fieldType === 'Decimal' ||
    field.fieldType === 'Double' ||
    field.fieldType === 'BigDecimal'
  ) {
    tcombFieldType = 't.Number'
  } else if (field.fieldType === 'LocalDate' || field.fieldType === 'Instant' || field.fieldType === 'ZonedDateTime') {
    tcombFieldType = 't.Date'
  } else if (field.fieldType === 'Boolean') {
    tcombFieldType = 't.Boolean'
  } else if (field.fieldIsEnum) {
    tcombFieldType = field.fieldType
  }
  return `${field.fieldName}: ${!isFieldRequired ? 't.maybe(' : ''}${tcombFieldType}${isFieldRequired ? '' : ')'}${
    numRelationships !== 0 || index !== total - 1 ? ',' : ''
  }`
}

const getRelationshipFormField = (relation, index, total, props) => {
  const relationshipType = relation.relationshipType
  const ownerSide = relation.ownerSide
  if (relationshipType === 'many-to-one' || (relationshipType === 'one-to-one' && ownerSide === true)) {
    return `${relation.otherEntityName}Id: this.get${props.pascalCase(relation.otherEntityNamePlural)}()${index !== total - 1 ? ',' : ''}`
  } else if (relationshipType === 'many-to-many' && ownerSide === true) {
    return `${pluralize(relation.relationshipNamePlural)}: t.list(this.get${props.pascalCase(relation.otherEntityNamePlural)}())${
      index !== total - 1 ? ',' : ''
    }`
  }
}

module.exports = {
  getEntityFormField,
  getRelationshipFormField,
}
