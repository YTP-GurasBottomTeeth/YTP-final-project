import VotePage from "@/components/vote/votePage";

export default function Vote({ params }: { params: { newsId: string }}) {
  return <VotePage newsId={BigInt(params.newsId)} />
}