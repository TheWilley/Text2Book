import React from 'react';
type LocalStorageSetter<T> = React.Dispatch<React.SetStateAction<T | undefined>>;

export interface Settings {
  inputFormat: InputFormat;
  outputFormat: OutputFormat;
  generationFormat: GenerationFormat;
  minecraftVersion: MinecraftVersion;
  javaVersion: JavaVersion;
  commandTarget: CommandTarget;
  text: string;
  author: string;
  title: string;
  linesPerPage: number;
  nameSuffix: string;
  settingsAdjusted: boolean;
}

export type UpdateFielSettings = (
  field: keyof Settings,
  value: SettingsAction['payload']
) => void;

export interface SettingsAction {
  type: 'UPDATE_FIELD' | 'SAVE_SUCCESS';
  field: keyof Settings;
  payload?: Settings[keyof Settings];
}

export type IFormData = {
  inputFormat: InputFormat;
  outputFormat: OutputFormat;
  setOutputFormat: LocalStorageSetter<OutputFormat>;
  generationFormat: GenerationFormat;
  minecraftVersion: MinecraftVersion;
  text: string;
  linesPerPage: number;
  nameSuffix: string;
  author: string;
  title: string;
  javaVersion: JavaVersion;
  commandTarget: CommandTarget;
  handleSubmit: (event: React.FormEvent) => void;
};

export type IFormInput = Pick<
  Settings,
  'inputFormat' | 'generationFormat' | 'minecraftVersion' | 'text' | 'author' | 'title'
> & {
  loading: boolean;
  handleSubmit: (event: React.FormEvent) => void;
  updateField: UpdateFielSettings;
};

export type IFormSettings = Pick<
  Settings,
  | 'inputFormat'
  | 'outputFormat'
  | 'generationFormat'
  | 'minecraftVersion'
  | 'linesPerPage'
  | 'nameSuffix'
  | 'javaVersion'
  | 'commandTarget'
> & {
  setOutputFormat: LocalStorageSetter<OutputFormat>;
  updateField: UpdateFielSettings;
};

export type IFormSettingsAdvanced = Pick<Settings, 'linesPerPage' | 'nameSuffix'> & {
  updateField: UpdateFielSettings;
};

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
