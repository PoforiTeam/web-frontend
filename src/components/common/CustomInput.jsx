import React from 'react';

const CustomInput = ({ fields }) => {
  return fields.map((field) => (
    <div key={field.id} className={'form-group'}>
      <label htmlFor={field.id}>
        {field.label} {field.required && <em>*</em>}
      </label>
      <input
        id={field.id}
        name={field.name}
        type={field.type || 'text'}
        maxLength={field.maxLength || 255}
        onChange={field.onChange}
        value={field.values}
      />
    </div>
  ));
};

export default CustomInput;
