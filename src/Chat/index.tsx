import './index.css';

import { SpeakTrace } from '@voiceflow/general-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { addUser, inputById } from '../store/actions';
import { selectChatBlocks, selectInput, selectUsers } from '../store/selectors';
import { chatInteract, chatInteractButton, playAudio, startChat, stopPlayer } from '../store/thunks/chat';
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

    return () => {
      dispatch(stopPlayer());
    };
  }, []);

  function handleButtonClick(btn: string) {
    dispatch(chatInteractButton(userID, btn));
  }

  function handleSpeak(block: SpeakTrace) {
    dispatch(playAudio(userID, block));
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
      <Link to="/dashboard">← to list</Link>
      <h1>{capitalize(userID)} Chat</h1>
      <Feed userId={userID} onButtonClick={handleButtonClick} onSpeakClick={handleSpeak} />

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
