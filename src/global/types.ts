import React from 'react';

// === Utility ===
type HandleSubmit = (event: React.FormEvent) => void;

type UpdateFieldFn<T> = <K extends keyof T>(field: K, value: T[K]) => void;

type WithUpdater<T> = T & {
  updateField: UpdateFieldFn<T>;
};

type FormBundle<T, K extends keyof T> = WithUpdater<Pick<T, K>>;

// === Non component types ===

// This is the settings type from which all other types are derived
// A source of "truth", and should anything be changed here it should be reflected in all other types that use it
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

// === Component props types ===

export type OutputProps = {
  results: BookOutput;
  setFadeIn: React.Dispatch<React.SetStateAction<number>>;
  fadeinProps: { fadein: number };
  timeToGenerate: number;
} & Pick<Settings, 'outputFormat'>;

export type FormProps = {
  settings: Settings;
  updateField: UpdateFielSettings;
  handleSubmit: HandleSubmit;
  showResults: ShowResults;
  loading: boolean;
};

export type FormInputProps = FormBundle<
  Settings,
  'inputFormat' | 'generationFormat' | 'minecraftVersion' | 'text' | 'author' | 'title'
> & {
  loading: boolean;
  handleSubmit: HandleSubmit;
};

export type FormSettingsProps = FormBundle<
  Settings,
  | 'inputFormat'
  | 'outputFormat'
  | 'generationFormat'
  | 'minecraftVersion'
  | 'linesPerPage'
  | 'nameSuffix'
  | 'javaVersion'
  | 'commandTarget'
>;

export type FormSettingsAdvancedProps = FormBundle<
  Settings,
  'linesPerPage' | 'nameSuffix'
>;

export type ResultsProps = {
  results: BookOutput;
  setFadeIn: React.Dispatch<React.SetStateAction<number>>;
  fadeinProps: { fadein: number };
  timeToGenerate: number;
} & Pick<Settings, 'outputFormat'>;

// === Function types ===

export type ShowResults = (
  args: Pick<
    Settings,
    | 'text'
    | 'title'
    | 'author'
    | 'minecraftVersion'
    | 'generationFormat'
    | 'javaVersion'
    | 'linesPerPage'
    | 'nameSuffix'
    | 'commandTarget'
  >
) => void;

// === Data types ===

export type BookParameters = Pick<
  Settings,
  | 'text'
  | 'title'
  | 'author'
  | 'minecraftVersion'
  | 'generationFormat'
  | 'javaVersion'
  | 'commandTarget'
  | 'linesPerPage'
  | 'nameSuffix'
>;
export type BookOutput = { book: string[]; unsupportedCharacters: string[] };

// === Enum types ===
export type InputFormat = 'text' | 'file';
export type OutputFormat = 'text' | 'file';
export type JavaVersion = '1.13+' | '1.14+' | '1.20.5+' | '1.21.5+';
export type MinecraftVersion = 'java' | 'bedrock';
export type GenerationFormat = 'commands' | 'text';
export type CommandTarget = 'player' | 'commandblock';
