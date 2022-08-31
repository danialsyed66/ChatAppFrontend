import React, { useEffect, useState } from 'react';

import { IConversation, IUser } from '../../interfaces';
import { conversationActions, useAppSelector } from '../../redux';
import formatTime from '../../utils/formatTime';

import './Conversation.css';

interface PropType {
  item?: IConversation;
  frd?: IUser;
}

const Conversation = ({ item, frd }: PropType) => {
  const { user } = useAppSelector(state => state.auth);
  const { conversation } = useAppSelector(state => state.chat);

  const [friend, setFriend] = useState<IUser | undefined>(frd);
  // const [first, setFirst] = useState<boolean>(true);

  useEffect(() => {
    if (item)
      setFriend(item?.members?.find(member => member._id !== user?._id));
  }, [item, user]);

  useEffect(() => {
    // conversationActions.getConversations();
  }, [conversation?._id]);

  return (
    <div
      className="conversation-container"
      onClick={() => {
        conversationActions.createOrGetConversation(
          friend?._id || '',
          frd ? true : false
        );
      }}
    >
      <div className="conversation-name-container">
        <div className="conversation-name-icon">
          <p>{friend?.name[0].toUpperCase()}</p>
        </div>
        <p className="conversation-name">{friend?.name}</p>
      </div>
      <p className="conversation-time">{formatTime(item?.updatedAt || '')}</p>
    </div>
  );
};

export default Conversation;
