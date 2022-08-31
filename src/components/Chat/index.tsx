import React, { RefObject, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import './Chat.css';
import Send from './send.svg';
import { conversationActions, useAppSelector } from '../../redux';
import { IMessage, IUser } from '../../interfaces';
import Loader from '../layouts/Loader';
import getInitials from '../../utils/getInitials';
import formatTime from '../../utils/formatTime';

const RenderMessage = ({
  message,
  user,
  mref,
}: {
  message: IMessage;
  user: IUser;
  mref: RefObject<HTMLDivElement>;
}) => (
  <div
    className={`message-container ${message.sender === user._id ? 'sent' : ''}`}
    ref={mref}
  >
    <p className="message">{message.text}</p>
    <p className="time">{formatTime(message.updatedAt || '')}</p>
  </div>
);

const Chat = () => {
  const { loading, conversation, messages } = useAppSelector(
    state => state.chat
  );
  const { user } = useAppSelector(state => state.auth);

  const [friend, setFriend] = useState<IUser>();
  const [inputText, setInputText] = useState<string>('');
  const [arrivalMessage, setArrivalMessage] = useState<IMessage | null>();
  // const [onlineUsers, setOnlineUsers] = useState([]);

  const socket = useRef<Socket>();

  useEffect(() => {
    socket.current = io('ws://localhost:8000');
    socket.current.on('welcome', res => console.log(res));
    socket.current.on(
      'getMessage',
      ({ senderId, text }: { senderId: string; text: string }) => {
        setArrivalMessage({
          sender: senderId,
          text: text,
          updatedAt: new Date(Date.now()).toISOString(),
          _id: Date.now().toString(),
        });
      }
    );
  }, []);

  // error here expec: [id,id] presect: [{id}, {id}]
  useEffect(() => {
    if (!arrivalMessage) return;
    console.log('mes', arrivalMessage);
    console.log('con', conversation);

    const f = async () => {
      if (
        !conversation?.members
          .map((user: IUser) => user._id)
          .includes(arrivalMessage.sender)
      )
        return;

      await conversationActions.recieveMessage(arrivalMessage);

      setArrivalMessage(null);
    };

    f();
  }, [arrivalMessage, conversation]);

  useEffect(() => {
    socket.current?.emit('addUser', user._id);
    // socket.current?.on(
    //   'getUsers',
    //   (users: { userId: string; socketId: string }[]) => {
    //     setOnlineUsers(
    //       user.followings.filter(f => users.some(u => u.userId === f))
    //     );
    //   }
    // );
  }, [user]);

  useEffect(() => {
    setFriend(
      conversation?.members.find((member: IUser) => member._id !== user?._id)
    );
  }, [conversation, user]);

  useEffect(() => {
    if (!conversation) return;

    conversationActions.getMessages(conversation._id);
  }, [conversation]);

  // const messageDiv = useRef() as RefObject<HTMLDivElement>;
  const messageComponent = useRef() as RefObject<HTMLDivElement>;

  // useEffect(() => {
  //   if (!messageDiv.current) return;
  //   messageDiv.current.scrollTop = messageDiv.current.scrollHeight;
  // }, [messages]);

  useEffect(() => {
    if (!messageComponent.current) return;

    messageComponent.current.scrollIntoView({ behavior: 'smooth' });
  });

  const handleMessageSend = () => {
    if (inputText === '') return;

    const receiver = conversation.members.find(
      (member: IUser) => member._id !== user._id
    );

    socket.current?.emit('sendMessage', {
      text: inputText,
      receiverId: receiver._id,
      senderId: user._id,
    });

    conversationActions.sendMessage({
      text: inputText,
      conversationId: conversation._id,
      sender: user._id,
    });

    setInputText('');
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {conversation ? (
            <section className="chat-container">
              <header className="chat-header">
                <div className="chat-header-logo">
                  <p>{getInitials(friend?.name || '')}</p>
                </div>
                <div className="chat-header-about">
                  <p className="chat-header-name">{friend?.name}</p>
                  <p className="chat-header-email">{friend?.email}</p>
                </div>
              </header>
              <div className="chat-content">
                <div className="chat-messages" style={{ position: 'relative' }}>
                  <div
                    className="chat-messages-inner"
                    // ref={messageDiv}
                    style={{
                      position: 'absolute',
                      bottom: '1%',
                      width: '100%',
                    }}
                  >
                    {messages?.map(
                      (message: IMessage) => (
                        <RenderMessage
                          message={message}
                          user={user}
                          mref={messageComponent}
                          key={message._id}
                        />
                      )
                      // RenderMessage(message, user)
                    )}
                  </div>
                </div>
                <div className="chat-input">
                  <div className="chat-input-logo">
                    <p>{getInitials(user?.name)}</p>
                  </div>
                  <input
                    type="text"
                    className="message-input"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleMessageSend()}
                  />
                  <div
                    className="chat-input-logo send"
                    onClick={handleMessageSend}
                  >
                    <img src={Send} alt="send" />
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section
              className="chat-container"
              style={{ position: 'relative' }}
            >
              <h2
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: '10%',
                  cursor: 'default',
                }}
              >
                Select a Chat to start conversing!
              </h2>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default Chat;
