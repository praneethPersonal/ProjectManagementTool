using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Tasks;

public class CreateTaskRequest
{
    [BsonRepresentation(BsonType.ObjectId)]
    public string manager_id { get; set; }
    [BsonRepresentation(BsonType.ObjectId)]
    public string reporter { get; set; }
    public string assignee { get; set; }
    public string status { get; set; }
    public string description { get; set; }
    public string title { get; set; }
}

public class UpdateTaskRequest
{
    [BsonRepresentation(BsonType.ObjectId)]
    public string assignee { get; set; }
    public string status { get; set; }
    public bool is_deleted { get; set; }
    public string description { get; set; }
    public string title { get; set; }
    public List<string> comments { get; set; }
}

public class TaskItem
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    [BsonRepresentation(BsonType.ObjectId)]
    public string manager_id { get; set; }
    [BsonRepresentation(BsonType.ObjectId)]
    public string reporter { get; set; }
    [BsonRepresentation(BsonType.ObjectId)]
    public string assignee { get; set; }
    public string status { get; set; }
    public bool is_deleted { get; set; }
    public string description { get; set; }
    public string title { get; set; }
    public List<string> comments { get; set; }
}
