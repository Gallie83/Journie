import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getJournalEntries, updateJournalEntry, JournalEntry } from '../apiService';


cosnt EditJournalEntry: React.FC = () => {
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
    })

}

