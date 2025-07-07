import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width: 520px;
  margin: 10px auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.10);
  padding: 6px 32px 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Heading = styled.h2`
  margin-bottom: 10px;
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  text-align: center;
`;

export const Label = styled.label`
  font-weight: 500;
  color: #444;
`;

export const Input = styled.input`
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  margin-bottom: 8px;
  &:focus {
    border-color: #007bff;
  }
`;

export const Textarea = styled.textarea`
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  min-height: 60px;
  resize: vertical;
  outline: none;
  margin-bottom: 8px;
  &:focus {
    border-color: #007bff;
  }
`;

export const Select = styled.select`
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  margin-bottom: 8px;
  background: #fff;
  &:focus {
    border-color: #007bff;
  }
`;

export const Button = styled.button`
  padding: 12px 0;
  border-radius: 6px;
  border: none;
  background: #007bff;
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #0056b3;
  }

`;

export const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 8px 0;
`;

export const CommentItem = styled.li`
  background: #f0f4fa;
  border-radius: 8px;
  padding: 8px 12px;
  margin: 6px 0;
  font-size: 1rem;
  color: #333;
  border-left: 3px solid #007bff;
  word-break: break-word;
`;