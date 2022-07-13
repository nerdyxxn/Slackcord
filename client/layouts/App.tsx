import React from 'react';
import { Route, Routes } from 'react-router';
import LogIn from '@pages/Login';
import SignUp from '@pages/SignUp';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;
