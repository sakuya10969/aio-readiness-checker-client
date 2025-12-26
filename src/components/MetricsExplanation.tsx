import { Title, Text, Stack, Paper } from "@mantine/core"

export function MetricsExplanation() {
  return (
    <>
      <Title order={3}>各指標の意味（AIO時代における重要性）</Title>
      <Paper p="md" withBorder style={{ backgroundColor: "#f9fafb" }}>
        <Stack gap="sm">
          <div>
            <Text fw={600} size="sm" mb={4}>
              総合スコア
            </Text>
            <Text size="sm" c="gray.7">
              下記5つの観点を総合した「AI検索時代にどれだけ対応できているか」の目安です。
            </Text>
          </div>

          <div>
            <Text fw={600} size="sm" mb={4}>
              Crawl/Index健全性
            </Text>
            <Text size="sm" c="gray.7">
              title/description、noindex、canonical、重複など、検索エンジンがページを正しく認識・インデックスできるかを評価します。
            </Text>
          </div>

          <div>
            <Text fw={600} size="sm" mb={4}>
              回答性
            </Text>
            <Text size="sm" c="gray.7">
              見出し構造（H1/H2）、要点サマリ、定義文、箇条書き、FAQ/HowToなど、AIが引用しやすい構造になっているかを評価します。会話型AIが引用する際の"答えの質"に直結します。
            </Text>
          </div>

          <div>
            <Text fw={600} size="sm" mb={4}>
              信頼性
            </Text>
            <Text size="sm" c="gray.7">
              著者/運営者情報、問い合わせ、会社情報、更新日、参照リンクなど、信頼性を示す要素の充実度。AIが「信頼できる情報源」と判断するかどうかに関わる指標です。
            </Text>
          </div>

          <div>
            <Text fw={600} size="sm" mb={4}>
              構造化データ
            </Text>
            <Text size="sm" c="gray.7">
              Schema.org（FAQPage/HowTo/Product/Article/Breadcrumb等）の有無。AIや検索エンジンがページ内容を機械的に理解できるかを左右します。
            </Text>
          </div>

          <div>
            <Text fw={600} size="sm" mb={4}>
              コンテンツ一貫性
            </Text>
            <Text size="sm" c="gray.7">
              同一テーマでの網羅性、コンテンツの厚み。AIが包括的な回答を生成できるかを評価します。
            </Text>
          </div>
        </Stack>
      </Paper>
    </>
  )
}

