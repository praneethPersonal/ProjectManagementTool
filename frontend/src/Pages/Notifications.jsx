import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const BellButton = styled.button`
  background: #f3f4f6;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  transition: background 0.2s;

  &:hover {
    background: #e5e7eb;
  }
`;

const Popup = styled.div`
  position: absolute;
  right: 0;
  top: 48px;
  width: 300px;
  max-height: 350px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 16px;
  z-index: 100;
  overflow-y: auto;
`;

const Title = styled.h4`
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: bold;
`;

const NotificationItem = styled.li`
  list-style: none;
  background: #f9fafb;
  margin-bottom: 8px;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background: #f3f4f6;
  }
`;

const NoNotification = styled.div`
  color: #9ca3af;
  font-size: 14px;
  text-align: center;
  padding: 20px;
`;

const Notifications = () => {
  const [messages] = useState([
    "New user registered",
    "Order #1234 has been shipped",
    "Reminder: Meeting at 3 PM",
    "Server health check completed",
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Container>
      <BellButton onClick={togglePopup}>🔔</BellButton>
      {isOpen && (
        <Popup ref={popupRef}>
          <Title>Notifications</Title>
          <ul>
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <NotificationItem key={index}>{msg}</NotificationItem>
              ))
            ) : (
              <NoNotification>No notifications</NoNotification>
            )}
          </ul>
        </Popup>
      )}
    </Container>
  );
};

export default Notifications;
