import React, { FC, useEffect } from 'react';
import useAuthentication from '../hooks/useAuthentication';

const Error404: FC<any> = (props) => {
  const { authenticate } = useAuthentication();

  useEffect(() => {
    authenticate(() => {
      window.close();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* This is the page the user gets redirected to after loggin in on the spotify page. 
		It triggers the authentication at the Spotifete-Backend, gets the user details and closes the page. */}
    </div>
  );
};

export default Error404;
