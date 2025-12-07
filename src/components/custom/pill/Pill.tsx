
export default function Pill({ text }: { text: string }) {
  return (
    <a className="md:flex px-2 py-1 bg-secondary-foreground hover:bg-secondary-foreground/90 rounded-sm" href={`https://www.google.com/search?q=site:dev.to ${text}`} target="_blank" rel="noopener noreferrer">
      <p className="text-xs text-white">{text}</p>
    </a>
  )
}