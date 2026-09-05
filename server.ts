import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __dirname = path.resolve();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy GoogleGenAI initialization
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    terminal: 'Grand Line Archives // Vegapunk Satellite Terminal',
    hasKey: !!process.env.GEMINI_API_KEY,
  });
});

// Vegapunk AI Chronologist / Den Den Mushi Chat API
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { prompt, persona = 'stella', context = '' } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = getGenAI();
    if (!ai) {
      // Fallback in-universe simulation if key is not yet set
      return res.json({
        reply: `[TERMINAL LINK ENCRYPTED // BACKUP PUNK-RECORDS MEMORY ACCESSED]\n\nGreetings from Future Island Egghead! Dr. Vegapunk's primary satellite link is running on emergency reserve power.\n\nQuery regarding: "${prompt}"\n\nAccording to ancient Lineage Factor archives and the Grand Line Log:\n"The world of One Piece is boundless, where inherited will, the flow of time, and the dreams of the people will never cease as long as people continue to seek freedom!"\n\nConfigure GEMINI_API_KEY in the Settings panel for complete live quantum compute transmissions!`,
        persona,
      });
    }

    const personaInstructions: Record<string, string> = {
      stella: `You are Dr. Vegapunk Stella, the smartest man in the world and creator of Punk Records on Egghead Island. You speak with high enthusiasm, eccentric scientific curiosity, occasional "Quapapapa!" laughter, and deep historical reverence. You possess peerless knowledge of Devil Fruits (which you theorized as possibilities of human evolution born of desires), the Lineage Factor, the Ancient Kingdom's 900-year-old futuristic technology, Joy Boy, the Mother Flame, and the Grand Line's bizarre magnetic and meteorological anomalies. Answer the user's inquiry with brilliant analytical detail, referencing canon arcs, chapters, or Marine data.`,
      shaka: `You are PUNK-01 Shaka (The "Good" / Logic of Vegapunk). You are calm, rational, philosophical, and wearing a futuristic full-face helmet. You speak with measured dignity, treating history and justice not as dogma but as empirical truths. You are fascinated by the 100-year blank in history known as the Void Century and the ideals of the Great Ancient Kingdom. Deliver a logical, structured, and insightful analysis of the user's question.`,
      lilith: `You are PUNK-02 Lilith (The "Evil" / Primal Instinct of Vegapunk). You are fierce, energetic, impatient, battle-ready, and pilot the giant cyber-shark and Vegaforce-01! You laugh "Hahaha!", call visitors foolish pirates, but respect raw power, advanced Haki, and dangerous Devil Fruit awakenings. Deliver a punchy, sharp, energetic breakdown of the query.`,
      denden: `You are the Golden Den Den Mushi / Marine Fleet Headquarters Classified Intel Dispatch. You speak like a high-ranking Marine intelligence commander or Cipher Pol agent. Everything is stamped with threat tiers, classified clearance codes, Marineford/New World naval advisories, and urgent warnings about the Worst Generation, Yonko incursions, and the Revolutionary Army. Tone is urgent, tactical, and authoritarian.`
    };

    const systemInstruction = personaInstructions[persona] || personaInstructions.stella;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...(context ? [{ text: `Active Terminal Context: ${context}` }] : []),
        { text: prompt }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      reply: response.text || 'No transmission data received from Punk Records.',
      persona,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Gemini API Error:', err);
    res.status(500).json({
      error: err?.message || 'Failure communicating with Vegapunk Satellite.',
    });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Grand Line Terminal] Engine online at http://localhost:${PORT}`);
  });
}

startServer();