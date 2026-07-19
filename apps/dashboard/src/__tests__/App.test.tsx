import { render } from '@testing-library/react';
import { describe, it } from '@jest/globals';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('renders dashboard layout', () => {
    render(<App />);
    // Add more specific tests as needed
  });
});
