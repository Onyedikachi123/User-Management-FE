import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from '../components/UserForm';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

describe('UserForm', () => {
  const handleClose = jest.fn();
  const handleUpdateUser = jest.fn();

  it('should render the form correctly', () => {
    render(
      <Provider store={store}>
        <UserForm handleClose={handleClose} />
      </Provider>
    );

    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Website:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();
  });

  it('should call handleClose when the form is submitted', () => {
    render(
      <Provider store={store}>
        <UserForm handleClose={handleClose} />
      </Provider>
    );

    fireEvent.submit(screen.getByRole('button', { name: /Add/i }));
    expect(handleClose).toHaveBeenCalled();
  });

  it('should update the user when the form is submitted with a user prop', () => {
    render(
      <Provider store={store}>
        <UserForm user={{ id: 1, name: 'John', email: 'john@example.com', username: 'john_doe', phone: 1234567890, website: 'www.johndoe.com' }} handleClose={handleClose} handleUpdateUser={handleUpdateUser} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Jane' } });
    fireEvent.submit(screen.getByRole('button', { name: /Update/i }));

    expect(handleUpdateUser).toHaveBeenCalledWith({
      id: 1,
      name: 'Jane',
      email: 'john@example.com',
      username: 'john_doe',
      phone: '1234567890',
      website: 'www.johndoe.com',
    });
  });
});
