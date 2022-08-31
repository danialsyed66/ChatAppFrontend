import React from 'react';
import { Chat, Conversations, Header } from '../../components';

import './Home.css';

const Home = () => {
  return (
    <>
      <Header />

      <article className="home-container">
        <Conversations />
        <Chat />
      </article>
    </>
  );
};

export default Home;
