import { Content } from '@google/genai'

export type AIMessage = Content | { role: string; parts: { text: string }[] }
