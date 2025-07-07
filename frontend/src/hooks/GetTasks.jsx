import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetTasks = ({ assigneeId, managerId }) => {
  return useQuery({
    queryKey: ['tasks', assigneeId, managerId],
    queryFn: async () => {
      let endpoint = 'http://localhost:5154/task';
      if (assigneeId) {
        endpoint += `?assignee=${assigneeId}`;
      } else if (managerId) {
        endpoint += `?managerId=${managerId}`;
      }
      const { data } = await axios.get(endpoint);
      const grouped = data.reduce((acc, task) => {
        const status = task.status;
        if (!acc[status]) acc[status] = [];
        acc[status].push(task);
        return acc;
      }, {
        Todo: [],
        InProgress: [],
        CodeReview: [],
        Completed: [],
      });
      return grouped;
    }
  });
};