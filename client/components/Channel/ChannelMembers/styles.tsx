import styled from '@emotion/styled';
import { VscCircleFilled } from 'react-icons/vsc';

export const ChannelMembersWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 25%;
  background: #f2f3f5;

  & > p {
    font-size: 16px;
    font-weight: 900;
    color: #747f8d;
    margin: 12px;
    margin-top: 20px;
    margin-bottom: 16px;
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

export const Online = styled(VscCircleFilled)`
  position: relative;
  margin: 0;
  left: -10px;
  top: 7px;
  color: #1bd689;
`;

export const Offline = styled(VscCircleFilled)`
  position: relative;
  margin: 0;
  left: -10px;
  top: 7px;
  color: #d3d7db;
`;
