using MongoDB.Bson;

namespace Tasks.TasksService;

public interface ITasksService
{
    public Task<string> CreateTaskAsync(CreateTaskRequest req);
    public Task<string> UpdateTaskAsync(string id, UpdateTaskRequest req);
    public Task<List<TaskItem>> GetTasksAsync(string? managerId, string? assignee, string? id);
}