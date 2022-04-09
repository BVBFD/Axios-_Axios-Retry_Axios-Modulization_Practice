import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/posts/Posts';

const App = ({ axiosService }) => {
  const [xssStatus, SetXssStatus] = useState('');
  useEffect(() => {
    const xssToken = async () => {
      const res = await axiosService.axiosInstance.get('/getXSSToken');
      SetXssStatus(res.data);
    };

    xssToken();
  }, []);

  console.log(xssStatus);

  return (
    <div>
      <Posts axiosService={axiosService} />
    </div>
  );
};

export default App;
