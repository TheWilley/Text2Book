export type ShowResults = (
  text: string,
  author: string,
  title: string,
  outputFormat: 'commands' | 'text'
) => void;
