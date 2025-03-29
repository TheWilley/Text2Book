import { render, screen } from '@testing-library/react';
import '@vitest/web-worker';
import App from './App';

test('renders the app correctly', () => {
  render(<App />);
  const header = screen.getByText('Text2Book');
  expect(header).toBeDefined();
});
