import React from 'react';

interface EnumFieldProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}

export const EnumField: React.FC<EnumFieldProps> = ({
  label,
  value,
  options,
  onChange,
}) => (
  <div>
    <label>{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
