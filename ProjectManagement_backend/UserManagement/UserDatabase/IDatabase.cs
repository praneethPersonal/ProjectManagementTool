using ProjectManagement_backend.Models;

namespace ProjectManagement_backend;

public interface IDatabase
{
    public Task<User?> GetUserByEmailAsync(string email);
    public Task CreateUserAsync(User user);
    public Task UpdatePasswordAsync(string email, string newHashedPassword);
    public Task<List<User>> GetAllUsersAsync();
    public Task ChangeUserRoleAsync(RollChangeRequest rollChangeRequest);
    public Task RemoveNotificationAsync(string userId);
    public Task AddNotificationAsync(string userId, string message);
}