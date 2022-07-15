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
import useInput from '@hooks/useInput';
import axios from 'axios';

function SignUp() {
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

  return (
    <Container>
      <Header>Sleckcord</Header>
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
        <a href="/login">로그인 하러 가기</a>
      </LinkContainer>
    </Container>
  );
}

export default SignUp;
