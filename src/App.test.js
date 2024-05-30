import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home link in navigation bar', () => {
  render(<App />);
  const homeLink = screen.getByText(/Inicio/i);
  expect(homeLink).toBeInTheDocument();
});
