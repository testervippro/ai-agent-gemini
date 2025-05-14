import { FunctionDeclaration } from '@google/genai'
import { addMessages, getMessages } from './memory'
import { logMessage, showLoader } from './ui'
import { runLLM } from './llm'
import { runTool } from './toolRunner'

export const runAgent = async ({
  turns = 10,
  userMessage,
  tools = [],
}: {
  turns?: number
  userMessage: string
  tools?: FunctionDeclaration[]
}) => {
  logMessage({
    role: 'user',
    parts: [{ text: userMessage }],
  })
  const loader = showLoader('Thinking...')

  const history = await getMessages()
  const response = await runLLM({
    history,
    message: userMessage,
    tools,
  })
  await addMessages([
    {
      role: 'user',
      parts: [{ text: userMessage }],
    },
  ])
  loader.stop()

  if (!response) {
    throw new Error('No Response Present')
  }

  // Saving the response in db
  await addMessages([response])

  logMessage(response)

  // if response is a function call
  if (response.parts && response.parts[0].functionCall) {
    const toolResponse = await runTool(
      response.parts[0].functionCall,
      userMessage,
    )

    // adding the tool response to context
    await addMessages([
      {
        role: 'model',
        parts: [
          {
            functionResponse: {
              name: response.parts[0].functionCall.name,
              response: { json: JSON.stringify(toolResponse) },
            },
          },
        ],
      },
    ])

    console.log('TOOL RESPONSE', toolResponse)
  }

  if (response.parts && response.parts[0].text) {
    logMessage(response)
  }
}
