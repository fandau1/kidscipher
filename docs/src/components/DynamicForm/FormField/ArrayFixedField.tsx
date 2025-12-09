import React from 'react';
import styles from '../FormField.module.css';

interface ArrayFixedFieldProps {
  label: string;
  values: string[];
  onChange: (vals: string[]) => void;
  size: number;
}

export const ArrayFixedField: React.FC<ArrayFixedFieldProps> = ({
  label,
  values,
  onChange,
  size,
}) => {
  const handleItemChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    onChange(newValues);
  };

  // Ensure we always have exactly 'size' items
  const displayValues = React.useMemo(() => {
    const current = [...values];
    while (current.length < size) {
      current.push('');
    }
    return current.slice(0, size);
  }, [values, size]);

  return (
    <div className={styles.formField}>
      <label className={styles.formLabel}>
        {label}{' '}
        <span style={{ fontSize: '0.85em', opacity: 0.7 }}>({size} items)</span>
      </label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {displayValues.map((val, idx) => (
          <div
            key={idx}
            style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
          >
            <span
              style={{
                minWidth: '2rem',
                fontWeight: 600,
                color: 'var(--ifm-color-emphasis-600)',
                fontSize: '0.9rem',
              }}
            >
              {idx + 1}.
            </span>
            <input
              type="text"
              value={val}
              onChange={(e) => handleItemChange(idx, e.target.value)}
              className={styles.input}
              style={{ flex: 1 }}
              placeholder={`Item ${idx + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
