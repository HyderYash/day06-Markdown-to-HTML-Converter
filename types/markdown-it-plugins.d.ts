declare module 'markdown-it-task-lists' {
  import MarkdownIt from 'markdown-it'
  type TaskListsOptions = {
    enabled?: boolean
    label?: boolean
  }
  const taskLists: MarkdownIt.PluginSimple<TaskListsOptions>
  export default taskLists
}

declare module 'markdown-it-footnote' {
  import MarkdownIt from 'markdown-it'
  const footnote: MarkdownIt.PluginSimple
  export default footnote
}

