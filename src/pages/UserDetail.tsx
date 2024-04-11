import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { deleteUser } from "../features/users/userSlice";
import { User } from "../types";
import axios from "axios";
import { Button, Modal, Toast } from "react-bootstrap";
import UserForm from "../components/UserForm";

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<User>(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setUser(response.data);
      } catch (error) {
        setError("Failed to fetch user details");
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleDelete = () => {
    if (id) {
      dispatch(deleteUser(parseInt(id)));
      setShowToast(true);
      setTimeout(() => {
        navigate("/");
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
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
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
