import React, { useEffect, useState } from 'react';
import { Panel, Section, UserCard, FormRow } from './Users.styles';
import styled from 'styled-components'; // Add this import
import { useGetTeamAndManager } from '../hooks/GetUsers';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const ADMIN_MANAGER_ID = "68684a2916382192990d7a25";

const StyledInput = styled.input`
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  background: #fff;
  margin-bottom: 16px;
  width: 95%;
  transition: border 0.2s;
  &:focus {
    border-color: #007bff;
  }
`;

const UserManagement = () => {
  const { teamMembers : users} = useGetTeamAndManager(); // Fetch all users
  const currentUser = localStorage.getItem('role')
  const [search, setSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [assignTo, setAssignTo] = useState('');

  // Promote to manager mutation
  const promoteMutation = useMutation({
    mutationFn: async (userId) => {
      await axios.put('http://localhost:5246/Auth/changeRole', {
        id: userId,
        role: 'manager',
        manager: ADMIN_MANAGER_ID
      });
    }
  });

  // Assign employee to manager mutation
  const assignMutation = useMutation({
    mutationFn: async ({ id, manager }) => {
      await axios.put('http://localhost:5246/Auth/changeRole', {
        id,
        role: 'employee',
        manager
      });
    }
  });

  // Filter employees by search
  const filteredEmployees = search
    ? users.filter(
        u =>
          u.role === 'employee' &&
          u.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const managerList = users.filter(u => u.role === 'manager');

  const myUserId = localStorage.getItem('userId');
  const myEmployees = users.filter(
    u => u.role === 'employee' && u.manager === myUserId
  );

  return (
    <Panel>
      <h2>User Management</h2>

      {/* My Employees Section */}
      <Section>
        <h3>My Employees</h3>
        {myEmployees.length === 0 ? (
          <p>You have no employees assigned.</p>
        ) : (
          myEmployees.map(user => (
            <UserCard key={user.id}>
              <p>{user.name} ({user.email})</p>
            </UserCard>
          ))
        )}
      </Section>

      {['admin', 'manager'].includes(currentUser) && (
        <Section>
          <h3>Promote Employee to Manager</h3>
          <StyledInput
            type="text"
            placeholder="Search employee by name"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {filteredEmployees.length === 0 && search && (
            <p>No employees found.</p>
          )}
          {filteredEmployees.map(user => (
            <UserCard key={user.id}>
              <p>{user.name} ({user.email})</p>
              <button
                onClick={() => promoteMutation.mutate(user.id)}
                disabled={promoteMutation.isLoading}
              >
                {promoteMutation.isLoading ? "Promoting..." : "Make Manager"}
              </button>
            </UserCard>
          ))}
        </Section>
      )}

      {['admin', 'manager'].includes(currentUser) && (
        <Section>
          <h3>Assign Employees to Manager</h3>
          <FormRow>
            <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)}>
              <option value="">Select Employee</option>
              {users.filter(u => u.role === 'employee').map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>

            <select value={assignTo} onChange={e => setAssignTo(e.target.value)}>
              <option value="">Select Manager</option>
              {managerList.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>

            <button
              onClick={() => assignMutation.mutate({ id: selectedUserId, manager: assignTo })}
              disabled={!selectedUserId || !assignTo || assignMutation.isLoading}
            >
              {assignMutation.isLoading ? "Assigning..." : "Assign"}
            </button>
          </FormRow>
        </Section>
      )}
    </Panel>
  );
};

export default UserManagement;