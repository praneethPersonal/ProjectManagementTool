import { useEffect, useState } from 'react';
import {
  Container,
  Header,
  Grid,
  WidgetCard,
  WidgetTitle,
  WidgetCount,
  TeamSection,
  TeamTitle,
  MemberItem
} from './Dashboard.styles';
import { useGetTasks } from '../hooks/GetTasks';
import { useGetTeamAndManager } from '../hooks/GetUsers';

const Dashboard = () => {
  const name = localStorage.getItem('name');
  const userRole = localStorage.getItem("role")
  const assigneeId = localStorage.getItem("userId")
  const managerId = (userRole !== "manager") ? localStorage.getItem('manager') : assigneeId;
  const [myTasks, setMyTasks] = useState()

  const { teamMembers, managerName } = useGetTeamAndManager(managerId)
  const { data, isLoading: tasksLoading, error: tasksError } = useGetTasks(managerId);

  useEffect(() => {
    if (!data || tasksError) {
      setMyTasks({});
      return;
    }

    let filtered = {}

    if (userRole === "manager"){
      console.log(data)
     filtered = Object.fromEntries(
      Object.entries(data).map(([status, tasks]) => [
        status,
        tasks.filter(task => task.manager_id === managerId)
      ])
    );
    }
    else {
      filtered = Object.fromEntries(
      Object.entries(data).map(([status, tasks]) => [
        status,
        tasks.filter(task => task.assignee === assigneeId)
      ])
    );
    }
    console.log(filtered)
    
    setMyTasks(filtered);
  }, [data, assigneeId]);
  
  return (
    <Container>
      <Header>👋 Welcome to Project Management Tool, {name}!</Header>
      <Grid>
        <div>
          <WidgetCard>
            <WidgetTitle>📝 To Do</WidgetTitle>
            <WidgetCount>{myTasks?.Todo ? myTasks.Todo.length : 0}</WidgetCount>
          </WidgetCard>
          <WidgetCard>
            <WidgetTitle>⏳ In Progress</WidgetTitle>
            <WidgetCount>{myTasks?.InProgress ? myTasks.InProgress.length : 0}</WidgetCount>
          </WidgetCard>
          <WidgetCard>
            <WidgetTitle>🔍 Code Review</WidgetTitle>
            <WidgetCount>{myTasks?.CodeReview ? myTasks.CodeReview.length : 0}</WidgetCount>
          </WidgetCard>
          <WidgetCard>
            <WidgetTitle>✅ Completed</WidgetTitle>
            <WidgetCount>{myTasks?.Completed ? myTasks.Completed.length : 0}</WidgetCount>
          </WidgetCard>
        </div>

        <TeamSection>
          <TeamTitle>👨‍💼 Manager: {managerName}</TeamTitle>
          {teamMembers.map((member, idx) => (
            <MemberItem key={idx}>👤 {member.name}</MemberItem>
          ))}
        </TeamSection>
      </Grid>
    </Container>
  );
};

export default Dashboard;