import React from 'react';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  min,
  max,
  step,
  name,
  icon,
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-amber-200 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          name={name}
          className={`
            w-full px-4 py-2 bg-amber-900/30 text-amber-100 placeholder-amber-400/70
            border border-amber-700 rounded-md
            focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
            ${icon ? 'pl-10' : ''}
            ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
          `}
        />
      </div>
    </div>
  );
};

export default Input;
