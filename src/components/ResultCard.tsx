import { Title, Table, Badge, Divider, Text, Button, Paper } from "@mantine/core"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useRef } from "react"
import html2pdf from "html2pdf.js"

import type { ResultRow } from "@/types"
import { getScoreLevel } from "@/utils"

type ResultCardProps = {
  result: ResultRow
}

export const ResultCard = ({ result }: ResultCardProps) => {
  const pdfRef = useRef<HTMLDivElement>(null)

  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return

    const element = pdfRef.current
    const filename = `aio-readiness-report-${result.url.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.pdf`

    const opt = {
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename: filename,
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    }

    try {
      await html2pdf().set(opt as any).from(element).save()
    } catch (error) {
      console.error("PDF生成エラー:", error)
    }
  }
  return (
    <div>
      <div ref={pdfRef}>
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
              ["Crawl/Index健全性", result.crawl_index],
              ["回答性", result.answerability],
              ["信頼性", result.reliability],
              ["構造化データ", result.structured_data],
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

          {result.llm_report && (
            <>
              <Divider my="sm" />
              <div
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif",
                }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                  h1: ({ children }) => (
                    <Text component="h1" size="lg" fw={700} mb="xl" mt="xl">
                      {children}
                    </Text>
                  ),
                  h2: ({ children }) => (
                    <Text component="h2" size="md" fw={600} mb="lg" mt="lg">
                      {children}
                    </Text>
                  ),
                  h3: ({ children }) => (
                    <Text component="h3" size="sm" fw={600} mb="md" mt="md">
                      {children}
                    </Text>
                  ),
                  p: ({ children }) => (
                    <Text component="p" size="sm" mb="sm">
                      {children}
                    </Text>
                  ),
                  hr: () => (
                    <Divider my="lg" />
                  ),
                  ul: ({ children }) => (
                    <ul style={{ margin: "1rem 0", paddingLeft: "1.5rem", fontFamily: "inherit" }}>
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol style={{ margin: "1rem 0", paddingLeft: "1.5rem", fontFamily: "inherit" }}>
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li style={{ margin: "0.5rem 0" }}>
                      <Text size="sm" component="span">
                        {children}
                      </Text>
                    </li>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className
                    return isInline ? (
                      <Text
                        component="code"
                        size="sm"
                        style={{
                          backgroundColor: "#f1f3f5",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "0.25rem",
                          fontFamily: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
                        }}
                      >
                        {children}
                      </Text>
                    ) : (
                      <pre
                        style={{
                          backgroundColor: "#f8f9fa",
                          padding: "1rem",
                          borderRadius: "0.25rem",
                          overflow: "auto",
                          margin: "1rem 0",
                        }}
                      >
                        <code style={{ fontFamily: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace", fontSize: "0.8125rem" }}>
                          {children}
                        </code>
                      </pre>
                    )
                  },
                  blockquote: ({ children }) => (
                    <blockquote
                      style={{
                        borderLeft: "4px solid #dee2e6",
                        paddingLeft: "1rem",
                        margin: "1rem 0",
                        color: "#6c757d",
                        fontFamily: "inherit",
                      }}
                    >
                      <Text size="sm" component="span">
                        {children}
                      </Text>
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div style={{ overflowX: "auto", margin: "1rem 0" }}>
                      <Table>
                        {children}
                      </Table>
                    </div>
                  ),
                  a: ({ children, href }) => (
                    <Text
                      component="a"
                      size="sm"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#228be6", textDecoration: "underline" }}
                    >
                      {children}
                    </Text>
                  ),
                  strong: ({ children }) => (
                    <Text component="strong" size="sm" fw={600}>
                      {children}
                    </Text>
                  ),
                  em: ({ children }) => (
                    <Text component="em" size="sm" fs="italic">
                      {children}
                    </Text>
                  ),
                  }}
                >
                  {result.llm_report}
                </ReactMarkdown>
              </div>
            </>
          )}
        </Paper>
      </div>
      <Button
        mt="sm"
        variant="light"
        onClick={handleDownloadPDF}
      >
        PDFレポートをダウンロード
      </Button>
    </div>
  )
}
