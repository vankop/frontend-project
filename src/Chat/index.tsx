import './index.css';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { addUser, inputById } from '../store/actions';
import { selectChatBlocks, selectUsers } from '../store/selectors';
import { selectInput } from '../store/slices/chat';
import { chatInteract, chatInteractButton, startChat } from '../store/thunks/chat';
import { capitalize } from '../utils';
import Feed from './Feed';

// eslint-disable-next-line xss/no-mixed-html
const Chat: React.FC = () => {
  const { userID } = useParams() as { userID: string };
  const blocks = useSelector(selectChatBlocks(userID));
  const inputStr = useSelector(selectInput(userID));
  const users = useSelector(selectUsers);
  const input = inputById(userID);
  const dispatch = useDispatch();

  useEffect(() => {
    if (blocks.length === 0) dispatch(startChat(userID));
    if (!users.includes(userID)) dispatch(addUser(userID));
  }, []);

  function handleButtonClick(btn: string) {
    dispatch(chatInteractButton(userID, btn));
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(input(event.target.value));
  }

  function send() {
    dispatch(input(''));
    dispatch(chatInteract(userID, inputStr));
  }

  return (
    <div className="chat">
      <h1>{capitalize(userID)} Chat</h1>
      <Feed userId={userID} onButtonClick={handleButtonClick} />

      <div className="input">
        <input className="input_input" placeholder="user input here" value={inputStr} onInput={handleChange} />
        <button className="input_submit" onClick={send}>
          send
        </button>
      </div>
    </div>
  );
};

export default Chat;
