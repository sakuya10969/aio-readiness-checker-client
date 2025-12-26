export const getScoreLevel = (score: number) => {
    if (score >= 80) return { label: "良好", color: "green" as const }
    if (score >= 60) return { label: "要改善", color: "orange" as const }
    return { label: "優先改善", color: "red" as const }
  }
    