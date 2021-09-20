import React, { FC, useContext } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import UserContext from '../context/UserContext';

const Home: FC<any> = (props) => {
  const { userState } = useContext(UserContext);

  return (
    <div className="h-full w-full flex">
      <div className="m-auto flex flex-row space-x-4">
        <Card title="Join an existing session">
          <Input placeholder="Session ID" />
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
