import { AppShell, Container, Title, Text, Stack, Divider } from "@mantine/core"
import { useState } from "react"
import axios from "axios"

import type { ResultRow, AioCheckResponse } from "@/types"
import { UrlInputForm, ResultsTable, ResultReports, MetricsExplanation } from "@/components"

export default function App() {
  const [urlsText, setUrlsText] = useState<string>("")
  const [results, setResults] = useState<ResultRow[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const handleAnalyze = async () => {
    setLoading(true)
    try {
      const res = await axios.post<AioCheckResponse>(`${import.meta.env.VITE_API_URL}/aio-check`, {
        urls: urlsText.split("\n").map((u) => u.trim()).filter(Boolean),
      })
      const data = res.data.results
      setResults(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
      setUrlsText("") // 入力完了後にテキストエリアをクリア
    }
  }

  return (
    <AppShell padding="md" style={{ minHeight: "100vh", background: "#fafbfc" }}>
      <Container
        size="xl"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "80vh",
        }}
      >
        <Stack gap="md" style={{ marginTop: "6vh", marginBottom: "6vh" }}>
          <Title order={2} ta="center" mb="xs">
            AIO Readiness Checker（デモ版）
          </Title>
          <Text c="dimmed" ta="center">
            URLを入力すると、AI検索時代のコンテンツ適性を簡易スコアリングします。
          </Text>

          <UrlInputForm
            urlsText={urlsText}
            loading={loading}
            onUrlsChange={setUrlsText}
            onAnalyze={handleAnalyze}
          />

          {results.length > 0 && (
            <>
              <Divider />
              <ResultsTable results={results} />
              <Divider />
              <MetricsExplanation />
              <Divider />
              <ResultReports results={results} />
            </>
          )}
        </Stack>
      </Container>
    </AppShell>
  )
}
