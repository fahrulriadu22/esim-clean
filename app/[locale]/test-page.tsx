export default function TestPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return (
    <div>
      <h1>Test Page - Locale: {locale}</h1>
      <p>This is a simple test to verify locale routing works.</p>
    </div>
  )
}