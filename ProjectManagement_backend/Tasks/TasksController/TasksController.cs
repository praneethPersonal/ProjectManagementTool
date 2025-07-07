using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Bson;
using Tasks.TasksService;

namespace Tasks.Controllers;

[ApiController]
[Route("task")]
public class TaskController : ControllerBase
{
    private readonly ITasksService _service;
    private readonly IHubContext<NotificationHub> _hubContext;

    public TaskController(ITasksService service, IHubContext<NotificationHub>  notificationsHub)
    {
        _service = service;
        _hubContext = notificationsHub;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateTaskRequest req)
    {
        var result = await _service.CreateTaskAsync(req);
        return Ok(new { message = result });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, UpdateTaskRequest req)
    {
        var result = await _service.UpdateTaskAsync(id, req);
        return Ok(new { message = result });
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] string? managerId, [FromQuery] string? assignee, [FromQuery] string? id)
    {
        var tasks = await _service.GetTasksAsync(managerId, assignee, id);
        if (tasks.Count == 0)
        {
            return NotFound();
        }

        
        return Ok(tasks);
    }
}