import { Textarea, Button, Loader, Group } from "@mantine/core"
import { type ChangeEvent } from "react"

type UrlInputFormProps = {
  urlsText: string
  loading: boolean
  onUrlsChange: (value: string) => void
  onAnalyze: () => void
}

export const UrlInputForm = ({
  urlsText,
  loading,
  onUrlsChange,
  onAnalyze,
}: UrlInputFormProps) => {
  return (
    <>
      <Textarea
        label="診断したいURL（1行に1つ）"
        placeholder="https://example.com"
        minRows={10}
        styles={{ input: { minHeight: 150, fontSize: 16 } }}
        value={urlsText}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          onUrlsChange(e.currentTarget.value)
        }
      />

      <Group>
        <Button onClick={onAnalyze} disabled={loading}>
          診断する
        </Button>
        {loading && <Loader size="sm" />}
      </Group>
    </>
  )
}
