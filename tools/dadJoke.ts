import { Type, FunctionDeclaration } from '@google/genai'
import { ToolFn } from '../types'

export const dadJokeToolDefinition: FunctionDeclaration = {
  name: 'dad_joke',
  description: 'Gives a dad joke',
  parameters: {
    type: Type.OBJECT,
  },
}
type Args = typeof dadJokeToolDefinition.parameters

export const dadJoke: ToolFn<Args, string> = async () => {
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  })
  // @ts-ignore
  return (await res.json()).joke
}
