import { useState, useCallback } from 'react';

/**
 * Hook Customizado: useFormValidation
 * 
 * Responsabilidade:
 * Gerenciar estado e validação de formulários de forma genérica
 * 
 * POR QUÊ?
 * - Lógica de validação é repetitiva e pode ser reutilizada
 * - Reduz código duplicado em múltiplos formulários
 * - Facilita adicionar/remover campos
 * - Validação centralizada e consistente
 * - Fácil testar validações independentemente
 * 
 * CARACTERÍSTICAS:
 * - Gerencia estado do formulário (valores dos campos)
 * - Gerencia estado de erros (mensagens de validação)
 * - Fornece funções para atualizar valores
 * - Recebe validadores customizados como função
 * 
 * PRÓXIMO PASSO:
 * Integrar com biblioteca de validação como Zod ou Yup
 * para validações mais robustas
 */

// Tipos para os valores iniciais e erros
interface FormErrors {
  [key: string]: string;
}

interface UseFormValidationReturn<T> {
  formData: T;
  errors: FormErrors;
  setFieldValue: (name: string, value: any) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validateForm: () => FormErrors;
  clearErrors: () => void;
  reset: () => void;
}

export const useFormValidation = <T extends Record<string, any>>(
  initialValues: T,
  onValidate?: (values: T) => FormErrors
): UseFormValidationReturn<T> => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const setFieldValue = useCallback(
    (name: string, value: any) => {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: '',
        }));
      }
    },
    [errors]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFieldValue(name, value);
    },
    [setFieldValue]
  );

  const validateForm = useCallback(() => {
    if (!onValidate) return {};
    const newErrors = onValidate(formData);
    setErrors(newErrors);
    return newErrors;
  }, [formData, onValidate]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const reset = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    formData,
    errors,
    setFieldValue,
    handleChange,
    validateForm,
    clearErrors,
    reset,
  };
};

export default useFormValidation;
