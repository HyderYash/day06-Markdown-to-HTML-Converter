import { describe, it, expect } from 'vitest'
import { markdownToHtml } from '../lib/markdown'
import { sanitizeHtml } from '../lib/sanitize'

describe('Markdown to HTML', () => {
  it('should convert basic markdown to HTML', () => {
    const markdown = '# Hello World'
    const html = markdownToHtml(markdown)
    expect(html).toContain('<h1>')
    expect(html).toContain('Hello World')
  })

  it('should handle bold text', () => {
    const markdown = 'This is **bold** text'
    const html = markdownToHtml(markdown)
    expect(html).toContain('<strong>')
    expect(html).toContain('bold')
  })

  it('should handle code blocks', () => {
    const markdown = '```javascript\nconst x = 1;\n```'
    const html = markdownToHtml(markdown)
    expect(html).toContain('<pre>')
    expect(html).toContain('<code>')
  })

  it('should handle links', () => {
    const markdown = '[Link](https://example.com)'
    const html = markdownToHtml(markdown)
    expect(html).toContain('<a')
    expect(html).toContain('href')
  })
})

describe('HTML Sanitization', () => {
  it('should sanitize script tags', () => {
    const html = '<p>Hello</p><script>alert("xss")</script>'
    const sanitized = sanitizeHtml(html)
    expect(sanitized).not.toContain('<script>')
    expect(sanitized).toContain('<p>Hello</p>')
  })

  it('should allow safe HTML tags', () => {
    const html = '<p>Hello <strong>World</strong></p>'
    const sanitized = sanitizeHtml(html)
    expect(sanitized).toContain('<p>')
    expect(sanitized).toContain('<strong>')
  })

  it('should remove iframes by default', () => {
    const html = '<p>Hello</p><iframe src="evil.com"></iframe>'
    const sanitized = sanitizeHtml(html)
    expect(sanitized).not.toContain('<iframe>')
  })

  it('should allow iframes when option is enabled', () => {
    const html = '<p>Hello</p><iframe src="example.com"></iframe>'
    const sanitized = sanitizeHtml(html, { allowIframes: true })
    expect(sanitized).toContain('<iframe>')
  })
})

