import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { deleteUser, fetchUsers } from '../features/users/userSlice';


const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state =>
    state.users.users.find(user => user.id.toString() === id)
  );

  useEffect(() => {
    if (!user) {
      dispatch(fetchUsers());
    }
  }, [dispatch, user]);

  const handleDelete = () => {
    if (id) {
      dispatch(deleteUser(parseInt(id)));
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      {user ? (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
          <p className="text-gray-700 mb-1"><strong>Username:</strong> {user.username}</p>
          <p className="text-gray-700 mb-1"><strong>Email:</strong> {user.email}</p>
          <button className="bg-red-500 text-white px-4 py-2 rounded mt-4" onClick={handleDelete}>Delete User</button>
        </div>
      ) : (
        <p className="p-4">Loading...</p>
      )}
    </div>
  );
};

export default UserDetail;
