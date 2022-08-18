import React from 'react';
import { Route, Routes } from 'react-router';
import loadable from '@loadable/component';
import { Global } from '@emotion/react';
import Reset from '@styles/Reset';
import './App.css';

const LogIn = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Workspace = loadable(() => import('@pages/Workspace'));

const App = () => {
  return (
    <>
      <Global styles={Reset} />
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/workspace/:workspace/*" element={<Workspace />} />
      </Routes>
    </>
  );
};

export default App;
