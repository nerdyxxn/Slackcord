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

export const ProfileModal = styled.div`
  display: flex;
  padding: 20px;
  & img {
    display: flex;
  }
  & > div {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
  & #profile-name {
    font-weight: bold;
    display: inline-flex;
  }
  & #profile-active {
    font-size: 13px;
    display: inline-flex;
  }
`;

export const LogOutButton = styled.button`
  border: none;
  width: 100%;
  border-top: 1px solid rgb(29, 28, 29);
  background: transparent;
  display: block;
  height: 33px;
  padding: 5px 20px 5px;
  outline: none;
  cursor: pointer;
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
  font-weight: 600;

  & a {
    padding-left: 20px;
    margin: 0 10px;
    color: inherit;
    text-decoration: none;
    height: 28px;
    line-height: 28px;
    display: flex;
    align-items: center;

    &.selected {
      color: #060607;
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
    color: white;
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
  color: #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MenuList = styled.div`
  overflow-y: auto;
`;

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

export const Chats = styled.div`
  flex: 1;
`;

export const AddButton = styled.button`
  color: white;
  font-size: 24px;
  display: inline-block;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const WorkspaceButton = styled.button`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: white;
  border: 3px solid #3f0e40;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 700;
  color: black;
  cursor: pointer;
`;

export const AddUser = styled(MdPersonAddAlt1)`
  color: #505660;
  font-size: 20px;
  cursor: pointer;
`;

export const ProfileWrapper = styled.div`
  height: 60px;
  border-top: 1px solid #e3e5e8;
  display: flex;
  align-items: center;
  padding: 10px 20px;

  & > .profile-img {
    padding-right: 5px;
  }

  & > .profile-img > img {
    border-radius: 50%;
  }
`;
