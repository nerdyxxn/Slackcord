import styled from '@emotion/styled';

export const CreateMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1022;
  cursor: auto;
`;

export const CloseModalButton = styled.button`
  position: absolute;
  right: 10px;
  top: 6px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

export const ProfileModal = styled.div`
  display: flex;
  padding: 20px;
  & > img {
    border-radius: 50%;
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
  border-top: 1px solid #e3e5e8;
  background: #1bd689;
  color: #fff;
  font-weight: 600;
  display: block;
  height: 33px;
  padding: 5px 20px 5px;
  outline: none;
  cursor: pointer;
`;

export const ProfilePopupWrapper = styled.div`
  bottom: 70px;
  left: 73px;
  position: absolute;
  display: inline-block;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.14), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 6px;
  user-select: none;
  min-width: 360px;
  z-index: 512;
  max-height: calc(100vh - 20px);
  color: rgb(29, 28, 29);
`;
