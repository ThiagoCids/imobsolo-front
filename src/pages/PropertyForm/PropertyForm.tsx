import React from 'react';
import './PropertyForm.scss';

// Definição das propriedades esperadas para o formulário de propriedades
interface PropertyFormProps {
  onSubmit: (data: any) => void; // Substitua 'any' por um tipo mais específico conforme necessário
}

/**
 * Componente PropertyForm
 * Este componente é responsável por renderizar um formulário para cadastro de propriedades.
 * Ele utiliza o SCSS para estilização e recebe uma função de callback via props para lidar com o envio do formulário.
 */
const PropertyForm: React.FC<PropertyFormProps> = ({ onSubmit }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="propertyName">Nome da Propriedade</label>
        <input type="text" id="propertyName" name="propertyName" required />
      </div>
      <div className="form-group">
        <label htmlFor="propertyValue">Valor</label>
        <input type="number" id="propertyValue" name="propertyValue" required />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default PropertyForm;