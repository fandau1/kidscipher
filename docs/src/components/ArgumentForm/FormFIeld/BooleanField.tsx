import React from 'react';
import styles from '../../CipherDemo.module.css';

interface BooleanFieldProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const BooleanField: React.FC<BooleanFieldProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <div className={styles.checkboxField}>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className={styles.checkbox}
        id={`checkbox-${label}`}
      />
      <label htmlFor={`checkbox-${label}`} className={styles.checkboxLabel}>
        {label}
      </label>
    </div>
  );
};
