import React from 'react';
type Setter<T> = React.Dispatch<React.SetStateAction<T | undefined>>;

export type FormData = {
  inputFormat: 'text' | 'file';
  setInputFormat: Setter<'text' | 'file'>;
  outputFormat: 'text' | 'commands';
  setOutputFormat: Setter<'text' | 'commands'>;
  text: string;
  setText: Setter<string>;
  appendIndex: boolean;
  setAppendIndex: Setter<boolean>;
  author: string;
  setAuthor: Setter<string>;
  title: string;
  setTitle: Setter<string>;
  handleSubmit: (event: React.FormEvent) => void;
  loading: boolean;
};

export type ShowResults = (
  text: FormData['text'],
  author: FormData['author'],
  title: FormData['title'],
  outputFormat: FormData['outputFormat'],
  appendIndex: FormData['appendIndex']
) => void;
