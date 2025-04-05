// Integration test

import App from './App';
import { act, render } from '@testing-library/react';
import '@vitest/web-worker';
import '@testing-library/jest-dom';

const setup = () => {
  const utils = render(<App />);
  return { ...utils };
};

afterEach(() => {
  localStorage.clear();
});

it('displays the header', () => {
  const { getByText } = setup();
  expect(getByText(/Text2Book/i)).toBeInTheDocument();
});

describe('Choices', () => {
  describe('Input Type', () => {
    it('displays textbox when "Text Input" is clicked', () => {
      const { getByText, getByTestId } = setup();

      const textInputButton = getByText(/Text Input/i);
      act(() => {
        textInputButton.click();
      });

      const textboxElement = getByTestId('textarea');
      expect(textboxElement).toBeInTheDocument();
    });

    it('displays file input when "File Input" is clicked', () => {
      const { getByText, getByTestId } = setup();

      const fileInputButton = getByText(/File Input/i);
      act(() => {
        fileInputButton.click();
      });

      const fileInputElement = getByTestId('file-upload-button');
      expect(fileInputElement).toBeInTheDocument();
    });
  });

  describe('Generation Format', () => {
    it('displays "Player Executable" and "Command Block Executable", "Bedrock Version" and "Java Version" only when "Generate Commands" is clicked', () => {
      const { getByText, queryByText } = setup();

      const commandsButton = getByText(/Generate Commands/i);
      act(() => {
        commandsButton.click();
      });

      // Check that "Player Executable" and "Command Block Executable" are displayed
      expect(queryByText(/Player Executable/i)).toBeInTheDocument();
      expect(queryByText(/Command Block Executable/i)).toBeInTheDocument();
      expect(queryByText(/Bedrock Version/i)).toBeInTheDocument();
      expect(queryByText(/Java Version/i)).toBeInTheDocument();

      const textButton = getByText(/Generate Text/i);
      act(() => {
        textButton.click();
      });

      // Check that "Player Executable" and "Command Block Executable" are not displayed
      expect(queryByText(/Player Executable/i)).not.toBeInTheDocument();
      expect(queryByText(/Command Block Executable/i)).not.toBeInTheDocument();
      expect(queryByText(/Bedrock Version/i)).not.toBeInTheDocument();
      expect(queryByText(/Java Version/i)).not.toBeInTheDocument();
    });

    it('displays Minecraft versions only when "Java Version" is clicked', () => {
      const { getByText, queryByText } = setup();

      const javaVersionButton = getByText(/Java Version/i);
      act(() => {
        javaVersionButton.click();
      });

      // Check all versions
      expect(getByText(/1\.13\+/i)).toBeInTheDocument();
      expect(getByText(/1\.14\+/i)).toBeInTheDocument();
      expect(getByText(/1\.20\.5\+/i)).toBeInTheDocument();
      expect(getByText(/1\.21\.5\+/i)).toBeInTheDocument();

      // Check that Bedrock versions are not displayed
      const bedrockVersionButton = getByText(/Bedrock Version/i);
      act(() => {
        bedrockVersionButton.click();
      });

      // Check that no versions are displayed
      expect(queryByText(/1\.13\+/i)).not.toBeInTheDocument();
    });
  });

  describe('Advanced Settings', () => {
    it('displays advanced settings when "Advanced" is clicked', () => {
      const { getByText } = setup();

      const advancedButton = getByText(/Advanced/i);
      act(() => {
        advancedButton.click();
      });

      // Check all advanced settings
      expect(getByText(/Name Suffix/i)).toBeInTheDocument();
      expect(getByText(/Number of lines per page/i)).toBeInTheDocument();
    });
  });
});
