/**
 * TIPOS PARA FORMS
 * 
 * Tipos compartilhados para validação e manipulação de formulários.
 * Usados pela hook useFormValidation e componentes de form.
 * 
 * ESTRUTURA:
 * - FormError: Erros de campo individual
 * - FormData: Dados do formulário
 * - ValidationRule: Regra de validação
 * - FormState: Estado completo do formulário
 */

/**
 * Tipo: FormError
 * 
 * Representa erros de validação por campo do formulário.
 * 
 * @typedef {Object.<string, string>} FormError
 * 
 * @example
 * const errors: FormError = {
 *   email: "Email é obrigatório",
 *   password: "Senha deve ter pelo menos 8 caracteres"
 * };
 */
export type FormError = Record<string, string>;

/**
 * Tipo: FormData
 * 
 * Dados genéricos de um formulário.
 * Todas as propriedades são strings por padrão (valores de input HTML).
 * 
 * POR QUÊ apenas strings?
 * - Inputs HTML sempre retornam string
 * - number/boolean causam type errors
 * - Se precisar validar, fazer em função separada
 * 
 * @typedef {Object.<string, string>} FormData
 * 
 * @example
 * const formData: FormData = {
 *   email: "user@example.com",
 *   password: "senha123"
 * };
 */
export type FormData = Record<string, string>;

/**
 * Tipo: ValidationRule
 * 
 * Função que valida um valor de campo.
 * Retorna string com mensagem de erro ou undefined se válido.
 * 
 * @typedef {Function} ValidationRule
 * @param {string | number | boolean} value - Valor a validar
 * @returns {string | undefined} Mensagem de erro ou undefined
 * 
 * @example
 * const emailRule: ValidationRule = (value) => {
 *   return value.includes("@") ? undefined : "Email inválido";
 * };
 */
export type ValidationRule = (value: string | number | boolean) => string | undefined;

/**
 * Tipo: ValidationRules
 * 
 * Conjunto de regras de validação para todos os campos.
 * 
 * @typedef {Object.<string, ValidationRule[]>} ValidationRules
 * 
 * @example
 * const rules: ValidationRules = {
 *   email: [
 *     (v) => !v ? "Email obrigatório" : undefined,
 *     (v) => v.includes("@") ? undefined : "Email inválido"
 *   ]
 * };
 */
export type ValidationRules = Record<string, ValidationRule[]>;

/**
 * Tipo: FormState
 * 
 * Estado completo de um formulário.
 * Inclui dados, erros e status de submissão.
 * 
 * @typedef {Object} FormState
 * @property {FormData} formData - Dados do formulário
 * @property {FormError} errors - Erros de validação
 * @property {boolean} isSubmitting - Está sendo submetido?
 * @property {boolean} isTouched - Algum campo foi tocado?
 */
export interface FormState {
  formData: FormData;
  errors: FormError;
  isSubmitting: boolean;
  isTouched: Record<string, boolean>;
}

/**
 * Tipo: FormContextType
 * 
 * Tipo para contexto de formulário.
 * Facilita compartilhamento de estado de form via Context API.
 * 
 * @typedef {Object} FormContextType
 * @property {FormState} state - Estado atual do form
 * @property {(field: string, value: string) => void} setField - Atualizar campo
 * @property {() => Promise<boolean>} validate - Validar todos campos
 * @property {() => void} reset - Resetar formulário
 */
export interface FormContextType {
  state: FormState;
  setField: (field: string, value: string | number | boolean) => void;
  validate: () => Promise<boolean>;
  reset: () => void;
}
