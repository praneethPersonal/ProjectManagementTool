import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalBox = styled.div`
  background: #fff;
  display: flex;
  min-width: 480px;
  max-width: 760px;
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  position: relative;
  padding: 0px;
`;

export const LeftSection = styled.div`
  flex: 2.5;
  padding: 36px 36px 36px 44px;
  border-right: 1px solid #eee;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const RightSection = styled.div`
  flex: 1;
  padding: 36px 24px;
  display: flex;
  flex-direction: column;
  min-width: 160px;
  background: #f7f8fa;
  align-items: flex-start;
  gap: 18px;
  border-radius: 14px;
`;

export const SidebarLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 2px; 
  color: #444;
`;

export const SidebarSelect = styled.select`
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #fff;
  font-size: 1rem;
  margin-bottom: 8px; // You can reduce this if you want less gap between dropdowns
  outline: none;
  transition: border 0.2s;
  &:focus {
    border-color: #007bff;
  }
`;

export const CloseIcon = styled.span`
  position: absolute;
  top: 18px;
  right: 22px;
  font-size: 2rem;
  color: #888;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #222;
  }
`;

export const Comment = styled.div`
  background: #f0f4fa;
  border-radius: 8px;
  padding: 10px 14px;
  margin: 5px 0;
  font-size: 1rem;
  color: #333;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  border-left: 3px solid #007bff;
  transition: background 0.2s;
  word-break: break-word;
  width: 100%;
  box-sizing: border-box;
`;

export const CommentInputRow = styled.div`
  display: flex;
  margin-top: 14px;
  gap: 8px;
  width: 100%;
`;

export const CommentInput = styled.input`
  flex: 1;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
  &:focus {
    border-color: #007bff;
  }
`;

export const CommentButton = styled.button`
  padding: 8px 18px;
  border-radius: 6px;
  border: none;
  background: #007bff;
  color: #fff;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #0056b3;
  }
`;

