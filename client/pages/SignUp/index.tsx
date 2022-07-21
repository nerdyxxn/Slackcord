import React, { useCallback, useState } from 'react';
import {
  Form,
  Label,
  Input,
  LinkContainer,
  Button,
  Header,
  Error,
  Container,
  Success,
} from './styles';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import useInput from '@hooks/useInput';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

function SignUp() {
  const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher);
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!mismatchError) {
        console.log('서버로 회원가입 하기');
        // 비동기 요청 보내기 전에 state 초기화
        setSignUpError('');
        setSignUpSuccess(false);

        axios
          .post('/api/users', { email, nickname, password })
          .then((response) => {
            console.log(response);
            setSignUpSuccess(true);
          })
          .catch((error) => {
            console.log(error);
            setSignUpError(error.response.data);
          });
      }
    },
    [email, nickname, password, passwordCheck, mismatchError],
  );

  // 로딩중 처리
  if (data === undefined) {
    return <div>Loading...</div>;
  }

  // 로그인 상태이면 channel로 이동시키기
  if (data) {
    return <Navigate to="/workspace/sleact/channel/일반" />;
  }

  return (
    <Container>
      <Header>Slackcord</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}></Input>
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input
              type="nickname"
              id="nickname"
              name="nickname"
              value={nickname}
              onChange={onChangeNickname}></Input>
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}></Input>
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}></Input>
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {/* {!nickname && <Error>닉네임을 입력해주세요</Error>} */}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>회원가입 되었습니다! 로그인 해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러 가기</Link>
      </LinkContainer>
    </Container>
  );
}

export default SignUp;
