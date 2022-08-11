import styled from '@emotion/styled';
import { MdPersonAddAlt1 } from 'react-icons/md';

export const Header = styled.div`
  height: 64px;
  display: flex;
  width: 100%;
  --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  box-shadow: 0 1px 0 var(--saf-0);
  padding: 20px 16px 20px 20px;
  font-weight: bold;
  align-items: center;

  & .header-right {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
  }
`;

export const AddUser = styled(MdPersonAddAlt1)`
  font-size: 20px;
`;
