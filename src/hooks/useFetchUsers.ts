// src/hooks/useFetchUsers.ts
import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../types';

const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStatus('loading');
    axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setStatus('succeeded');
      })
      .catch(err => {
        setError(err.message);
        setStatus('failed');
      });
  }, []);

  return { users, status, error };
};

export default useFetchUsers;
