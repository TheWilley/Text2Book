import React from 'react';
import { BookOutput } from '../utils/MinecraftBook';
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
  setTitle: LocalStorageSetter<string>;
  handleSubmit: (event: React.FormEvent) => void;
};

export type IApp = {
  results: BookOutput;
  fadeinProps: { fadein: number };
  loading: boolean;
  timeToGenerate: number;
  outputFormat: 'text' | 'file';
  showResults: IResults;
  setOutputFormat: LocalStorageSetter<'text' | 'file'>;
  setFadeIn: StateSetter<number>;
}

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
