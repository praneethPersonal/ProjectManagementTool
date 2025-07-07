using Microsoft.AspNetCore.Mvc;
using ProjectManagement_backend.Models;

namespace ProjectManagement_backend.UserController;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _service;

    public AuthController(IUserService service)
    {
        _service = service;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup(SignupRequest req)
    {
        var result = await _service.SignupAsync(req);
        return Ok(result);
    }

    [HttpGet("login")]
    public async Task<IActionResult> Login([FromQuery] LoginRequest req)
    {
        var result = await _service.LoginAsync(req);
        if (result.email == null)
        {
            return BadRequest("Invalid credentials.");
        }
        return Ok(result);
    }

    [HttpPut("changepassword")]
    public async Task<IActionResult> ChangePassword(PasswordChangeRequest req)
    {
        var result = await _service.ChangePasswordAsync(req);
        return Ok(result);
    }

    [HttpPut("changeRole")]
    public async Task<IActionResult> Changerole(RollChangeRequest req)
    {
        var result = await _service.ChangeRoleAsync(req);
        return Ok(result);
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _service.GetAllUsersAsync();
        return Ok(users);
    }

    [HttpPut("notificationSeen")]
    public async Task<IActionResult> RemoveNotifications(string userId)
    {
        await _service.NotificationsSeen(userId);
        return Ok();
    }
}
