import { Type, FunctionDeclaration } from '@google/genai'

export const dadJokeToolDefinition: FunctionDeclaration = {
  name: 'dad_joke',
  description: 'Gives a dad joke',
  parameters: {
    type: Type.OBJECT,
  },
}

export const dadJoke = async () => {
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  })
  return (await res.json()).joke
}
