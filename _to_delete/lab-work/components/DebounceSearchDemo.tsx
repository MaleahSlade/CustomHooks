import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';

const WORDS = [
  'apple', 'apricot', 'banana', 'blueberry', 'cherry', 'coconut', 'date',
  'elderberry', 'fig', 'grape', 'grapefruit', 'guava', 'kiwi', 'lemon',
  'lime', 'mango', 'melon', 'orange', 'papaya', 'peach', 'pear',
  'pineapple', 'plum', 'raspberry', 'strawberry', 'watermelon',
];

export default function DebounceSearchDemo() {
  const [delay, setDelay] = useState(500);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  // Simulated API call: runs only after typing pauses.
  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log(`Searching for: ${debouncedSearchTerm}`);
    }
  }, [debouncedSearchTerm]);

  const results = useMemo(() => {
    const q = debouncedSearchTerm.trim().toLowerCase();
    return q ? WORDS.filter((w) => w.includes(q)) : [];
  }, [debouncedSearchTerm]);

  return (
    <section className="demo">
      <h2>Debounce Search Demo</h2>

      <label>
        Debounce Delay (ms):{' '}
        <input
          type="number"
          min={0}
          step={100}
          value={delay}
          onChange={(e) => setDelay(Math.max(0, Number(e.target.value) || 0))}
        />
      </label>

      <input
        type="text"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <p>
        <strong>Current Input:</strong> {searchTerm}
      </p>
      <p>
        <strong>Debounced Value (after {delay}ms):</strong> {debouncedSearchTerm}
      </p>

      <h3>Simulated Search Results:</h3>
      {!debouncedSearchTerm ? (
        <p>Type to see results.</p>
      ) : results.length === 0 ? (
        <p>No results for "{debouncedSearchTerm}".</p>
      ) : (
        <ul className="item-list">
          {results.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
