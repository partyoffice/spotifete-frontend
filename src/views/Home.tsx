import React, { FC } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';

const Home: FC<any> = (props) => {
  return (
    <div className="h-full w-full flex">
      <div className="m-auto flex flex-row space-x-4">
        <Card title="Join an existing session">
          <Input placeholder="Session ID" />
        </Card>
        <Card title="Create a new session">
          <Input placeholder="New session name" />
        </Card>
      </div>
    </div>
  );
};

export default Home;
