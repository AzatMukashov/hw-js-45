import express from 'express';
import cors from 'cors';
import fs from 'fs';
import crypto from 'crypto';

const app = express();
const port = 8000;
app.use(cors());
const db_file = 'db.json';

interface Message {
    id: string;
    author: string;
    message: string;
    datetime: string;
}

app.use(express.json());
const readDB = (): Message[] => {
    const data = fs.readFileSync(db_file, 'utf8');
    return data ? JSON.parse(data) : [];
};

const writeDB = (data: Message[]): void => {
    fs.writeFileSync(db_file, JSON.stringify(data, null, 2));
};
app.post('/messages', (req, res) => {
    const {author, message}: { author: string; message: string } = req.body;
    if (!author || !message) {
        res.status(400).json({error: 'Author and message must be present in the request'});
    }
    const messages = readDB();
    const newMessage: Message = {
        id: crypto.randomUUID(),
        author,
        message,
        datetime: new Date().toISOString()
    };
    messages.push(newMessage);
    writeDB(messages);
    res.status(201).json(newMessage);
});
app.get('/messages', (req, res) => {
    const messages = readDB().slice(-30);
    res.json(messages);
});
app.get('/messages', (req, res) => {
    const queryDate = req.query.datetime as string;
    const date = new Date(queryDate);
    if (isNaN(date.getTime())) {
        res.status(400).json({error: 'Invalid datetime format'});
    }
    const messages = readDB().filter((msg) => new Date(msg.datetime) > date);
    res.json(messages);
});
app.listen(port, () => {
    console.log(`Server started on port - http://localhost:${port}`);
});