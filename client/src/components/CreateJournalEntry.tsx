import React, {useState} from "react";
import { createJournalEntries } from "../apiService";


const CreateJournalEntry: React.FC = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();

    try {
        const newEntry = {
            title,
            startDate,
            endDate,
            startTime,
            endTime,
            content,
            images
        };

        await createJournalEntries(newEntry);
    } catch(err) {
        setError((err as Error).message);
    }
  };


  return (
    <form onSubmit={handleSubmit}></form>
  )
}


