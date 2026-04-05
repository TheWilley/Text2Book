import { useEffect, useReducer, useRef } from 'react';
import { Settings, ShowResults, SettingsAction } from '../global/types.ts';
import { SETTINGS_LOCALSTORAGE_KEY } from '../global/constants.ts';
export default function useSettings(showResults: ShowResults) {
  const firstGeneration = useRef(false);

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
          settingsAdjusted: firstGeneration.current ? true : state.settingsAdjusted, // Only set to true if it's not the first generation
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

  const [state, dispatch] = useReducer(settingsReducer, initialState, (defaultState) => {
    // We try to load from LocalStorage first, and if it doesn't exist, we use the default state
    const saved = localStorage.getItem(SETTINGS_LOCALSTORAGE_KEY);
    return saved ? (JSON.parse(saved) as Settings) : defaultState;
  });

  // Sync to LocalStorage whenever state changes
  useEffect(() => {
    const { ...dataToSave } = state;
    localStorage.setItem(SETTINGS_LOCALSTORAGE_KEY, JSON.stringify(dataToSave));
  }, [state]);

  // Onload be set changed to false
  useEffect(() => {
    dispatch({ type: 'SAVE_SUCCESS', field: 'settingsAdjusted' });
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    firstGeneration.current = true;
    dispatch({ type: 'SAVE_SUCCESS', field: 'settingsAdjusted' });

    showResults({
      text: state.text,
      title: state.title,
      author: state.author,
      minecraftVersion: state.minecraftVersion,
      generationFormat: state.generationFormat,
      javaVersion: state.javaVersion,
      linesPerPage: state.linesPerPage || 14,
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
