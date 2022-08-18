import styled from '@emotion/styled';

export const ChannelMembersWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 25%;
  background: #f2f3f5;

  & > p {
    font-size: 16px;
    font-weight: 900;
    color: #747f8d;
    margin: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export const Members = styled.div`
  height: 60px;
  color: #222;
  background: #fff;
  border: none;
  border-radius: 5px;
  margin: 0 10px 10px 10px;
  font-size: 15px;
  font-weight: 600;

  display: flex;
  align-items: center;
  padding: 15px 20px;
`;