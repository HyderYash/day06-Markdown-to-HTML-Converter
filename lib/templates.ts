export interface HtmlTemplate {
  id: string
  name: string
  template: (content: string, options?: TemplateOptions) => string
}

export interface TemplateOptions {
  title?: string
  description?: string
  themeColor?: string
  includeSyntaxHighlighting?: boolean
  syntaxTheme?: 'light' | 'dark'
  customCss?: string
  minify?: boolean
}

export const templates: HtmlTemplate[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    template: (content, options) => {
      const { title = 'Document', includeSyntaxHighlighting = true, syntaxTheme = 'light', customCss = '' } = options || {}
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  ${includeSyntaxHighlighting ? `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/${syntaxTheme === 'dark' ? 'github-dark' : 'github'}.min.css">` : ''}
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', Inter, system-ui, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      color: #1C1C1E;
      background: #F5F5F7;
    }
    pre {
      background: #f5f5f5;
      padding: 1rem;
      border-radius: 8px;
      overflow-x: auto;
    }
    code {
      background: #f5f5f5;
      padding: 0.2em 0.4em;
      border-radius: 4px;
      font-size: 0.9em;
    }
    pre code {
      background: none;
      padding: 0;
    }
    ${customCss}
  </style>
</head>
<body>
${content}
</body>
</html>`
    },
  },
  {
    id: 'blog',
    name: 'Blog Post',
    template: (content, options) => {
      const { title = 'Blog Post', description = '', themeColor = '#007AFF', includeSyntaxHighlighting = true, syntaxTheme = 'light', customCss = '' } = options || {}
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="theme-color" content="${themeColor}">
  <title>${escapeHtml(title)}</title>
  ${includeSyntaxHighlighting ? `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/${syntaxTheme === 'dark' ? 'github-dark' : 'github'}.min.css">` : ''}
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', Inter, system-ui, sans-serif;
      line-height: 1.8;
      color: #1C1C1E;
      background: #F5F5F7;
      padding: 2rem 1rem;
    }
    article {
      max-width: 700px;
      margin: 0 auto;
      background: white;
      padding: 3rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #1C1C1E;
    }
    h2 {
      font-size: 1.75rem;
      margin-top: 2rem;
      margin-bottom: 1rem;
      color: #1C1C1E;
    }
    pre {
      background: #f5f5f5;
      padding: 1.5rem;
      border-radius: 8px;
      overflow-x: auto;
      margin: 1.5rem 0;
    }
    code {
      background: #f5f5f5;
      padding: 0.2em 0.4em;
      border-radius: 4px;
      font-size: 0.9em;
    }
    pre code {
      background: none;
      padding: 0;
    }
    a {
      color: ${themeColor};
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    ${customCss}
  </style>
</head>
<body>
  <article>
${content}
  </article>
</body>
</html>`
    },
  },
  {
    id: 'readme',
    name: 'README',
    template: (content, options) => {
      const { title = 'README', includeSyntaxHighlighting = true, syntaxTheme = 'light', customCss = '' } = options || {}
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  ${includeSyntaxHighlighting ? `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/${syntaxTheme === 'dark' ? 'github-dark' : 'github'}.min.css">` : ''}
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', Inter, system-ui, sans-serif;
      line-height: 1.6;
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
      color: #1C1C1E;
      background: #FFFFFF;
    }
    pre {
      background: #f6f8fa;
      padding: 1rem;
      border-radius: 6px;
      overflow-x: auto;
      border: 1px solid #e1e4e8;
    }
    code {
      background: #f6f8fa;
      padding: 0.2em 0.4em;
      border-radius: 3px;
      font-size: 0.9em;
      border: 1px solid #e1e4e8;
    }
    pre code {
      background: none;
      padding: 0;
      border: none;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1rem 0;
    }
    table th, table td {
      border: 1px solid #e1e4e8;
      padding: 0.5rem;
    }
    table th {
      background: #f6f8fa;
    }
    ${customCss}
  </style>
</head>
<body>
${content}
</body>
</html>`
    },
  },
  {
    id: 'custom',
    name: 'Custom',
    template: (content, options) => {
      const { title = 'Document', description = '', themeColor = '#007AFF', includeSyntaxHighlighting = true, syntaxTheme = 'light', customCss = '' } = options || {}
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="theme-color" content="${themeColor}">
  <title>${escapeHtml(title)}</title>
  ${includeSyntaxHighlighting ? `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/${syntaxTheme === 'dark' ? 'github-dark' : 'github'}.min.css">` : ''}
  <style>
    ${customCss || '/* Add your custom CSS here */'}
  </style>
</head>
<body>
${content}
</body>
</html>`
    },
  },
]

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

export function getTemplate(id: string): HtmlTemplate | undefined {
  return templates.find((t) => t.id === id)
}

