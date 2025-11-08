export interface SanitizeOptions {
  allowIframes?: boolean
  allowScripts?: boolean
  allowStyles?: boolean
}

const defaultOptions: SanitizeOptions = {
  allowIframes: false,
  allowScripts: false,
  allowStyles: false,
}

// Client-side only - DOMPurify requires a DOM
function getDOMPurify() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null
  }
  
  try {
    // Use dynamic require that only executes on client
    return require('dompurify')
  } catch (e) {
    console.warn('Failed to load DOMPurify:', e)
    return null
  }
}

export function sanitizeHtml(
  html: string,
  options: SanitizeOptions = defaultOptions
): string {
  // Return unsanitized HTML during SSR (will be sanitized on client)
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return html
  }

  const purify = getDOMPurify()
  if (!purify) {
    return html
  }

  const config: DOMPurify.Config = {
    ALLOWED_TAGS: [
      'p',
      'br',
      'strong',
      'em',
      'u',
      's',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'blockquote',
      'pre',
      'code',
      'a',
      'img',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
      'hr',
      'del',
      'ins',
      'sub',
      'sup',
      'dl',
      'dt',
      'dd',
      'div',
      'span',
      'kbd',
      'mark',
      'abbr',
      'details',
      'summary',
      ...(options.allowIframes ? ['iframe'] : []),
    ],
    ALLOWED_ATTR: [
      'href',
      'src',
      'alt',
      'title',
      'class',
      'id',
      'width',
      'height',
      'target',
      'rel',
      'colspan',
      'rowspan',
      'align',
      'data-*',
      ...(options.allowIframes
        ? ['allow', 'allowfullscreen', 'frameborder', 'sandbox']
        : []),
    ],
    ALLOW_DATA_ATTR: true,
    KEEP_CONTENT: true,
  }

  if (options.allowScripts) {
    config.ALLOWED_TAGS?.push('script')
    config.ALLOWED_ATTR?.push('onerror', 'onload')
  }

  if (options.allowStyles) {
    config.ALLOWED_TAGS?.push('style')
    config.ALLOWED_ATTR?.push('style')
  }

  return purify.sanitize(html, config)
}

export function minifyHtml(html: string): string {
  return html
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim()
}

