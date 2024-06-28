import express from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

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

app.get('/api/journal-entries', async (req, res) => {
  try {
    const entries = await prisma.journalEntry.findMany();
    res.json(entries);
  } catch (error) {
    handleError(error, res);
  }
});

// Add update and delete routes here

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function handleError(error: unknown, res: express.Response) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }