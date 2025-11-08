import MarkdownIt from 'markdown-it'
import taskLists from 'markdown-it-task-lists'
import footnote from 'markdown-it-footnote'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
})

md.use(taskLists, { enabled: true, label: true })
md.use(footnote)

export function markdownToHtml(markdown: string): string {
  return md.render(markdown)
}

export function markdownToHtmlInline(markdown: string): string {
  return md.renderInline(markdown)
}

