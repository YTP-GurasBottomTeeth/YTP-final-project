import VerifyPage from "@/components/verify/verifyPage";

export default function Verify({ params }: { params: { newsId: string }}) {
  return <VerifyPage newsId={BigInt(params.newsId)} />
}