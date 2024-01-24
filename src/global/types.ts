import React from 'react';

export type FormData = {
  setInputFormat: React.Dispatch<React.SetStateAction<'text' | 'file'>>;
  inputFormat: 'text' | 'file';
  setOutputFormat: React.Dispatch<React.SetStateAction<'text' | 'commands'>>;
  outputFormat: 'text' | 'commands';
  loading: boolean;
  handleSubmit: (event: React.FormEvent) => void;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  appendIndex: boolean;
  setAppendIndex: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeText: (event: React.FormEvent) => void;
  author: string;
  handleChangeAuthor: (event: React.FormEvent) => void;
  title: string;
  handleChangeTitle: (event: React.FormEvent) => void;
};

export type ShowResults = (
  text: FormData['text'],
  author: FormData['author'],
  title: FormData['title'],
  outputFormat: FormData['outputFormat'],
  appendIndex: FormData['appendIndex']
) => void;
