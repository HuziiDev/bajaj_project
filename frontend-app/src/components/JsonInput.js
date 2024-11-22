import React, { useState } from 'react';

const JsonInput = ({ onSubmit }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      setError('');
      onSubmit(parsedInput); // Pass the valid JSON to the parent
    } catch (err) {
      setError('Invalid JSON format. Please correct it and try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="jsonInput">Enter JSON Input:</label>
        <textarea
          id="jsonInput"
          rows="5"
          cols="50"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"data": ["A", "C", "z"]}'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default JsonInput;
