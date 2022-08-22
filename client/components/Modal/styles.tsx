import styled from '@emotion/styled';

export const CreateModal = styled.div`
  position: fixed;
  text-align: center;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 1022;
  background-color: rgba(0, 0, 0, 0.5);

  & > div {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 450px;
    background: white;
    box-shadow: 0 0.125rem 0.25rem rgba(255, 255, 255, 0.175) !important;
    border: none;
    border-radius: 12px;
    user-select: none;
    padding: 30px 40px 0;
    z-index: 1012;
    position: relative;
  }
`;

export const CloseModalButton = styled.button`
  position: absolute;
  right: 10px;
  top: 6px;
  background: transparent;
  border: none;
  font-size: 25px;
  color: #222;
  cursor: pointer;
`;
