import { remark } from "remark";
import html from "remark-html";

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

interface MarkdownRendererProps {
  content: string;
}

export async function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const htmlContent = await markdownToHtml(content);
  return (
    <div
      className="prose prose-sm prose-invert max-w-none prose-headings:text-white prose-p:text-slate-400 prose-li:text-slate-400 prose-a:text-blue-400 prose-strong:text-slate-200 prose-code:text-blue-400"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: rendered from remark-processed markdown
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
