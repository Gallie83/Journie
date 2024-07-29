import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getJournalEntries, updateJournalEntry, journalEntry } from '../apiService';


const EditJournalEntry: React.FC = () => {
    const {id} = useParams<{id:string}>();
    const history = useHistory();
    const [entry, setEntry] = useState<JournalEntry | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEntry = async () => {
            try {
                const data = await getJournalEntries();
                const selectedEntry = data.find((e:JournalEntry) => e.id === Number(id));
                setEntry(selectedEntry);
            } catch(err) {
                setError((err as Error).message);
            }
        };

        fetchEntry();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (entry) {
            try {
                await updateJournalEntry(Number(id), entry);
                history.push('/jounral-entries');
            } catch (err) {
                setError((err as Error).message);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEntry((prevEntry) => prevEntry ? {...prevEntry, [name]: value }: null);
    };

    return entry ? (
        <form onSubmit={handleSubmit}>
            <h2>Edit Journal Entry</h2>
            <div>
                <label>Title</label>
                <input type="text" name='title' value={entry.title} onChange={handleChange} required />
            </div>
            <div>
                <label>Start Date</label>
                <input type="text" name='startDate' value={entry.startDate} onChange={handleChange} required />
            </div>
            <div>
                <label>End Date</label>
                <input type="text" name='endDate' value={entry.endDate} onChange={handleChange} required />
            </div>
            <div>
                <label>Start Time</label>
                <input type="text" name='startTime' value={entry.startTime} onChange={handleChange} required />
            </div>
            <div>
                <label>End Time</label>
                <input type="text" name='endTime' value={entry.endTime} onChange={handleChange} required />
            </div>
            <div>
                <label>Content</label>
                <input type="text" name='content' value={entry.content} onChange={handleChange} required />
            </div>
            <button type='submit'>Update Entry</button>
            {error && <p>Error: {error}</p>}
        </form>
    ) : ( <p>Loading...</p>)


}

export default EditJournalEntry;