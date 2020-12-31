import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default React.forwardRef((props, ref) => {
  const { children, initialValues = {}, onSubmit = (d) => console.log(d), validationSchema = Yup.object().shape({}) } = props;

  // get list of field names
  const fields = children.filter((c) => c && c.props && c.props.name).map((c) => ({ name: c.props.name, inputType: c.props.inputType }));
  const fieldNames = fields.map((field) => field.name);

  // ensure an initial value is provided for each field
  fields.forEach(({ name, inputType }) => {
    if (!initialValues[name]) {
      if (inputType === 'date' || inputType === 'datetime') {
        initialValues[name] = new Date();
      } else if (inputType === 'select-multiple') {
        initialValues[name] = [];
      } else {
        initialValues[name] = '';
      }
    }
  });
  // ensure that the validationSchema does not contain validation for non-existent fields, causing submit to fail
  if (validationSchema && validationSchema.fields) {
    const missingValidatedFields = Object.keys(validationSchema.fields).filter((f) => !fieldNames.includes(f));
    if (missingValidatedFields.length) {
      console.warn(
        `Validating field(s) '${missingValidatedFields.join(', ')}', but no Input is present in the form. It will fail to submit`,
      );
    }
  }

  return (
    <Formik innerRef={ref} initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {() => <React.Fragment>{children}</React.Fragment>}
    </Formik>
  );
});
