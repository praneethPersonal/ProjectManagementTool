# ProjectManagementTool
1. this tool is used to manage projects and its tasks.
2. tasks have 4 types todo, inprogress, codereview, done. this will help to manage the project timely
3. backend is on dotnet(c#) used signalR for realtime notifications
4. websockets are secured with jwt token and gets userId from token, which helps to send notifications to a particular user only. ex: when an update happend to a task, assignee and manager gets notifications
5. role-based access control is given for managing users. ex: only managers or admin can make changes in employees manager or make an employee manager
6. used React for frontend. mongodb for database
7. Included a "Read/Unread" status for notifications.
