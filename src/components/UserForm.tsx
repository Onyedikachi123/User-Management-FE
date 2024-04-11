import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { addUser, updateUser } from '../features/users/userSlice';
import { User } from '../types';

interface UserFormProps {
  user?: User; 
  handleClose: () => void; 
  handleUpdateUser?: (updatedUser: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, handleClose, handleUpdateUser }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [username, setUsername] = useState(user?.username || '');
  const [phone, setPhone] = useState(user?.phone.toString() || '');
  const [website, setWebsite] = useState(user?.website || '');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: user ? user.id : Date.now(), 
      name,
      email,
      username,
      phone: parseInt(phone, 10) || 0,
      website,
    };
    if (user) {
      dispatch(updateUser({ id: user.id, user: newUser }));
      if (handleUpdateUser) {
        handleUpdateUser(newUser); // Call the handleUpdateUser function with the updated user
      }
    } else {
      dispatch(addUser(newUser));
    }
    handleClose(); 
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
        <label htmlFor="phone" className="form-label">Phone:</label>
        <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="website" className="form-label">Website:</label>
        <input type="text" className="form-control" id="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">{user ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default UserForm;
