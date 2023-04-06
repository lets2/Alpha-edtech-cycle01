import {
  ChatRoom,
  CreateGame,
  Error404,
  Feed,
  Home,
  MyGames,
  Publication,
  Register,
} from '@pages';
import { useUser } from '@providers';
import { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

interface ChildrenTypes {
  children: ReactElement;
}

const Private = ({ children }: ChildrenTypes) => {
  const { token } = useUser();
  if (!token) {
    return <Navigate to={'/home'} />;
  }
  return children;
};

const Public = ({ children }: ChildrenTypes) => {
  const { token } = useUser();
  if (token) {
    return <Navigate to={'/feed'} />;
  }
  return children;
};

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route
        path="/home"
        element={
          <Public>
            <Home />
          </Public>
        }
      />

      <Route
        path="/register"
        element={
          <Public>
            <Register />
          </Public>
        }
      />

      <Route
        path="/feed"
        element={
          <Private>
            <Feed />
          </Private>
        }
      />

      <Route
        path="/create-game"
        element={
          <Private>
            <CreateGame />
          </Private>
        }
      />
      <Route
        path="/chat-room/:id"
        element={
          <Private>
            <ChatRoom />
          </Private>
        }
      />
      <Route
        path="/publication/:id"
        element={
          <Private>
            <Publication />
          </Private>
        }
      />
      <Route
        path="/my-games"
        element={
          <Private>
            <MyGames />
          </Private>
        }
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};
