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
import { Link } from 'react-router-dom';
import useInput from '@hooks/useInput';
import useSWR from 'swr';

function LogIn() {
  const {} = useSWR('http://localhost:3095/api/users');
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
          console.log(response.data);
        })
        .catch((error) => {
          setLoginError(error.response?.data?.statusCode === 401);
        });
    },
    [email, password],
  );

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
