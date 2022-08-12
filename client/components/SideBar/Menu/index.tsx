import React, { VFC, useCallback } from 'react';
import { CloseModalButton, CreateMenu } from '@components/SideBar/Menu/styles';

interface Props {
  show: boolean;
  onCloseModal: (e: any) => void;
}

const Menu: VFC<Props> = ({ show, onCloseModal }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <CreateMenu onClick={onCloseModal}>
      <div onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
      </div>
    </CreateMenu>
  );
};

export default Menu;
