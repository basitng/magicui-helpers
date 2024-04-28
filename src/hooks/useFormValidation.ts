import { useState, useCallback } from "react";

interface Validation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: (value: string) => boolean;
}

interface Field {
  value: string;
  error: string;
}

type FormFields<T> = {
  [K in keyof T]: Field;
};

function useFormValidation<T>(
  initialState: T,
  validationRules: { [K in keyof T]: Validation }
) {
  const [formFields, setFormFields] = useState<FormFields<T>>(
    Object.entries(initialState as string).reduce((acc, [key, value]) => {
      acc[key as keyof T] = { value: value as string, error: "" };
      return acc;
    }, {} as FormFields<T>)
  );

  const validateField = useCallback(
    (name: keyof T, value: string) => {
      const rules = validationRules[name];
      let error = "";

      if (rules.required && !value) {
        error = "This field is required";
      } else if (rules.minLength && value.length < rules.minLength) {
        error = `Minimum length is ${rules.minLength}`;
      } else if (rules.maxLength && value.length > rules.maxLength) {
        error = `Maximum length is ${rules.maxLength}`;
      } else if (rules.pattern && !rules.pattern.test(value)) {
        error = "Invalid format";
      } else if (rules.validate && !rules.validate(value)) {
        error = "Invalid value";
      }

      return error;
    },
    [validationRules]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const error = validateField(name as keyof T, value);

      setFormFields((prevFields) => ({
        ...prevFields,
        [name]: { value, error },
      }));
    },
    [validateField]
  );

  const getFieldProps = useCallback(
    (name: keyof T) => {
      return {
        name,
        value: formFields[name].value,
        onChange: handleChange,
      };
    },
    [formFields, handleChange]
  );

  const isFormValid = useCallback(() => {
    return Object.values(formFields).every((field) => !(field as Field).error);
  }, [formFields]);

  return {
    formFields,
    getFieldProps,
    isFormValid,
  };
}

export default useFormValidation;
