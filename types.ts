import { Content } from '@google/genai'

export type AIMessage = Content

export interface ToolFn<A = any, T = any> {
  (input: { userMessage: string; toolArgs: A }): Promise<T>
}