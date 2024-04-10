import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserDetail from './UserDetail';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('UserDetail', () => {
  it('fetches and displays user details', async () => {
    mock.onGet('https://jsonplaceholder.typicode.com/users/1').reply(200, {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    });

    render(<UserDetail />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    });
  });

  it('displays an error message if the fetch fails', async () => {
    mock.onGet('https://jsonplaceholder.typicode.com/users/1').reply(500);

    render(<UserDetail />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch user details')).toBeInTheDocument();
    });
  });
});
