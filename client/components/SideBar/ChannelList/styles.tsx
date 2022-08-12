import styled from '@emotion/styled';
import { AiOutlinePlus } from 'react-icons/ai';

export const CollapseWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CollapseButton = styled.button<{ collapse: boolean }>`
  background: transparent;
  border: none;
  height: 36px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #747f8d;
  margin-left: 10px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  padding: 0;

  ${({ collapse }) =>
    collapse &&
    `
    & i {
      transform: none;
    }
  `};
`;

export const AddIcon = styled(AiOutlinePlus)`
  color: #747f8d;
  margin-right: 12px;
  cursor: pointer;
`;
