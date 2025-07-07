import React, { useEffect, useState } from 'react';
import { Board, Column, ColumnTitle, TaskCard, Empty } from './Tasks.styles';
import { useGetTasks } from '../hooks/GetTasks';
import { useGetTeamAndManager } from '../hooks/GetUsers';
import TaskModal from './TaskModal';

const statuses = ['Todo', 'InProgress', 'CodeReview', 'Completed'];
const statusIcons = {
  Todo: '📝',
  InProgress: '⏳',
  CodeReview: '🔍',
  Completed: '✅',
};

const KanbanBoard = () => {
  const userRole = localStorage.getItem("role")
  const userId = localStorage.getItem("userId")
  const managerId = (userRole !== "manager") ? localStorage.getItem('manager') : userId;
  const { data, isLoading, error: tasksError, refetch } = useGetTasks({ managerId });
  const { teamMembers, managerName, isLoading: usersLoading, error: usersError } = useGetTeamAndManager(managerId);
  const [selectedTask, setSelectedTask] = useState()

  const [dataWithNames, setDataWithNames] = useState({});

  useEffect(() => {
    if (!data || usersLoading || !Array.isArray(teamMembers)) return;

    const userMap = {};
    teamMembers.forEach(u => { userMap[u.id] = u.name; });
    userMap[managerId] = managerName;
    const mapped = {};
    if (!tasksError)Object.keys(data).forEach(status => {
      mapped[status] = data[status].map(task => ({
        ...task,
        reporterName: userMap[task.reporter] || task.reporter,
        assigneeName: userMap[task.assignee] || task.assignee,
      }));
    });
    setDataWithNames(mapped);
  }, [data]);


  if (isLoading || usersLoading) return <p>Loading tasks...</p>;

  return (
    <>
    <Board>
      {statuses.map((status) => (
        <Column key={status}>
          <ColumnTitle>{statusIcons[status]} {status}</ColumnTitle>
          {dataWithNames[status] && dataWithNames[status].length > 0 ? (
            dataWithNames[status].map((task) => (
              <TaskCard key={task.id} onClick={() => setSelectedTask(task)}>
                <p><strong>Title:</strong> {task.title}</p>
                <p><strong>Reporter:</strong> {task.reporterName}</p>
                <p><strong>Assignee:</strong> {task.assigneeName}</p>
              </TaskCard>
            ))
          ) : (
            <Empty>No tasks</Empty>
          )}
        </Column>
      ))}
    </Board>
    {selectedTask && (
        <TaskModal task={selectedTask} onClose={() => {refetch();setSelectedTask(null)}} />
      )}
      
      </>
  );
};

export default KanbanBoard;
