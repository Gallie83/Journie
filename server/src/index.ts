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
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/journal-entries', async (req, res) => {
  try {
    const entries = await prisma.journalEntry.findMany();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add update and delete routes here

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
