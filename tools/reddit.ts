import { Type, FunctionDeclaration } from '@google/genai'

export const redditToolDefinition: FunctionDeclaration = {
  name: 'reddit',
  parameters: {
    type: Type.OBJECT,
    description:
      'Use this tool to get the latest posts from Reddit. It will return a JSON object with the title, link, subreddit, author, and upvotes of each post.',
  },
}

export const reddit = async ({
  toolArgs,
  userMessage,
}: {
  toolArgs?: object
  userMessage?: string
}) => {
  const { data } = await fetch('https://www.reddit.com/.json?limit=5').then(
    (res) => res.json(),
  )

  const relevantInfo = data.children.map((child: any) => ({
    title: child.data.title,
    link: child.data.url,
    subreddit: child.data.subreddit_name_prefixed,
    author: child.data.author,
    upvotes: child.data.ups,
  }))

  return JSON.stringify(relevantInfo, null, 2)
}
