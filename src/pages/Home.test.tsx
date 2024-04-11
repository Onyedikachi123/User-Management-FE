

import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

describe('Home', () => {
  it('should render the Home component and handle modal interactions', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Check if the "Add User" button is present
    const addButton = screen.getByRole('button', { name: /Add User/i });
    expect(addButton).toBeInTheDocument();

    // Click the "Add User" button to open the modal
    fireEvent.click(addButton);
    expect(screen.getByText(/Add User/i)).toBeInTheDocument(); // Check if the modal title is correct

    // Close the modal
    const closeButton = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(closeButton);
    expect(screen.queryByText(/Add User/i)).not.toBeInTheDocument(); // Check if the modal is closed
  });
});
