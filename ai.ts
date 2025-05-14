import * as dotenv from 'dotenv'

dotenv.config()

import { GoogleGenAI } from '@google/genai'

export const gemini_ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})
