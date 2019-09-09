import React from 'react';
import ReactDOM from 'react-dom';
import OnboardForm from './OnboardForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OnboardForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
