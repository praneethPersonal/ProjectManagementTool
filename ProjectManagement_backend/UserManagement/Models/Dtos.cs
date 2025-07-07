using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProjectManagement_backend.Models;

public class SignupRequest
{
    public string name { get; set; }
    public string password { get; set; }
    public string email { get; set; }
    public string role { get; set; }
    public string manager { get; set; }
}

public class LoginRequest
{
    public string email { get; set; }
    public string password { get; set; }
}

public class PasswordChangeRequest
{
    public string email { get; set; }
    public string oldPassword { get; set; }
    public string newPassword { get; set; }
}

public class RollChangeRequest
{
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string Role { get; set; }
    [BsonRepresentation(BsonType.ObjectId)]
    public string Manager { get; set; }
}

public class LoginResponse
{
    public string token { get; set; }
    public string email { get; set; }
    public string role { get; set; }
    public string manager { get; set; }
    public string name { get; set; }
    public string userId { get; set; }
    public List<string> notifications { get; set; }
}