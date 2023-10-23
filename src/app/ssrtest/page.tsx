import ClComp from "@/components/check/ClComp"

export default function Ssrtest() {
  const uid = "ABC123";

  return (
    <>
      <h1>SSRテストページ</h1>
      <ClComp uid={uid} />
    </>
  )
};