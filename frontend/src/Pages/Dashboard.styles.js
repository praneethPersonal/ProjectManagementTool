import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  font-family: 'Segoe UI', Roboto, sans-serif;
  background-color: #f9f9fb;
  min-height: 100vh;
`;

export const Header = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const WidgetCard = styled.div`
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const WidgetTitle = styled.h4`
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
`;

export const WidgetCount = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #222;
`;

export const TeamSection = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  height: fit-content;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const TeamTitle = styled.h4`
  font-size: 16px;
  color: #444;
  margin-bottom: 15px;
`;

export const MemberItem = styled.div`
  font-size: 14px;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  color: #333;
`;