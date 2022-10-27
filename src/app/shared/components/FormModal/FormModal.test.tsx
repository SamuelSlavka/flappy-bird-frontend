import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormModal from './FormModal';


describe('<FormModal />', () => {
  test('it should mount', () => {
    render(<FormModal selectedPlayer={{}} handleChange={()=>{}} triggerUpsert={()=>{}}/>);
    
    const formModal = screen.getByTestId('PlayModal');

    expect(formModal).toBeInTheDocument();
  });
});