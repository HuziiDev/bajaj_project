import React, { useState } from 'react';
import JsonInput from './components/JsonInput';
import Dropdown from './components/Dropdown';

const App = () => {
  const [response, setResponse] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const dropdownOptions = ['Alphabets', 'Numbers', 'Highest Lowercase Alphabet'];

  const handleJsonSubmit = async (data) => {
    try {
      // Replace with your API URL
      const res = await fetch('https://bajaj-project-api.vercel.app/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setResponse(result);
    } catch (err) {
      console.error('Error fetching the API:', err);
    }
  };

  const handleDropdownSelect = (selections) => {
    if (!response) return;

    const filtered = {};
    if (selections.includes('Alphabets')) filtered.Alphabets = response.alphabets;
    if (selections.includes('Numbers')) filtered.Numbers = response.numbers;
    if (selections.includes('Highest Lowercase Alphabet'))
      filtered['Highest Lowercase Alphabet'] = response.highest_lowercase_alphabet;

    setFilteredData(filtered);
  };

  return (
    <div>
      <h1>Data Processor</h1>
      <JsonInput onSubmit={handleJsonSubmit} />
      {response && <Dropdown options={dropdownOptions} onSelect={handleDropdownSelect} />}
      {Object.keys(filteredData).length > 0 && (
        <div>
          <h3>Filtered Response:</h3>
          <pre>{JSON.stringify(filteredData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
