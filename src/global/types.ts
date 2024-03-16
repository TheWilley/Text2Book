import React from 'react';
type Setter<T> = React.Dispatch<React.SetStateAction<T | undefined>>;

export type IFormData = {
  inputFormat: 'text' | 'file';
  setInputFormat: Setter<'text' | 'file'>;
  outputFormat: 'text' | 'commands';
  setOutputFormat: Setter<'text' | 'commands'>;
  minecraftVersion: 'bedrock' | 'java';
  setMinecraftVersion: Setter<'bedrock' | 'java'>;
  text: string;
  setText: Setter<string>;
  nameSuffix: string;
  setNameSuffix: Setter<string>;
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

export type IFormSettings = Pick<
  IFormData,
  | 'inputFormat'
  | 'setInputFormat'
  | 'outputFormat'
  | 'setOutputFormat'
  | 'minecraftVersion'
  | 'setMinecraftVersion'
  | 'nameSuffix'
  | 'setNameSuffix'
>;

export type IShowResults = (
  text: IFormData['text'],
  title: IFormData['title'],
  author: IFormData['author'],
  minecraftVersion: IFormData['minecraftVersion'],
  outputFormat: IFormData['outputFormat'],
  nameSuffix: IFormData['nameSuffix']
) => void;
