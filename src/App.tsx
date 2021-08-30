import React from 'react';
import { useEffect, useState } from 'react';

function App() {
  const [bla, setBla] = useState<number>(0);
  useEffect(() => {
    console.log(bla);
    setBla(2);
    bla;
  }, []);
  return <div className="bg-red-200">Hello World</div>;
}

export default App;
