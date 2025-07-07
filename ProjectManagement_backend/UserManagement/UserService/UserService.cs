using System.Security.Claims;
using ProjectManagement_backend.Models;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.SignalR;


namespace ProjectManagement_backend;

public class UserService: IUserService
{
    private readonly IDatabase _repo;
    private readonly IConfiguration _config;
    

    public UserService(IDatabase repo, IConfiguration config)
    {
        _repo = repo;
        _config = config;
    }

    public async Task<string> SignupAsync(SignupRequest req)
    {
        var existingUser = await _repo.GetUserByEmailAsync(req.email);
        if (existingUser != null)
            return "Email already registered.";

        var hashedPassword = PasswordHelper.HashPassword(req.password);

        var user = new User
        {
            name = req.name,
            email = req.email,
            encrpttedPassword = hashedPassword,
            role = req.role,
            manager = req.manager
        };

        await _repo.CreateUserAsync(user);
        return "Signup successful.";
    }

    public async Task<LoginResponse> LoginAsync(LoginRequest req)
    {
        var user = await _repo.GetUserByEmailAsync(req.email);
        if (user == null || !PasswordHelper.VerifyPassword(req.password, user.encrpttedPassword))
            return new LoginResponse();
        var result = new LoginResponse()
        {
            token = GenerateToken(user),
            email = user.email,
            role = user.role,
            manager = user.manager,
            name = user.name,
            userId = user.Id,
            notifications = user.notifications
        };
        return result;
    }

    public async Task<string> ChangePasswordAsync(PasswordChangeRequest req)
    {
        var user = await _repo.GetUserByEmailAsync(req.email);
        if (user == null || !PasswordHelper.VerifyPassword(req.oldPassword, user.encrpttedPassword))
            return "Incorrect current password.";

        var newHashedPassword = PasswordHelper.HashPassword(req.newPassword);
        await _repo.UpdatePasswordAsync(req.email, newHashedPassword);
        return "Password updated successfully.";
    }
    
    public async Task<List<User>> GetAllUsersAsync()
    {
        return await _repo.GetAllUsersAsync();
    }
    
    public async Task<string> ChangeRoleAsync(RollChangeRequest req)
    {
        await _repo.ChangeUserRoleAsync(req);
        return "updated role successfully.";
    }

    public async Task NotificationsSeen(string userId)
    {
        await _repo.RemoveNotificationAsync(userId);
    }
    
    public string GenerateToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Email, user.Id),
            new Claim("role", user.role),
            new Claim("name", user.name)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(_config["Jwt:ExpireMinutes"])),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}


