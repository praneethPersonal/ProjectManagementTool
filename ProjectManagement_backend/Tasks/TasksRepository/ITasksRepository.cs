using MongoDB.Bson;

namespace Tasks.TasksRepository;

public interface ITasksRepository
{
    public Task CreateTaskAsync(TaskItem task);
    public Task UpdateTaskAsync(string id, UpdateTaskRequest req);
    public Task<List<TaskItem>> GetTasksAsync(string? managerId, string? assignee, string? id);

}