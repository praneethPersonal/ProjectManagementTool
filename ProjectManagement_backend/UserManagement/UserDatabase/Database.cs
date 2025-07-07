using MongoDB.Driver;
using ProjectManagement_backend.Models;

namespace ProjectManagement_backend;

public class UserRepository : IDatabase
{
    private readonly IMongoCollection<User> _users;

    public UserRepository(IConfiguration config)
    {
        var client = new MongoClient(config["MongoDB:ConnectionString"]);
        var db = client.GetDatabase(config["MongoDB:Database"]);
        _users = db.GetCollection<User>("users");
    }

    public async Task<User?> GetUserByEmailAsync(string email) =>
        await _users.Find(u => u.email == email).FirstOrDefaultAsync();

    public async Task CreateUserAsync(User user) =>
        await _users.InsertOneAsync(user);

    public async Task UpdatePasswordAsync(string email, string newHashedPassword) =>
        await _users.UpdateOneAsync(
            u => u.email == email,
            Builders<User>.Update.Set(u => u.encrpttedPassword, newHashedPassword));
    
    public async Task ChangeUserRoleAsync(RollChangeRequest rollChangeRequest) => 
        await _users.UpdateOneAsync(u => u.Id == rollChangeRequest.Id,
            Builders<User>.Update.Set(u => u.role, rollChangeRequest.Role)
            .Set(u => u.manager, rollChangeRequest.Manager));
    public async Task<List<User>> GetAllUsersAsync()
    {
        return await _users.Find(_ => true).ToListAsync();
    }
    public async Task AddNotificationAsync(string userId, string message)
    {
        var filter = Builders<User>.Filter.Eq(u => u.Id, userId);
        var update = Builders<User>.Update.Push(u => u.notifications, message);

        await _users.UpdateOneAsync(filter, update);
    }

    public async Task RemoveNotificationAsync(string userId)
    {
        var filter = Builders<User>.Filter.Eq(u => u.Id, userId);
        var update = Builders<User>.Update.Set(u => u.notifications, []);
        await _users.UpdateOneAsync(filter, update);
    }
}
