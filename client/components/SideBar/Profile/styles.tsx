import styled from '@emotion/styled';
import { BsCameraVideoFill, BsFillMicFill, BsHeadphones } from 'react-icons/bs';

export const ProfileWrapper = styled.div`
  height: 60px;
  border-top: 1px solid #e3e5e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 10px 20px;
  font-size: 15px;
  font-weight: 700;
`;

export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  & > .profile-img {
    padding-right: 5px;
  }

  & > .profile-img > img {
    border-radius: 50%;
  }
`;

export const MediaWrapper = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    height: 100%;
    padding-right: 10px;
    font-size: 28px;
    cursor: pointer;
  }
`;

export const MicButton = styled(BsFillMicFill)``;
export const HeadphoneButton = styled(BsHeadphones)``;
export const CameraButton = styled(BsCameraVideoFill)``;
