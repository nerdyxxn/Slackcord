import styled from '@emotion/styled';
import { MdPersonAddAlt1 } from 'react-icons/md';

export const Header = styled.header`
  height: 38px;
  background: #350d36;
  color: #ffffff;
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.1);
  padding: 5px;
  text-align: center;
`;

export const ProfileImg = styled.img`
  width: 28px;
  height: 28px;
  position: absolute;
`;

export const WorkspaceWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex: 1;
`;

export const Workspaces = styled.div`
  height: 100%;
  width: 65px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background: #e3e5e8;
  vertical-align: top;
  text-align: center;
  padding: 15px 0 0;
`;

export const Channels = styled.nav`
  height: 100%;
  width: 260px;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  background: #f2f3f5;
  color: #747f8d;
  vertical-align: top;
  font-weight: 500;

  & a {
    font-size: 15px;
    padding-left: 20px;
    margin: 0 10px;
    color: inherit;
    text-decoration: none;
    height: 28px;
    line-height: 28px;
    display: flex;
    align-items: center;

    &.selected {
      color: #222;
      background: #d3d7db;
      border-radius: 5px;
      font-weight: bold;
    }
    &.selected > .c-presence--active {
      color: #1bd689;
    }
  }

  & a > .c-icon--presence-online {
    color: #1bd689;
  }
  & .bold {
    color: #222;
    font-weight: bold;
  }
  & .count {
    margin-left: auto;
    background: #cd2553;
    border-radius: 16px;
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    height: 18px;
    line-height: 18px;
    padding: 0 9px;
    color: white;
    margin-right: 16px;
  }
  & h2 {
    height: 36px;
    line-height: 36px;
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 15px;
  }
`;

export const WorkspaceTitle = styled.div`
  text-transform: uppercase;
  height: 64px;
  line-height: 64px;
  width: 100%;
  text-align: left;
  border-bottom: 1px solid #e3e5e8;
  font-weight: 800;
  font-size: 20px;
  background: transparent;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 0;
  padding-left: 14px;
  padding-right: 14px;
  margin: 0;
  color: #222;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MenuList = styled.div``;

export const WorkspaceModal = styled.div`
  padding: 10px 0 0;
  & h2 {
    padding-left: 20px;
  }
  & > button {
    width: 100%;
    height: 28px;
    padding: 4px;
    border: none;
    background: transparent;
    border-top: 1px solid rgb(28, 29, 28);
    cursor: pointer;
    &:last-of-type {
      border-bottom: 1px solid rgb(28, 29, 28);
    }
  }
`;

export const AddUser = styled(MdPersonAddAlt1)`
  color: #505660;
  font-size: 20px;
  cursor: pointer;
`;
