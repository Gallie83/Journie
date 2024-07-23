import React, { useEffect, useState } from 'react';
import { getJournalEntries, journalEntry } from '../apiService';

const JournalEntries: React.FC = () => {
  const [entries, setEntries] = useState<journalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await getJournalEntries();
        setEntries(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Journal Entries</h1>
      <button>New Entry</button>
      <ul>
        {entries.map(entry => (
          <li key={entry.id}>
            <h2>{entry.title}</h2>
            <p>{entry.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JournalEntries;