import styled from '@emotion/styled';

export const CollapseButton = styled.button<{ collapse: boolean }>`
  background: transparent;
  border: none;
  height: 36px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #bcabbc;
  margin-left: 10px;
  cursor: pointer;
  font-size: 15px;
  ${({ collapse }) =>
    collapse &&
    `
    & i {
      transform: none;
    }
  `};
`;
