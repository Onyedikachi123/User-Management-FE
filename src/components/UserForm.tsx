import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { addUser, updateUser } from '../features/users/userSlice';
import { User } from '../types';

interface UserFormProps {
  user?: User; // If user is provided, the form is for updating, otherwise for adding
  handleClose: () => void; // Function to close the modal
}

const UserForm: React.FC<UserFormProps> = ({ user, handleClose }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [username, setUsername] = useState(user?.username || '');
  const [phone, setPhone] = useState(user?.phone.toString() || ''); // Convert phone number to string for input value

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: user ? user.id : Date.now(), // Use Date.now() for a simple unique ID for new users
      name,
      email,
      username,
      phone: parseInt(phone, 10) || 0, // Convert phone back to number
    };
    if (user) {
      dispatch(updateUser({ id: user.id, user: newUser }));
    } else {
      dispatch(addUser(newUser));
    }
    handleClose(); // Close the modal after submitting
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userName" className="form-label">Name:</label>
        <input type="text" className="form-control" id="userName" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="userEmail" className="form-label">Email:</label>
        <input type="email" className="form-control" id="userEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="userUsername" className="form-label">Username:</label>
        <input type="text" className="form-control" id="userUsername" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="userPhone" className="form-label">Phone:</label>
        <input type="tel" className="form-control" id="userPhone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">{user ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default UserForm;
