import React, { FC, useCallback, useContext } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router';

const Home: FC<any> = () => {
  const { userState } = useContext(UserContext);
  const history = useHistory();

  const joinSession = useCallback(
    (sessionId: string) => {
      history.push(`/sessions/${sessionId}`);
    },
    [history]
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
    <div className="h-full w-full flex">
      <div className="m-auto flex flex-col space-y-5">
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
