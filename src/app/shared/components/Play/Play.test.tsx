import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Play from './Play';


describe('<Play />', () => {
  test('it should mount', () => {
    render(<Play player={{ id: '0', name: '0', record: '0' }} setSelectedPlayer={() => { }} />);

    const play = screen.getByTestId('Play');

    expect(play).toBeInTheDocument();
  });
});