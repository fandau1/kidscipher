import React from 'react';
import styles from '../../CipherDemo.module.css';

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
  <div className={styles.formField}>
    <label className={styles.formLabel}>{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.input}
    />
  </div>
);
