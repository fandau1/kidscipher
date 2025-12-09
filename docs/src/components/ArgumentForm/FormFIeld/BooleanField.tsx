import React from 'react';
import styles from '../FormField.module.css';

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
  const uniqueId = React.useId();

  return (
    <div className={styles.checkboxField}>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className={styles.checkbox}
        id={uniqueId}
      />
      <label htmlFor={uniqueId} className={styles.checkboxLabel}>
        {label}
      </label>
    </div>
  );
};
