import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  flex-flow: row;
  position: relative;
  width: 100%;
`;

export const ChannelContent = styled.div`
  position: relative;
  width: 75%;
  display: flex;
  flex-flow: column;
`;

export const ChannelChat = styled.div`
  width: 100%;
`;

export const DragOver = styled.div`
  position: absolute;
  top: 64px;
  left: 0;
  width: 100%;
  height: calc(100% - 64px);
  background: white;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`;
