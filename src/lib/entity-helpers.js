const getEntityFormField = (field, index, total) => {
  const isFieldRequired = field.fieldValidateRules && field.fieldValidateRules.includes('required')

  let tcombFieldType = 't.String'
  // todo handle enums, constraints, relationships
  if (field.fieldType === 'Integer' || field.fieldType === 'Long' || field.fieldType === 'Float' ||
    field.fieldType === 'Decimal' || field.fieldType === 'Double' || field.fieldType === 'BigDecimal') {
    tcombFieldType = 't.Number'
  } else if (field.fieldType === 'LocalDate' || field.fieldType === 'Instant' || field.fieldType === 'ZonedDateTime') {
    tcombFieldType = 't.Date'
  } else if (field.fieldType === 'Boolean') {
    tcombFieldType = 't.Boolean'
  }
  return `${field.fieldName}: ${!isFieldRequired ? 't.maybe(' : ''}${tcombFieldType}${isFieldRequired ? '' : ')'}${index !== total - 1 ? ',' : ''}`
}

module.exports = {
  getEntityFormField
}
