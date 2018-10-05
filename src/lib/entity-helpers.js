const getEntityFormField = (field, index, total, numRelationships) => {
  const isFieldRequired = field.fieldValidateRules && field.fieldValidateRules.includes('required')
  let tcombFieldType = 't.String'
  // todo - handle constraints, relationships
  if (field.fieldType === 'Integer' || field.fieldType === 'Long' || field.fieldType === 'Float' ||
    field.fieldType === 'Decimal' || field.fieldType === 'Double' || field.fieldType === 'BigDecimal') {
    tcombFieldType = 't.Number'
  } else if (field.fieldType === 'LocalDate' || field.fieldType === 'Instant' || field.fieldType === 'ZonedDateTime') {
    tcombFieldType = 't.Date'
  } else if (field.fieldType === 'Boolean') {
    tcombFieldType = 't.Boolean'
  } else if (field.fieldIsEnum) {
    tcombFieldType = field.fieldType
  }
  return `${field.fieldName}: ${!isFieldRequired ? 't.maybe(' : ''}${tcombFieldType}${isFieldRequired ? '' : ')'}${(numRelationships !== 0 || index !== total - 1) ? ',' : ''}`
}

module.exports = {
  getEntityFormField
}
