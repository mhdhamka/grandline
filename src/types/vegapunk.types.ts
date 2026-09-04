import { MangaBubbleShape, MangaBubbleVariant } from '../components/Manga/MangaBubble.tsx';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface PersonaConfig {
  name: string;
  epithet: string;
  sfx: string;
  avatar: string;
  greeting: string;
  defaultShape: MangaBubbleShape;
  defaultVariant: MangaBubbleVariant;
}

export interface MangaQuote {
  speaker: string;
  epithet: string;
  quote: string;
  shape: MangaBubbleShape;
  variant: MangaBubbleVariant;
  fontStyle: 'mono' | 'comic' | 'shout';
  sfx: string;
  citation: string;
}