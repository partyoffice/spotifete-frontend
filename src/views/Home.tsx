import React, { FC, useCallback, useContext } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Home: FC<any> = () => {
  const { userState } = useContext(UserContext);
  const navigate = useNavigate();

  const joinSession = useCallback(
    (sessionId: string) => {
      navigate(`/sessions/${sessionId}`);
    },
    [navigate]
  );

  const handleJoinSessionInputKeyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        joinSession(event.target.value);
      }
    },
    [joinSession]
  );

  const createSession = useCallback(() => {}, []);

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col m-auto space-y-5">
        <Card title="Join an existing session">
          <Input placeholder="Session ID" onKeyPress={handleJoinSessionInputKeyPress} />
        </Card>

        {userState.isAuthenticated ? (
          <Card title="Create a new session">
            <Input placeholder="New session name" />
          </Card>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Home;
