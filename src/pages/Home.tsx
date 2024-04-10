import React, { useEffect, useState } from 'react';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import { Modal, Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchUsers } from '../features/users/userSlice';
import { User } from '../types'

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, status, error } = useAppSelector(state => state.users);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (users.length === 0) {
    dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  const handleOpenModal = (user?: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(undefined);
    setShowModal(false);
  };

  return (
    <div className=" mx-auto p-2">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <Button variant="primary" onClick={() => handleOpenModal()} className='mb-3'>
        Add User
      </Button>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <UserTable users={users} onEditUser={handleOpenModal} />
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm user={selectedUser} handleClose={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
