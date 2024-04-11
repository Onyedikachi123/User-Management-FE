import React from 'react';
import { User } from '../types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
 

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
 
  return (
    <div className="table-responsive"> 
      <table className="table table-striped"> 
        <thead className="thead-dark"> 
          <tr>
            <th scope="col">ID</th> 
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="primary" size="sm" className="mr-2 ">
                  <Link to={`/userdetail/${user.id}`} className="text-white no-underline">View Details</Link>
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
