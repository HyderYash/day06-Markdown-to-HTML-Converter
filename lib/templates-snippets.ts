export interface MarkdownTemplate {
  id: string
  name: string
  description: string
  content: string
  category: 'blog' | 'documentation' | 'readme' | 'article' | 'other'
}

export const markdownTemplates: MarkdownTemplate[] = [
  {
    id: 'blog-post',
    name: 'Blog Post',
    description: 'A complete blog post template with title, meta, and sections',
    category: 'blog',
    content: `# Blog Post Title

**Published:** [Date]  
**Author:** [Your Name]  
**Tags:** #tag1 #tag2

## Introduction

Start your blog post with an engaging introduction that hooks the reader.

## Main Content

Write your main content here. Use paragraphs, lists, and formatting to make it readable.

### Key Points

- Point 1
- Point 2
- Point 3

## Code Example

\`\`\`javascript
// Your code here
function example() {
  return 'Hello, World!';
}
\`\`\`

## Conclusion

Wrap up your post with a strong conclusion that summarizes key takeaways.

---

**What did you think?** Share your thoughts in the comments below!`,
  },
  {
    id: 'readme',
    name: 'README',
    description: 'Professional README template for GitHub projects',
    category: 'readme',
    content: `# Project Name

A brief description of what your project does.

## ✨ Features

- Feature 1
- Feature 2
- Feature 3

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

\`\`\`bash
npm install
\`\`\`

### Usage

\`\`\`bash
npm start
\`\`\`

## 📖 Documentation

[Link to full documentation]

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.`,
  },
  {
    id: 'documentation',
    name: 'Documentation',
    description: 'Structured documentation template',
    category: 'documentation',
    content: `# Documentation Title

## Overview

Brief overview of the documentation.

## Table of Contents

1. [Getting Started](#getting-started)
2. [API Reference](#api-reference)
3. [Examples](#examples)
4. [FAQ](#faq)

## Getting Started

### Installation

\`\`\`bash
npm install package-name
\`\`\`

### Quick Start

\`\`\`javascript
import { something } from 'package-name';

something();
\`\`\`

## API Reference

### Function Name

Description of the function.

**Parameters:**
- \`param1\` (string): Description
- \`param2\` (number): Description

**Returns:** Description

## Examples

### Example 1

\`\`\`javascript
// Example code
\`\`\`

## FAQ

### Question 1?

Answer 1.

### Question 2?

Answer 2.`,
  },
  {
    id: 'article',
    name: 'Article',
    description: 'Long-form article template',
    category: 'article',
    content: `# Article Title

> A compelling quote or hook that draws readers in.

## Introduction

Start with a strong introduction that sets the context and engages your audience.

## Section 1

Develop your first main point here. Use examples, data, and storytelling to make it compelling.

### Subsection 1.1

Dive deeper into specific aspects.

## Section 2

Continue building your argument or narrative.

### Subsection 2.1

More detailed information.

## Key Takeaways

- Takeaway 1
- Takeaway 2
- Takeaway 3

## Conclusion

Summarize your main points and leave readers with a clear call to action or thought-provoking conclusion.`,
  },
  {
    id: 'meeting-notes',
    name: 'Meeting Notes',
    description: 'Template for meeting notes and minutes',
    category: 'other',
    content: `# Meeting Notes

**Date:** [Date]  
**Time:** [Time]  
**Attendees:** [Names]

## Agenda

1. Topic 1
2. Topic 2
3. Topic 3

## Discussion

### Topic 1

Discussion points and decisions made.

### Topic 2

Discussion points and decisions made.

## Action Items

- [ ] Action item 1 - Owner: [Name] - Due: [Date]
- [ ] Action item 2 - Owner: [Name] - Due: [Date]

## Next Steps

- Step 1
- Step 2

## Notes

Additional notes and observations.`,
  },
  {
    id: 'release-notes',
    name: 'Release Notes',
    description: 'Template for software release notes',
    category: 'other',
    content: `# Release Notes - v1.0.0

**Release Date:** [Date]

## 🎉 What's New

### Features

- ✨ New feature 1
- ✨ New feature 2
- ✨ New feature 3

### Improvements

- 🔧 Improvement 1
- 🔧 Improvement 2

## 🐛 Bug Fixes

- 🐛 Fixed issue with [description]
- 🐛 Fixed [another issue]

## ⚠️ Breaking Changes

- ⚠️ [Description of breaking change]

## 📚 Documentation

- Updated documentation for [feature]

## 🙏 Contributors

Thanks to all contributors who made this release possible!`,
  },
]

export function getTemplate(id: string): MarkdownTemplate | undefined {
  return markdownTemplates.find((t) => t.id === id)
}

export function getTemplatesByCategory(category: MarkdownTemplate['category']): MarkdownTemplate[] {
  return markdownTemplates.filter((t) => t.category === category)
}

