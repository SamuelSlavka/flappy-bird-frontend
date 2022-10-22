import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavItem from './NavItem';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';


describe('<NavItem />', () => {
  test('it should mount', () => {
    render(<NavItem name="name" link='' icon={solid('user-secret')}/>);
    
    const navItem = screen.getByTestId('NavItem');

    expect(navItem).toBeInTheDocument();
  });
});