import React, { useState } from 'react';

const Dropdown = ({ options, onSelect }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectionChange = (e) => {
    const value = e.target.value;
    const isSelected = selectedOptions.includes(value);

    // Update the selection
    const updatedSelections = isSelected
      ? selectedOptions.filter((option) => option !== value)
      : [...selectedOptions, value];

    setSelectedOptions(updatedSelections);
    onSelect(updatedSelections); // Notify parent of the selection
  };

  return (
    <div>
      <label htmlFor="filterDropdown">Filter Response:</label>
      <select
        id="filterDropdown"
        multiple
        value={selectedOptions}
        onChange={handleSelectionChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
