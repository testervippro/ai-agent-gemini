import { dadJokeToolDefinition } from './dadJoke'
import { generateImageToolDefinition } from './generateImage'
import { redditToolDefinition } from './reddit'
import { run_playwright_test } from './playwright'

export const tools = [redditToolDefinition, dadJokeToolDefinition, generateImageToolDefinition, run_playwright_test]
