import { Table, ScrollArea, Title } from "@mantine/core"
import type { ResultRow } from "../types"

type ResultsTableProps = {
  results: ResultRow[]
}

export function ResultsTable({ results }: ResultsTableProps) {
  return (
    <>
      <Title order={3}>診断結果</Title>

      <ScrollArea>
        <Table withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>URL</Table.Th>
              <Table.Th>総合</Table.Th>
              <Table.Th>Crawl</Table.Th>
              <Table.Th>回答性</Table.Th>
              <Table.Th>信頼性</Table.Th>
              <Table.Th>構造化</Table.Th>
              <Table.Th>一貫性</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {results.map((r) => (
              <Table.Tr key={r.url}>
                <Table.Td>{r.url}</Table.Td>
                <Table.Td>{r.totalScore}</Table.Td>
                <Table.Td>{r.crawlIndex}</Table.Td>
                <Table.Td>{r.answerability}</Table.Td>
                <Table.Td>{r.reliability}</Table.Td>
                <Table.Td>{r.structuredData}</Table.Td>
                <Table.Td>{r.consistency}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  )
}

