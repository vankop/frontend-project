import './index.css';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { List, ListRowProps } from 'react-virtualized';

import { selectChatBlocks } from '../store/selectors';
import { chatInteractButton, startChat } from '../store/thunks/chat';
import { capitalize } from '../utils';
import Trace from './Trace';

const Chat: React.FC = () => {
  const { userID } = useParams() as { userID: string };
  const blocks = useSelector(selectChatBlocks(userID));
  const dispatch = useDispatch();

  useEffect(() => {
    if (blocks.length === 0) dispatch(startChat(userID));
  }, []);

  function handleButtonClick(btn: string) {
    dispatch(chatInteractButton(userID, btn));
  }

  function renderRow({ index, key, style }: ListRowProps) {
    const trace = blocks[index];
    return (
      <div key={key} style={style}>
        <Trace id={index.toString()} trace={trace} onButtonClick={handleButtonClick} />
      </div>
    );
  }

  return (
    <div className="chat">
      <h1>{capitalize(userID)} Chat</h1>
      <div>
        <List rowCount={blocks.length} rowHeight={22} width={500} height={365} rowRenderer={renderRow} />
      </div>

      {/* <dl> */}
      {/*  <dt>Can I order some pizza</dt> */}
      {/*  <dd>Sure what kind of pizza do you want?</dd> */}

      {/*  <dt>Pepperoni and Cheese</dt> */}
      {/*  <dd>Great, pepperoni and cheese coming up!</dd> */}
      {/* </dl> */}

      <div className="input">
        <input className="input_input" placeholder="user input here" />
        <button className="input_submit">send</button>
      </div>
    </div>
  );
};

export default Chat;
