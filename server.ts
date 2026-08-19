import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { handleChatRequest } from './src/api/chat-handler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '2mb' }));

// POST /api/chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const result = await handleChatRequest(req.body);
    res.json(result);
  } catch (error: any) {
    console.error('API /api/chat error:', error);
    res.status(500).json({
      success: false,
      error: 'सर्वर त्रुटि। कृपया बाद में प्रयास करें।'
    });
  }
});

// Serve static frontend in production
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
