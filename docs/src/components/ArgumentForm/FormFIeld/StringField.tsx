import React from 'react';

interface StringFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

export const StringField: React.FC<StringFieldProps> = ({
  label,
  value,
  onChange,
}) => (
  <div>
    <label>{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
