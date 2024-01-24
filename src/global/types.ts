import React from 'react';

export type ShowResults = (
  text: string,
  author: string,
  title: string,
  outputFormat: 'commands' | 'text'
) => void;

export type FormData = {
  setInputFormat: React.Dispatch<React.SetStateAction<'text' | 'file'>>;
  inputFormat: 'text' | 'file';
  setOutputFormat: React.Dispatch<React.SetStateAction<'text' | 'commands'>>;
  outputFormat: 'text' | 'commands';
  loading: boolean;
  handleSubmit: (event: React.FormEvent) => void;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  handleChangeText: (event: React.FormEvent) => void;
  author: string;
  handleChangeAuthor: (event: React.FormEvent) => void;
  title: string;
  handleChangeTitle: (event: React.FormEvent) => void;
};
