import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetTeamAndManager = (managerId) => {
  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5246/Auth");
      return data;
    }
  });

  const usersWithoutAdmin = users?.filter((val) => val.role !== "admin")
  let managerName = '';
  let teamMembers = usersWithoutAdmin ?? [];

  if (users && managerId) {
    const managerUser = users.find(
      (u) => u.id === managerId && (u.role === "manager" || u.role === "admin")
    );
    managerName = managerUser ? managerUser.name : "Unknown";
    teamMembers = users.filter(
      (u) => u.manager === managerId
    );
  }

  return { managerName, teamMembers, isLoading, error, refetch }
}