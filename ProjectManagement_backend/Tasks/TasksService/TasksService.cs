using Microsoft.AspNetCore.SignalR;
using MongoDB.Bson;
using ProjectManagement_backend;
using Tasks;
using Tasks.TasksRepository;
using Tasks.TasksService;

namespace Tasks.Services;

public class TaskService: ITasksService
{
    private readonly ITasksRepository _repo;
    private readonly IHubContext<NotificationHub> _hubContext;
    private readonly IDatabase _userRepository;

    public TaskService(ITasksRepository repo, IHubContext<NotificationHub>  notificationsHub, IDatabase database)
    {
        _repo = repo;
        _hubContext = notificationsHub;
        _userRepository = database;
    }

    public async Task<string> CreateTaskAsync(CreateTaskRequest req)
    {
        var task = new TaskItem
        {
            manager_id = req.manager_id,
            reporter = req.reporter,
            assignee = req.assignee,
            status = req.status,
            is_deleted = false,
            description = req.description,
            title = req.title,
        };

        await _repo.CreateTaskAsync(task);
        handleNotification(req.assignee, $"{req.title} Task has been created.");
        handleNotification(req.manager_id, $"{req.title} Task has been created.");
        return "Task created successfully.";
    }

    public async Task<string> UpdateTaskAsync(string id, UpdateTaskRequest req)
    {
        await _repo.UpdateTaskAsync(id, req);
        handleNotification(req.assignee, $"{req.title} has been updated.");
        var task = await _repo.GetTasksAsync(null, null, id);
        handleNotification(task.FirstOrDefault().manager_id, $"{req.title} has been updated.");
        return "Task updated successfully.";
    }

    public async Task<List<TaskItem>> GetTasksAsync(string? managerId, string? assignee, string? id)
    {
        return await _repo.GetTasksAsync(managerId, assignee, id);
    }

    public void handleNotification(string userId, string notification)
    {
        _hubContext.Clients.User(userId).SendAsync("ReceiveNotification",notification);
        _userRepository.AddNotificationAsync(userId, notification);
    }
}