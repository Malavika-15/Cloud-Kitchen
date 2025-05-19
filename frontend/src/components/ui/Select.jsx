import React from 'react';

const Select = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-amber-200 mb-1">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`
          w-full px-4 py-2 bg-amber-900/30 text-amber-100
          border border-amber-700 rounded-md
          focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        `}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
