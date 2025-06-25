interface TextHighlightProps {
  text: string;
  searchTerm: string;
  className?: string;
}

export default function TextHighlight({
  text,
  searchTerm,
  className = "",
}: TextHighlightProps) {
  if (!searchTerm.trim()) {
    return <span className={className}>{text}</span>;
  }

  const regex = new RegExp(
    `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <mark
            key={index}
            className="rounded bg-yellow-200 px-0.5 text-yellow-900"
          >
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </span>
  );
}
