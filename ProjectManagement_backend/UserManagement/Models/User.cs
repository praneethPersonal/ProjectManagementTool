using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProjectManagement_backend.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string name { get; set; }
    public string encrpttedPassword { get; set; }
    public string email { get; set; }
    public string role { get; set; }
    [BsonRepresentation(BsonType.ObjectId)]
    public string manager { get; set; }
    public List<string> notifications { get; set; }
}