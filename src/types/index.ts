export interface ResultRow {
    url: string
    status: string
    total_score: number
    crawl_index: number
    answerability: number
    reliability: number
    structured_data: number
    consistency: number
    summary?: string
    llm_report?: string
  }

  export interface AioCheckResponse {
    results: ResultRow[]
  }
  