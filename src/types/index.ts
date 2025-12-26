export interface ResultRow {
    url: string
    status: string
    totalScore: number
    crawlIndex: number
    answerability: number
    reliability: number
    structuredData: number
    consistency: number
    summary?: string
    llmReport?: string
  }
