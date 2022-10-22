import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Time from './Time';

describe('<Time />', () => {
  test('it should mount', () => {
    render(<Time />);
    
    const time = screen.getByTestId('Time');

    expect(time).toBeInTheDocument();
  });
});