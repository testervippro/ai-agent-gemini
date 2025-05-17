import { FunctionDeclaration, Modality, Type } from '@google/genai'
import fs from 'fs'
import path from 'path'
import { gemini_ai } from '../ai'
import { ToolFn } from '../types'

export const generateImageToolDefinition: FunctionDeclaration = {
  name: 'generate_image',
  parameters: {
    type: Type.OBJECT,
    properties: {
      prompt: {
        type: Type.STRING,
        description:
          'The prompt to use to generate the image with gemini image generator',
      },
    },
    required: ['prompt'],
    description: 'Generates an image and returns the image name.',
  },
}

type Args = Record<string, unknown>

export const generateImage: ToolFn<Args, string> = async ({
  toolArgs,
  userMessage,
}) => {
  const response = await gemini_ai.models.generateContent({
    model: 'gemini-2.0-flash-preview-image-generation',
    contents: toolArgs.prompt as string,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  })

  // Create the 'images' directory if it doesn't exist
  const imagesDir = path.join(process.cwd(), 'images')

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true }) 
  }

  if (!response.candidates) {
    throw new Error()
  }

  for (const part of response.candidates[0].content!.parts!) {
    
    if (part.inlineData) {
      const imageData = part.inlineData.data as string
      const buffer = Buffer.from(imageData, 'base64')
      const now = new Date()

      // Format: YYYY-MM-DD_HH-MM-SS
      const timestamp = now
        .toISOString()
        .replace(/T/, '_') // Replace T with _
        .replace(/:/g, '-') // Replace : with -
        .replace(/\..+/, '')
      const imagePath = path.join(imagesDir, `gemini-native-image-${timestamp}.png`) // Save in 'images' directory
      fs.writeFileSync(imagePath, buffer)

      return `Image saved as ${imagePath}`
    }
  }
  return 'Unable to generate Image'
}
