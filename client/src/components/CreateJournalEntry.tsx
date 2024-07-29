import React, {useState} from "react";
import { createJournalEntry } from "../apiService";


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
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        content,
        images: images.map(file => file.name) // If images are stored as filenames
      };

        await createJournalEntries(newEntry);
    } catch(err) {
        setError((err as Error).message);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Journal Entry</h2>
      <div>
        <label>Title</label>
        <input type="text" name="{title}" onChange={e => setTitle(e.target.value)} required/>
      </div>
      <div>
        <label>Start Date</label>
        <input type="date" name={startDate} onChange={e => setStartDate(e.target.value)} required/>
      </div>
      <div>
        <label>End Date</label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
      </div>
      <div>
        <label>Start Time</label>
        <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} required />
      </div>
      <div>
        <label>End Time</label>
        <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} required />
      </div>
      <div>
        <label>Content</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} required />
      </div>
      <div>
        <label>Images</label>
        <input type="file" multiple onChange={handleImageChange} />
      </div>

      {error && <p>Error: {error}</p>}
      <button type="submit">Add New Entry</button>    
    </form>
  )
}

export default CreateJournalEntry;
