import styled from '@emotion/styled';
import { MdPersonAddAlt1 } from 'react-icons/md';

export const Header = styled.div`
  height: 64px;
  display: flex;
  width: 100%;
  border-bottom: 1px solid #e3e5e8;
  padding: 20px 16px 20px 20px;
  font-weight: bold;
  align-items: center;
  color: #222;

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
