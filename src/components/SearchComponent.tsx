import { useState, useEffect } from 'react';
import data from '../data/mock-data.json';
import Employees, { type Employee } from './Employees';

const employees: Employee[] = data;

export default function SearchComponent() {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');

  // Wait until the user stops typing before searching (debounce).
  useEffect(() => {
    const id = setTimeout(() => {
      setQuery(input);
    }, 700);

    return () => {
      clearTimeout(id);
    };
  }, [input]);

  const search = query.trim().toLowerCase();

  // Match on first name, last name, or the full name ("david jones").
  const results = search
    ? employees.filter((e) =>
        `${e.first_name} ${e.last_name}`.toLowerCase().includes(search),
      )
    : [];

  return (
    <section className="search-section">
      <h2>Find a Pirate</h2>
      <input
        type="text"
        placeholder="Search for a pirate by name..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {!search ? (
        <p>Type a name to search the crew.</p>
      ) : results.length === 0 ? (
        <p>No pirates found matching "{query.trim()}".</p>
      ) : (
        <Employees employees={results} />
      )}
    </section>
  );
}
