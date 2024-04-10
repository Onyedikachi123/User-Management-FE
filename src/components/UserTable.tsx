import React from 'react';
import { User } from '../types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

interface UserTableProps {
  users: User[];
  onEditUser: (user: User) => void; 
}

const UserTable: React.FC<UserTableProps> = ({ users, onEditUser }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Username</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id} className="border-b">
              <td className="px-4 py-2">
                <Link to={`/userdetail/${user.id}`}>{user.id}</Link> 
              </td>
              <td className="px-4 py-2">
                <Link to={`/userdetail/${user.id}`}>{user.name}</Link> 
              </td>
              <td className="px-4 py-2">
                <Link to={`/userdetail/${user.id}`}>{user.username}</Link> 
              </td>
              <td className="px-4 py-2">
                <Link to={`/userdetail/${user.id}`}>{user.email}</Link> 
              </td>
              <td className="px-4 py-2">
                <Button variant="outline-primary" size="sm" onClick={() => onEditUser(user)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
