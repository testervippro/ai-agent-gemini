import { JSONFilePreset } from 'lowdb/node'
import { GenerateContentResponse } from '@google/genai'
import { v4 as uuidv4 } from 'uuid'
import { AIMessage } from './types'

export type MessageWithMetadata = AIMessage & {
  id: string
  createdAt: string
}

export const addMetadata = (message: AIMessage): MessageWithMetadata => ({
  ...message,
  id: uuidv4(),
  createdAt: new Date().toISOString(),
})

export const removeMetadata = (message: MessageWithMetadata) => {
  const { id, createdAt, ...messageWithoutMetadata } = message
  return messageWithoutMetadata
}

type Data = {
  messages: MessageWithMetadata[]
}

const defaultData: Data = { messages: [] }

export const getDb = async () => {
  const db = await JSONFilePreset<Data>('db.json', defaultData)

  return db
}

export const addMessages = async (messages: AIMessage[]) => {
  const db = await getDb()
  db.data.messages.push(...messages.map(addMetadata))
  await db.write()
}

export const getMessages = async () => {
  const db = await getDb()
  return db.data.messages.map(removeMetadata)
}

export const clearMessages = async (keepLast?: number) => {
  const db = await getDb()
  db.data.messages = db.data.messages.slice(-(keepLast ?? 0))
  await db.write()
}
