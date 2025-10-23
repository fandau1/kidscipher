import React from 'react';

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
    <div>
      <label>{label}</label>
      {values.map((val, idx) => (
        <div key={idx}>
          <input
            type="text"
            value={val}
            onChange={(e) => handleItemChange(idx, e.target.value)}
          />
          <button type="button" onClick={() => removeItem(idx)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addItem}>
        Add
      </button>
    </div>
  );
};
