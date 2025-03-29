import React from 'react';
type LocalStorageSetter<T> = React.Dispatch<React.SetStateAction<T | undefined>>;
type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type IFormData = {
  inputFormat: InputFormat;
  setInputFormat: LocalStorageSetter<InputFormat>;
  outputFormat: OutputFormat;
  setOutputFormat: LocalStorageSetter<OutputFormat>;
  generationFormat: GenerationFormat;
  setGenerationFormat: LocalStorageSetter<GenerationFormat>;
  minecraftVersion: MinecraftVersion;
  setMinecraftVersion: LocalStorageSetter<MinecraftVersion>;
  text: string;
  setText: LocalStorageSetter<string>;
  linesPerPage: number;
  setLinesPerPage: LocalStorageSetter<number>;
  nameSuffix: string;
  setNameSuffix: LocalStorageSetter<string>;
  author: string;
  setAuthor: LocalStorageSetter<string>;
  title: string;
  javaVersion: JavaVersion;
  setJavaVersion: LocalStorageSetter<JavaVersion>;
  setTitle: LocalStorageSetter<string>;
  commandTarget: CommandTarget;
  setCommandTarget: LocalStorageSetter<CommandTarget>;
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
  | 'commandTarget'
  | 'setCommandTarget'
>;

export type IResults = (
  text: IFormData['text'],
  title: IFormData['title'],
  author: IFormData['author'],
  minecraftVersion: IFormData['minecraftVersion'],
  generationFormat: IFormData['generationFormat'],
  javaVersion: IFormData['javaVersion'],
  linesPerPage: IFormData['linesPerPage'],
  nameSuffix: IFormData['nameSuffix'],
  commandTarget: IFormData['commandTarget']
) => void;

export type MinecraftCharacter = { char: string; pixels: number };
export type IBookOutput = { book: string[]; unsupportedCharacters: string[] };

export type InputFormat = 'text' | 'file';
export type OutputFormat = 'text' | 'file';
export type JavaVersion = '1.13+' | '1.14+' | '1.20.5+' | '1.21.5+';
export type MinecraftVersion = 'java' | 'bedrock';
export type GenerationFormat = 'commands' | 'text';
export type CommandTarget = 'player' | 'commandblock';

export type IBookParameters = {
  text: string;
  title: string;
  author: string;
  minecraftVersion: MinecraftVersion;
  generationFormat: GenerationFormat;
  javaVersion: JavaVersion;
  commandTarget: CommandTarget;
  linesPerPage?: number;
  nameSuffix?: string;
};
