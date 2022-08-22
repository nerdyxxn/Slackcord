import styled from '@emotion/styled';

export const Form = styled.form`
  height: 270px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 12px;
  margin: 12px 0 22px 0;
`;

export const Label = styled.label`
  margin-bottom: 5px;

  & > span {
    display: block;
    text-align: left;
    padding-bottom: 8px;
    font-size: 15px;
    cursor: pointer;
    line-height: 1.46666667;
    font-weight: 700;
    color: #222;
  }
`;

export const Input = styled.input`
  border-radius: 6px;
  border: none;
  background: #f2f3f5;
  box-sizing: border-box;
  margin: 0 0 20px;
  width: 100%;
  padding: 12px;
  height: 44px;
  padding-top: 11px;
  padding-bottom: 13px;
  font-size: 14px;
  line-height: 1.33333333;

  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;

export const Button = styled.button`
  margin-top: 12px;
  width: 100%;
  max-width: 100%;
  color: #fff;
  background-color: #1bd689;
  border: none;
  font-size: 17px;
  font-weight: 800;
  height: 44px;
  min-width: 96px;
  padding: 0 16px 3px;
  transition: all 80ms linear;
  user-select: none;
  outline: none;
  cursor: pointer;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    opacity: 0.9;
    border: none;
  }
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;
