import React from 'react';
import useAdjustTextareaHeight from '../../hooks/useAdjustTextareaHeight';

const CustomInput = ({ fields }) => {
  return fields.map((field) => {
    if (field.tag === 'textarea' && field.textareaRef) {
      useAdjustTextareaHeight(field.textareaRef, field.values);
    }
    return (
      <div key={field.id} className={'form-group'}>
        <label htmlFor={field.id}>
          {field.label} {field.required && <em>*</em>}
        </label>

        {field.tag === 'input' && (
          <input
            id={field.id}
            name={field.name}
            type={field.type || 'text'}
            maxLength={field.maxLength || 255}
            onChange={field.onChange}
            value={field.values}
          />
        )}

        {field.tag === 'select' && (
          <select
            id={field.id}
            name={field.name}
            onChange={field.onChange}
            value={field.values}
            className="custom-select"
          >
            <option value="">선택하세요</option>
            {field.options.map((option, index) => (
              <option key={index} value="option">
                {option}
              </option>
            ))}
          </select>
        )}

        {field.tag === 'textarea' && (
          <textarea
            id={field.id}
            name={field.name}
            maxLength="500"
            onChange={field.onChange}
            value={field.values}
            ref={field.textareaRef}
          />
        )}
      </div>
    );
  });
};

export default CustomInput;
