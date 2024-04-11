import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { deleteUser, fetchUsers } from '../features/users/userSlice';
import { User } from '../types';
import { Button, Modal, Toast } from 'react-bootstrap';
import UserForm from '../components/UserForm';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.users);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const storedUsersState = localStorage.getItem('usersState');
    if (storedUsersState) {
      const storedUsers = JSON.parse(storedUsersState).users;
      const foundUser = storedUsers.find((user: { id: { toString: () => string | undefined; }; }) => user.id.toString() === id);
      if (foundUser) {
        setUser(foundUser);
      } else {
        setError('User not found');
      }
    } else {
      setError('No users stored');
    }
  }, [id, users]);

  const handleDelete = () => {
    if (id) {
      dispatch(deleteUser(parseInt(id)));
      setShowToast(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    setShowEditModal(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10 col-12 mt-10">
          <div className="bg-white rounded-lg overflow-hidden border">
            {error && <p className="text-red-500 p-4">{error}</p>}
            {user ? (
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                <p className="text-gray-700 mb-1">
                  <strong>Username:</strong> {user.username}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Website:</strong> {user.website}
                </p>
                <Button variant="primary" onClick={handleEdit} className="mr-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            ) : (
              <p className="p-4">Loading...</p>
            )}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <UserForm
                  user={user}
                  handleClose={handleCloseEditModal}
                  handleUpdateUser={handleUpdateUser}
                />
              </Modal.Body>
            </Modal>
            <Toast
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={2000}
              autohide
              className="position-fixed bottom-0 end-0 m-3"
            >
              <Toast.Body>{user?.name} has been deleted.</Toast.Body>
            </Toast>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
