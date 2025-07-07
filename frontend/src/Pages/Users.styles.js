import styled from 'styled-components';

export const Panel = styled.div`
  max-width: 600px;
  margin: 48px auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.10);
  padding: 20px 32px 28px 40px;
  font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, 'Liberation Sans', sans-serif;
`;

export const Section = styled.section`
  margin-bottom: 32px;
  padding-bottom: 18px;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #222;
    margin-bottom: 16px;
    font-family: inherit;
  }
`;

export const UserCard = styled.div`
  background: #f7f8fa;
  border-radius: 8px;
  padding: 14px 18px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-family: inherit;
  p {
    margin: 0;
    color: #333;
    font-weight: 500;
    font-family: inherit;
  }
  button {
    padding: 7px 18px;
    border-radius: 6px;
    border: none;
    background: #007bff;
    color: #fff;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.2s;
    &:hover {
      background: #0056b3;
    }
  }
`;

export const FormRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
  select {
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 1rem;
    font-family: inherit;
    background: #fff;
    outline: none;
    &:focus {
      border-color: #007bff;
    }
  }
  button {
    padding: 8px 18px;
    border-radius: 6px;
    border: none;
    background: #007bff;
    color: #fff;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.2s;
    &:hover {
      background: #0056b3;
    }
    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
`;