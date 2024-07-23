import express from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

// Create new journal entry
app.post('/api/journal-entries', async (req, res) => {
  const { title, startDate, endDate, startTime, endTime, content, images } = req.body;
  try {
    const newEntry = await prisma.journalEntry.create({
      data: {
        title,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        content,
        images,
      },
    });
    res.json(newEntry);
  } catch (error) {
    handleError(error, res);
  }
});

// Retrieve existing entry
app.get('/api/journal-entries', async (req, res) => {
  try {
    const entries = await prisma.journalEntry.findMany();
    res.json(entries);
  } catch (error) {
    handleError(error, res);
  }
});

// Update existing entry
app.put('/api/journal-entries/:id', async(req,res) => {
  const {id} = req.params;
  const {title, startDate, endDate, startTime, endTime, content, images} = req.body;

  try {
    const updatedEntry = await prisma.journalEntry.update({
      where: {id: Number(id)},
      data: {
        title,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        content,
        images,
      },
    });
    res.json(updatedEntry);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
})

// Delete an entry
app.delete('/api/journal-entries/:id', async (req,res) => {
  const {id} = req.params;

  try {
    await prisma.journalEntry.delete({
      where: {id: Number(id)},
    });
    res.json({ message: 'Journal entry deleted'});
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// To return any error messages
function handleError(error: unknown, res: express.Response) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }