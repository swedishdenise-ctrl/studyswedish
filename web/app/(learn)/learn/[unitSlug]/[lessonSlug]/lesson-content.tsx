import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function LessonContent({ markdown }: { markdown: string }) {
  return (
    <article className="mt-10 max-w-none text-[17px] leading-relaxed text-charcoal/90">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-12 mb-4 font-display text-3xl font-semibold tracking-tight text-charcoal first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-10 mb-3 font-display text-2xl font-semibold tracking-tight text-charcoal">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 mb-2 font-display text-xl font-semibold tracking-tight text-charcoal">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="my-4 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="my-4 list-disc space-y-1.5 pl-6 marker:text-swedish-blue">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 list-decimal space-y-1.5 pl-6">{children}</ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-charcoal">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-swedish-blue underline decoration-swedish-blue/30 underline-offset-2 hover:decoration-swedish-blue"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-swedish-blue bg-white py-3 pl-5 pr-4 text-charcoal/80 [&>p]:my-1">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="rounded bg-cream px-1.5 py-0.5 font-mono text-[0.9em] text-charcoal">
              {children}
            </code>
          ),
          hr: () => <hr className="my-10 border-black/10" />,
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-xl border border-black/10 bg-white">
              <table className="w-full border-collapse text-left text-[15px]">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-cream text-charcoal">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-black/5">{children}</tbody>
          ),
          tr: ({ children }) => <tr>{children}</tr>,
          th: ({ children }) => (
            <th className="px-4 py-3 text-sm font-semibold">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 align-top">{children}</td>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
