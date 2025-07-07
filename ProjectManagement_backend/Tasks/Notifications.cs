using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;

public class NotificationHub : Hub
{
    public async Task SendNotification(string message)
    {
        await Clients.All.SendAsync("ReceiveNotification", message);
    }
}

public class CustomUserIdProvider : IUserIdProvider
{
    public string GetUserId(HubConnectionContext connection)
    {
        var id = connection.User?.FindFirst(ClaimTypes.Email)?.Value;
        Console.WriteLine($"notificationId {id}");
        return id;
    }
}

