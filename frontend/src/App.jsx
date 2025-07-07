import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Dashboard from "./Pages/Dashboard.jsx";
import Tasks from "./Pages/Tasks";
import CreateTask from "./Pages/MyTasks";
import UserManagement from "./Pages/Users";
import LoginSignup from "./Pages/LoginSignup.jsx";
import SidebarLayout from "./SidebarLayout.jsx";
import Notifications from "./Pages/Notifications.jsx";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const user = localStorage.getItem("token"); 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<LoginSignup />} />

        <Route element={<SidebarLayout />}>
          <Route path="/dashboard" element={<ProtectedRoute user={user}><Dashboard /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute user={user}><Tasks /></ProtectedRoute>} />
          <Route path="/tasks/my" element={<ProtectedRoute user={user}><CreateTask /></ProtectedRoute>} />
           <Route path="/users" element={<ProtectedRoute user={user}><UserManagement /></ProtectedRoute>} />
           <Route path="/notifications" element={<ProtectedRoute user={user}><Notifications /></ProtectedRoute>} />
        </Route>
       
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App
