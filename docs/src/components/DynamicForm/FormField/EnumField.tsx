import React from 'react';
import styles from '../FormField.module.css';

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
  <div className={styles.formField}>
    <label className={styles.formLabel}>{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.select}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
