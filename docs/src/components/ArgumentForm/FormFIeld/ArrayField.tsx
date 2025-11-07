import React from 'react';
import styles from '../../CipherDemo.module.css';

interface ArrayFieldProps {
  label: string;
  values: string[];
  onChange: (vals: string[]) => void;
}

export const ArrayField: React.FC<ArrayFieldProps> = ({
  label,
  values,
  onChange,
}) => {
  const handleItemChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    onChange(newValues);
  };

  const addItem = () => onChange([...values, '']);
  const removeItem = (index: number) =>
    onChange(values.filter((_, i) => i !== index));

  return (
    <div className={styles.formField}>
      <label className={styles.formLabel}>{label}</label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {values.map((val, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={val}
              onChange={(e) => handleItemChange(idx, e.target.value)}
              className={styles.input}
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={() => removeItem(idx)}
              className={styles.switchButton}
              style={{ minWidth: 'auto', padding: '0.5rem 0.75rem' }}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className={styles.switchButton}
          style={{ alignSelf: 'flex-start' }}
        >
          ➕ Add Item
        </button>
      </div>
    </div>
  );
};
