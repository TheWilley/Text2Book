import React from 'react';
type Setter<T> = React.Dispatch<React.SetStateAction<T | undefined>>;

export type IFormData = {
  inputFormat: 'text' | 'file';
  setInputFormat: Setter<'text' | 'file'>;
  outputFormat: 'text' | 'commands';
  setOutputFormat: Setter<'text' | 'commands'>;
  text: string;
  setText: Setter<string>;
  appendIndex: boolean;
  setAppendIndex: Setter<boolean>;
  appendIndexFormat: string;
  setAppendIndexFormat: Setter<string>;
  author: string;
  setAuthor: Setter<string>;
  title: string;
  setTitle: Setter<string>;
  handleSubmit: (event: React.FormEvent) => void;
  loading: boolean;
};

export type IFormInput = Pick<
  IFormData,
  | 'inputFormat'
  | 'setInputFormat'
  | 'outputFormat'
  | 'setOutputFormat'
  | 'text'
  | 'setText'
  | 'author'
  | 'setAuthor'
  | 'title'
  | 'setTitle'
  | 'handleSubmit'
  | 'loading'
>;

export type IFormDebugInput = Pick<
  IFormData,
  'inputFormat' | 'text' | 'setText' | 'handleSubmit' | 'loading'
>;

export type IFormSettings = Pick<
  IFormData,
  | 'inputFormat'
  | 'setInputFormat'
  | 'outputFormat'
  | 'setOutputFormat'
  | 'appendIndex'
  | 'setAppendIndex'
  | 'appendIndexFormat'
  | 'setAppendIndexFormat'
>;

export type IShowResults = (
  text: IFormData['text'],
  author: IFormData['author'],
  title: IFormData['title'],
  outputFormat: IFormData['outputFormat'],
  appendIndex: IFormData['appendIndex'],
  appendIndexFormat: IFormData['appendIndexFormat']
) => void;
