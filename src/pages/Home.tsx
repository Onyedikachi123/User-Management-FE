import React, { useState } from 'react';
import useFetchUsers from '../hooks/useFetchUsers';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import { Modal, Button } from 'react-bootstrap';
import {User } from "../types"

const Home: React.FC = () => {
  const { users, status, error } = useFetchUsers();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  const handleOpenModal = (user?: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(undefined);
    setShowModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <Button variant="primary" onClick={() => handleOpenModal()}>
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
