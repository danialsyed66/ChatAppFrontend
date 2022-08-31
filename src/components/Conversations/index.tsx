import React, { useEffect } from 'react';
import Conversation from '../Conversation';

import './Conversations.css';
import Archives from './archives.svg';
import { conversationActions, useAppSelector } from '../../redux';
import Loader from '../layouts/Loader';
import { IConversation, IUser } from '../../interfaces';

const Conversations = () => {
  useEffect(() => {
    conversationActions.getConversations();
  }, []);

  const { loading, conversations, friends } = useAppSelector(
    state => state.chat
  );

  return (
    <aside className="conversations-container">
      <header className="conversations-header">
        <div className="conversations-title-container">
          <h2 className="conversations-title">Conversations</h2>
          <div className="conversations-count">
            <p>{conversations?.length || 0}</p>
          </div>
        </div>
        <div className="conversations-archives-container">
          <div className="conversations-archives-icon">
            <img src={Archives} alt="Alert Logo" />
          </div>
          <p className="conversations-archives-title">Archives</p>
        </div>
      </header>
      {loading ? (
        <Loader />
      ) : (
        conversations?.map((conversation: IConversation) => (
          <Conversation item={conversation} key={conversation._id} />
        ))
      )}
      {!loading && friends?.length > 0 && (
        <>
          <hr />
          <div className="conversations-title-container">
            <div className="conversations-title-container">
              <h2 className="conversations-title">Friends</h2>
              <div className="conversations-count">
                <p>{friends?.length || 0}</p>
              </div>
            </div>
          </div>
          {friends?.map((friend: IUser) => (
            <Conversation frd={friend} key={friend._id} />
          ))}
        </>
      )}
    </aside>
  );
};

export default Conversations;
