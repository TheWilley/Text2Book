import React from 'react';
type LocalStorageSetter<T> = React.Dispatch<React.SetStateAction<T | undefined>>;
type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type IFormData = {
  inputFormat: 'text' | 'file';
  setInputFormat: LocalStorageSetter<'text' | 'file'>;
  outputFormat: 'text' | 'file';
  setOutputFormat: LocalStorageSetter<'text' | 'file'>;
  generationFormat: 'text' | 'commands';
  setGenerationFormat: LocalStorageSetter<'text' | 'commands'>;
  minecraftVersion: 'bedrock' | 'java';
  setMinecraftVersion: LocalStorageSetter<'bedrock' | 'java'>;
  text: string;
  setText: LocalStorageSetter<string>;
  linesPerPage: number;
  setLinesPerPage: LocalStorageSetter<number>;
  nameSuffix: string;
  setNameSuffix: LocalStorageSetter<string>;
  author: string;
  setAuthor: LocalStorageSetter<string>;
  title: string;
  javaVersion: '1.20.4' | '1.20.5';
  setJavaVersion: LocalStorageSetter<'1.20.4' | '1.20.5'>;
  setTitle: LocalStorageSetter<string>;
  handleSubmit: (event: React.FormEvent) => void;
};

export type IApp = {
  results: IBookOutput;
  fadeinProps: { fadein: number };
  loading: boolean;
  timeToGenerate: number;
  outputFormat: 'text' | 'file';
  showResults: IResults;
  setOutputFormat: LocalStorageSetter<'text' | 'file'>;
  setFadeIn: StateSetter<number>;
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
  | 'outputFormat'
  | 'setOutputFormat'
  | 'generationFormat'
  | 'setGenerationFormat'
  | 'minecraftVersion'
  | 'setMinecraftVersion'
  | 'linesPerPage'
  | 'setLinesPerPage'
  | 'nameSuffix'
  | 'javaVersion'
  | 'setJavaVersion'
  | 'setNameSuffix'
>;

export type IResults = (
  text: IFormData['text'],
  title: IFormData['title'],
  author: IFormData['author'],
  minecraftVersion: IFormData['minecraftVersion'],
  generationFormat: IFormData['generationFormat'],
  javaVersion: IFormData['javaVersion'],
  linesPerPage: IFormData['linesPerPage'],
  nameSuffix: IFormData['nameSuffix']
) => void;

export type IChangelog = {
  date: string;
  features?: ICommit[];
  changes?: ICommit[];
  fixes?: ICommit[];
  notes?: string[];
};

export type IBookOutput = { book: string[]; removedCharacters: string[] };

export type IBookParameters = {
  text: string;
  title: string;
  author: string;
  minecraftVersion: 'java' | 'bedrock';
  generationFormat: 'commands' | 'text';
  javaVersion: '1.20.4' | '1.20.5';
  linesPerPage?: number;
  nameSuffix?: string;
};

type ICommit = {
  hashes: string[];
  message: string;
};

export type MinecraftCharacter = { char: string; pixels: number };
