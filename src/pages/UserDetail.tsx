import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserForm from '../components/UserForm';
import { User } from '../types';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(response.data);
        setError(null); // Reset error state on successful fetch
      } catch (error) {
        setError('Failed to fetch user details'); // Set error message
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleDelete = async () => {
    if (id) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        navigate('/');
      } catch (error) {
        setError('Failed to delete user'); // Set error message
      }
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      {user ? (
        <>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <UserForm user={user} />
          <button onClick={handleDelete}>Delete User</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};


export default UserDetail;
