import { Title, Stack } from "@mantine/core"
import type { ResultRow } from "../types"
import { ResultCard } from "./ResultCard"

type ResultReportsProps = {
  results: ResultRow[]
}

export const ResultReports = ({ results }: ResultReportsProps) => {
  return (
    <>
      <Title order={3}>自動示唆（AI生成レポート）</Title>

      <Stack>
        {results.map((r) => (
          <ResultCard key={r.url} result={r} />
        ))}
      </Stack>
    </>
  )
}
