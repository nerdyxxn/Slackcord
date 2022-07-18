import React, { FC, useCallback } from 'react';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Workspace: FC = ({ children }) => {
  const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher);
  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, { withCredentials: true })
      .then((response) => {
        mutate();
      })
      .catch();
  }, []);

  // 로그아웃 성공
  if (!data) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <button onClick={onLogout}>Logout</button>
      {children}
    </div>
  );
};

export default Workspace;
