import { Title, Table, Badge, Divider, Text, Button, Paper } from "@mantine/core"
import type { ResultRow } from "../types"
import { getScoreLevel } from "../utils"

type ResultCardProps = {
  result: ResultRow
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <Paper withBorder p="md">
      <Title order={5}>{result.url}</Title>

      <Table mt="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>観点</Table.Th>
            <Table.Th>スコア</Table.Th>
            <Table.Th>評価</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {[
            ["Crawl/Index健全性", result.crawlIndex],
            ["回答性", result.answerability],
            ["信頼性", result.reliability],
            ["構造化データ", result.structuredData],
            ["コンテンツ一貫性", result.consistency],
          ].map(([label, score]) => {
            const lv = getScoreLevel(Number(score))
            return (
              <Table.Tr key={label}>
                <Table.Td>{label}</Table.Td>
                <Table.Td>{score}</Table.Td>
                <Table.Td>
                  <Badge color={lv.color}>{lv.label}</Badge>
                </Table.Td>
              </Table.Tr>
            )
          })}
        </Table.Tbody>
      </Table>

      {result.llmReport && (
        <>
          <Divider my="sm" />
          <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
            {result.llmReport}
          </Text>
        </>
      )}

      <Button
        mt="sm"
        variant="light"
        onClick={() => {
          // PDF DLなど後で実装
        }}
      >
        PDFレポートをダウンロード
      </Button>
    </Paper>
  )
}

