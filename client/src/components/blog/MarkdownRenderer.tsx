import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-gray-700 leading-relaxed mb-4">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">
            {children}
          </ol>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-orange-200 pl-6 py-2 my-6 bg-orange-50 text-gray-700 italic">
            {children}
          </blockquote>
        ),
        code: ({ children, className }) => {
          if (className) {
            return (
              <code className={`${className} block bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm`}>
                {children}
              </code>
            );
          }
          return (
            <code className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-800">
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}