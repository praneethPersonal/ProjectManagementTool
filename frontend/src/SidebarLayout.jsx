import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Outlet, useNavigate } from 'react-router-dom';
import * as signalR from '@microsoft/signalr';
import Toast from './components/Toast'; // adjust path if needed
import {
  Container,
  Sidebar,
  ToggleButton,
  Nav,
  NavItem,
  Content,
  Welcome,
  StyledPopup,
  PopupHeader,
  NotificationList,
  NotificationItem
} from './SidebarLayout.styles';
import { Overlay } from './Pages/TaskModal.styles';
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { TbLogout2 } from "react-icons/tb";
import { IoIosNotifications, IoIosCreate } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { useGetTeamAndManager } from './hooks/GetUsers';
import axios from "axios"

const SidebarLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState("");
  const user = localStorage.getItem('name');
  const role = localStorage.getItem("role")
  const name = user || 'User';
  const navigate = useNavigate();
  const connectionRef = useRef(null);
  const popupRef = useRef();
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const userId = localStorage.getItem("userId")
 const {teamMembers, refetch} = useGetTeamAndManager()
  const messages = teamMembers?.filter((val) => val.id === userId)[0]?.notifications ?? [];
  console.log(messages)

  useEffect(() => {
     const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5154/hubs/notifications", {
                accessTokenFactory: () => localStorage.getItem("token") 
            })
            .withAutomaticReconnect()
            .build();
    connectionRef.current = connection;

    const handleNotification = (message) => {
      setToast(message);
    };

    connection.start().then(() => {
      console.log("connected signalR")
      connection.on('ReceiveNotification', handleNotification);
    }).catch(err => {
      console.error('SignalR Connection Error:', err);
    });
    refetch()

    return () => {
      connection.off('ReceiveNotification', handleNotification);
      connection.stop();
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear(); 
    setToast("Logged out successfully!");
    navigate('/login');
  };

const { mutate: mutateFn, isPending, isSuccess, isError } = useMutation({
    mutationFn: async () => {
      console.log(userId, 111111111111111)
      const response = await axios.put(
        `http://localhost:5154/Auth/notificationSeen?userId=${userId}`
      );
      console.log(response)
      return response.data;
    },
  });;
  const handleCloseNotifications = () => {
    mutateFn();
    setIsPopupOpen(false);
    
    setTimeout(() =>refetch(),2000)
  }

  return (
    <Container>
      <Toast message={toast} onClose={() => setToast("")} />
      <Sidebar isOpen={isOpen}>
        <ToggleButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <GoSidebarExpand /> : <GoSidebarCollapse />}
        </ToggleButton>

        <Welcome>{isOpen && `Welcome, ${name}`}</Welcome>

        <Nav>
          <NavItem to="/dashboard" isOpen={isOpen}><MdSpaceDashboard size={20} /> <span>Dashboard</span></NavItem>
          <NavItem to="/tasks" isOpen={isOpen}><FaTasks size={18}/> <span>Tasks</span></NavItem>
          <NavItem to="/tasks/my" isOpen={isOpen}><IoIosCreate size={20} /> <span>Create new Task</span></NavItem> 
          <NavItem as="div" onClick={() => {if (!isPopupOpen)setIsPopupOpen(!isPopupOpen);else handleCloseNotifications}} isOpen={isOpen} style={{ cursor: 'pointer' }}>
            <IoIosNotifications size={28} />
            <span>Notifications</span>
          </NavItem>
          {(role === "admin" || role === "manager") && (
            <NavItem to="/users" isOpen={isOpen}>👥 <span>Users</span></NavItem>
          )}
          <NavItem as="div" onClick={handleLogout} isOpen={isOpen} style={{ cursor: 'pointer' }}>
            <TbLogout2 size={20} />
            <span>Logout</span>
            </NavItem>
        </Nav>
      </Sidebar>

      {isPopupOpen && (
        <Overlay onClick={() => handleCloseNotifications()}>
          <StyledPopup ref={popupRef}>
          <PopupHeader>Notifications</PopupHeader>
          <NotificationList>
            {messages.map((msg, i) => (
              <NotificationItem key={i}>{msg}</NotificationItem>
            ))}
          </NotificationList>
        </StyledPopup>
        </Overlay>
        
      )}
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};

export default SidebarLayout;
