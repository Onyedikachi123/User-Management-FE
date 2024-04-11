import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserTable from './UserTable';
import { User } from '../types';

describe('UserTable', () => {
    const users: User[] = [
        { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com', phone: 1234567890, website: 'www.johndoe.com' },
        { id: 2, name: 'Jane Doe', username: 'janedoe', email: 'jane@example.com', phone: 9876543210, website: 'www.janedoe.com' }
    ];
    
    

  it('renders a table with users', () => {
    render(
      <Router>
        <UserTable users={users} />
      </Router>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('johndoe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('janedoe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('renders "View Details" link for each user', () => {
    render(
      <Router>
        <UserTable users={users} />
      </Router>
    );

    users.forEach((user) => {
      expect(screen.getByText('View Details').closest('a')).toHaveAttribute('href', `/userdetail/${user.id}`);
    });
  });
});
