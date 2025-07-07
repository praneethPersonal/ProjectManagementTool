using MongoDB.Bson;
using MongoDB.Driver;
using Tasks;
using Tasks.TasksRepository;

namespace MyApp.Repositories;

public class TaskRepository: ITasksRepository
{
    private readonly IMongoCollection<TaskItem> _tasks;

    public TaskRepository(IConfiguration config)
    {
        var client = new MongoClient(config["MongoDB:ConnectionString"]);
        var db = client.GetDatabase(config["MongoDB:Database"]);
        _tasks = db.GetCollection<TaskItem>("Tasks");
    }

    public async Task CreateTaskAsync(TaskItem task) =>
        await _tasks.InsertOneAsync(task);

    public async Task UpdateTaskAsync(string id, UpdateTaskRequest req) =>
        await _tasks.UpdateOneAsync(
            t => t.Id == id,
            Builders<TaskItem>.Update
                .Set(t => t.assignee, req.assignee)
                .Set(t => t.status, req.status)
                .Set(t => t.is_deleted, req.is_deleted)
                .Set(t => t.description, req.description)
                .Set(t => t.title, req.title)
                .Set(t => t.comments, req.comments)
        );

    public async Task<List<TaskItem>> GetTasksAsync(string? managerId, string? assignee, string? id)
    {
        var filterBuilder = Builders<TaskItem>.Filter;
        var filter = filterBuilder.Empty;

        if (managerId != null)
            filter &= filterBuilder.Eq(t => t.manager_id, managerId);

        if (assignee != null)
            filter &= filterBuilder.Eq(t => t.assignee, assignee);

        if (id != null)
            filter &= filterBuilder.Eq(t => t.Id, id);

        filter &= filterBuilder.Eq(t => t.is_deleted, false);

        return await _tasks.Find(filter).ToListAsync();
    }
}