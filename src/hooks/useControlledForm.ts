import { useState, useCallback } from "react";

type FormErrors<T> = {
  [K in keyof T]?: string;
};

type ValidationRule<T> = {
  [K in keyof T]?: (value: T[K]) => string | undefined;
};

function useControlledForm<T>(
  initialState: T,
  validationRules: ValidationRule<T>,
  onSubmit: (values: T) => void
) {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      if (validationRules[name]) {
        return validationRules[name]!(value);
      }
      return undefined;
    },
    [validationRules]
  );

  const validateForm = useCallback(
    (formValues: T) => {
      const formErrors: FormErrors<T> = {};
      Object.entries(formValues as any).forEach(([name, value]) => {
        const error = validateField(name as keyof T, value as any);
        if (error) {
          formErrors[name as keyof T] = error;
        }
      });
      return formErrors;
    },
    [validateField]
  );

  const handleChange = useCallback(
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value } = event.target;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name as keyof T, value as any),
      }));
    },
    [validateField]
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);

      const validationErrors = validateForm(values);

      if (Object.keys(validationErrors).length === 0) {
        onSubmit(values);
      } else {
        setErrors(validationErrors);
      }

      setIsSubmitting(false);
    },
    [values, onSubmit, validateForm]
  );

  const resetForm = useCallback(() => {
    setValues(initialState);
    setErrors({});
    setIsSubmitting(false);
  }, [initialState]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  };
}

export default useControlledForm;
