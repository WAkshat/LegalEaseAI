interface PlaceholderProps {
  title: string;
  description: string;
  suggestion?: string;
}

export default function Placeholder({
  title,
  description,
  suggestion,
}: PlaceholderProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-[#6366F1] to-[#4ADE80] rounded-[32px] flex items-center justify-center mx-auto mb-8">
          <svg
            className="w-12 h-12 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-[#1F2937] mb-6">{title}</h1>

        <p className="text-xl text-[#6B7280] mb-8 leading-relaxed">
          {description}
        </p>

        {suggestion && (
          <div className="bg-white rounded-[24px] p-8 shadow-[0_12px_48px_rgba(0,0,0,0.06)] border border-[#E5E7EB]">
            <p className="text-[#374151] leading-relaxed">
              💡 <span className="font-semibold">Next Steps:</span> {suggestion}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
