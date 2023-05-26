import React, { forwardRef } from "react";
import { Form } from "react-bootstrap";

const FormInput = forwardRef((props, ref) => {
    const {label, ...other } = props;
  return (
    <div className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        ref={ref}
        {...props}
      />
    </div>
  );
});
FormInput.displayName = "FormInput";
export default FormInput;

  

  