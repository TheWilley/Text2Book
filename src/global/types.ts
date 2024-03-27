import React from 'react';
type Setter<T> = React.Dispatch<React.SetStateAction<T | undefined>>;

export type IFormData = {
  inputFormat: 'text' | 'file';
  setInputFormat: Setter<'text' | 'file'>;
  generationFormat: 'text' | 'commands';
  setGenerationFormat: Setter<'text' | 'commands'>;
  minecraftVersion: 'bedrock' | 'java';
  setMinecraftVersion: Setter<'bedrock' | 'java'>;
  text: string;
  setText: Setter<string>;
  linesPerPage: number;
  setLinesPerPage: Setter<number>;
  nameSuffix: string;
  setNameSuffix: Setter<string>;
  author: string;
  setAuthor: Setter<string>;
  title: string;
  setTitle: Setter<string>;
  handleSubmit: (event: React.FormEvent) => void;
};

export type IFormInput = Pick<
  IFormData,
  | 'inputFormat'
  | 'setInputFormat'
  | 'generationFormat'
  | 'setGenerationFormat'
  | 'text'
  | 'setText'
  | 'author'
  | 'setAuthor'
  | 'title'
  | 'setTitle'
  | 'handleSubmit'
> & { loading: boolean };

export type IFormSettings = Pick<
  IFormData,
  | 'inputFormat'
  | 'setInputFormat'
  | 'generationFormat'
  | 'setGenerationFormat'
  | 'minecraftVersion'
  | 'setMinecraftVersion'
  | 'linesPerPage'
  | 'setLinesPerPage'
  | 'nameSuffix'
  | 'setNameSuffix'
>;

export type IResults = (
  text: IFormData['text'],
  title: IFormData['title'],
  author: IFormData['author'],
  minecraftVersion: IFormData['minecraftVersion'],
  generationFormat: IFormData['generationFormat'],
  linesPerPage: IFormData['linesPerPage'],
  nameSuffix: IFormData['nameSuffix'],
) => void;
