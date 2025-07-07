using Microsoft.AspNetCore.Identity.Data;
using ProjectManagement_backend.Models;
using LoginRequest = ProjectManagement_backend.Models.LoginRequest;

namespace ProjectManagement_backend;

public interface IUserService
{
    public Task<string> SignupAsync(SignupRequest req);
    public Task<LoginResponse> LoginAsync(LoginRequest req);
    public Task<string> ChangePasswordAsync(PasswordChangeRequest req);
    public Task<List<User>> GetAllUsersAsync();
    public Task<string> ChangeRoleAsync(RollChangeRequest req);
    public Task NotificationsSeen(string userId);
}