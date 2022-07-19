import React from 'react';
import { Route, Routes } from 'react-router';
import loadable from '@loadable/component';
import { Global } from '@emotion/react';
import reset from '@utils/Reset';

const LogIn = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Workspace = loadable(() => import('@layouts/Workspace'));

const App = () => {
  return (
    <>
      <Global styles={reset} />
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/workspace/*" element={<Workspace />} />
      </Routes>
    </>
  );
};

export default App;
