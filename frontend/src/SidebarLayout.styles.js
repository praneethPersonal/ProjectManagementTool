import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', Roboto, sans-serif;
`;

export const Sidebar = styled.div`
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
  width: ${({ isOpen }) => (isOpen ? '220px' : '60px')};
  transition: width 0.3s ease;
  padding: 20px 10px;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #444;
  font-size: 20px;
  align-self: flex-end;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

export const Nav = styled.nav`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NavItem = styled(Link)`
  color: #333;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  padding: 10px 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f5;
    color: #007bff;
  }

  span {
    display: ${({ isOpen }) => (isOpen ? 'inline' : 'none')};
    white-space: nowrap;
  }
`;

export const Content = styled.div`
  flex: 1;
  background-color: #f9f9fb;
  padding: 30px;
  overflow-y: auto;
`;

export const Welcome = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: #666;
  font-weight: 400;
  padding-left: 10px;
`;

export const StyledPopup = styled.div`
  position: absolute;
  left: 80px;
  top: 10px;
  width: 320px;
  max-height: 400px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 20px;
  z-index: 999;
  overflow-y: auto;
`;

export const PopupHeader = styled.h4`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1f2937;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 8px;
`;

export const NotificationList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const NotificationItem = styled.li`
  background: #f3f4f6;
  margin-bottom: 10px;
  padding: 12px 14px;
  border-radius: 10px;
  font-size: 14px;
  color: #374151; 

  &:hover {
    background: #e5e7eb;
  }
`;

