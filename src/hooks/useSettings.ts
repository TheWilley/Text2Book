import { useEffect, useReducer } from 'react';
import { Settings, ShowResults, SettingsAction } from '../global/types.ts';
export default function useSettings(showResults: ShowResults) {
  const initialState: Settings = {
    text: '',
    author: '',
    title: '',
    nameSuffix: '',
    inputFormat: 'text',
    outputFormat: 'text',
    generationFormat: 'commands',
    linesPerPage: 14,
    minecraftVersion: 'java',
    javaVersion: '1.20.5+',
    commandTarget: 'commandblock',
    settingsAdjusted: false,
  };

  function settingsReducer(state: Settings, action: SettingsAction) {
    switch (action.type) {
      case 'UPDATE_FIELD':
        return {
          ...state,
          [action.field]: action.payload,
          settingsAdjusted: true,
        };
      case 'SAVE_SUCCESS':
        return {
          ...state,
          settingsAdjusted: false,
        };
      default:
        return state;
    }
  }

  const STORAGE_KEY = 'mc_book_settings';

  const [state, dispatch] = useReducer(settingsReducer, initialState, (defaultState) => {
    // We try to load from LocalStorage first, and if it doesn't exist, we use the default state
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Settings) : defaultState;
  });

  // Sync to LocalStorage whenever state changes
  useEffect(() => {
    const { ...dataToSave } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [state]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({ type: 'SAVE_SUCCESS', field: 'settingsAdjusted' });

    showResults({
      text: state.text,
      title: state.title,
      author: state.author,
      minecraftVersion: state.minecraftVersion,
      generationFormat: state.generationFormat,
      javaVersion: state.javaVersion,
      linesPerPage: state.linesPerPage,
      nameSuffix: state.nameSuffix,
      commandTarget: state.commandTarget,
    });
  };

  return {
    state,
    updateField: (field: keyof Settings, value: SettingsAction['payload']) =>
      dispatch({ type: 'UPDATE_FIELD', field, payload: value }),
    handleSubmit,
  };
}
