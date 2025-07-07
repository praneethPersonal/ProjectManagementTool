import styled from 'styled-components';

export const Board = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  overflow-x: auto;
  min-height: 80vh;
`;

export const Column = styled.div`
  flex: 1;
  min-width: 250px;
  background: #f4f6f8;
  border-radius: 10px;
  padding: 16px;
`;

export const ColumnTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 12px;
  color: #333;
`;

export const TaskCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  box-shadow: 0 1px 5px rgba(0,0,0,0.05);
  
  p {
    font-size: 14px;
    color: #444;
    margin: 4px 0;
  }
`;

export const Empty = styled.p`
  font-style: italic;
  font-size: 14px;
  color: #999;
`;
