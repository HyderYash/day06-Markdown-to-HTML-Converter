export function countWords(text: string): number {
  if (!text || text.trim().length === 0) return 0
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

export function countCharacters(text: string): number {
  return text.length
}

export function countLines(text: string): number {
  if (!text) return 0
  return text.split('\n').length
}

export function estimateReadingTime(wordCount: number): number {
  const wordsPerMinute = 200
  if (wordCount === 0) return 0
  const minutes = wordCount / wordsPerMinute
  return Math.max(1, Math.ceil(minutes))
}

export function extractHeadings(markdown: string): Array<{ level: number; text: string; id: string }> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: Array<{ level: number; text: string; id: string }> = []
  let match

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    headings.push({ level, text, id })
  }

  return headings
}

export function generateTableOfContents(markdown: string): string {
  const headings = extractHeadings(markdown)
  if (headings.length === 0) return ''

  let toc = '## Table of Contents\n\n'
  headings.forEach((heading) => {
    const indent = '  '.repeat(Math.max(0, heading.level - 1))
    toc += `${indent}- [${heading.text}](#${heading.id})\n`
  })
  toc += '\n---\n\n'
  return toc
}

