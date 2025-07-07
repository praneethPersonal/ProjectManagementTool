import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', 'Helvetica Neue', sans-serif;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(15px);
  padding: 3rem 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 460px;
  border: 1px solid rgba(255, 255, 255, 0.4);
`;

const Title = styled.h1`
  font-size: 1.9rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: #1f2937;
`;

const Input = styled.input`
  width: 92%;
  padding: 0.75rem 1rem;
  margin-bottom: 1.2rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.7);
  color: #111827;
  font-family: 'Inter', 'Roboto', 'Helvetica Neue', sans-serif;
  transition: border-color 0.3s ease, background 0.3s ease;

  &::placeholder {
    color: #6b7280;
  }

  &:focus {
    border-color: #2563eb;
    outline: none;
    background: rgba(255, 255, 255, 0.9);
  }
`;

const Button = styled.button`
  width: 100%;
  background-color: #2563eb;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  font-family: 'Inter', 'Roboto', 'Helvetica Neue', sans-serif;
  cursor: pointer;
  margin-top: 0.5rem;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #1d4ed8;
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
  }
`;

const ToggleText = styled.p`
  text-align: center;
  font-size: 0.9rem;
  margin-top: 1.2rem;
  color: #4b5563;
  font-family: 'Inter', 'Roboto', 'Helvetica Neue', sans-serif;
`;

const ToggleLink = styled.span`
  color: #2563eb;
  font-weight: 600;
  cursor: pointer;
  margin-left: 0.3rem;
  font-family: 'Inter', 'Roboto', 'Helvetica Neue', sans-serif;

  &:hover {
    text-decoration: underline;
  }
`;

export {ToggleLink, ToggleText, Button, Input, Title, Card, Container}