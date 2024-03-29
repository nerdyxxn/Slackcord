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
} from '@pages/SignUp/styles';

import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import useInput from '@hooks/useInput';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

function LogIn() {
  const { data, error, mutate } = useSWR('/api/users', fetcher, {
    dedupingInterval: 100000,
  });
  const [loginError, setLoginError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoginError(false);

      axios
        .post('/api/users/login', { email, password }, { withCredentials: true })
        .then((response) => {
          mutate();
        })
        .catch((error) => {
          setLoginError(error.response?.data?.statusCode === 401);
        });
    },
    [email, password],
  );

  // 로딩중 처리
  if (data === undefined) {
    return <div>Loading...</div>;
  }

  // 로그인 성공
  if (!error && data) {
    console.log('Login 성공!', data);
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
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              value={password}
              onChange={onChangePassword}></Input>
          </div>
          {loginError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </Container>
  );
}

export default LogIn;
