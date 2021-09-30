import React from 'react';
import { useSelector } from 'react-redux';
import { List, ListRowProps } from 'react-virtualized';

import { selectChatBlocks } from '../store/slices/chat';
import Trace from './Trace';

interface Props {
  userId: string;
  onButtonClick: (btn: string) => void;
}

const Feed: React.FC<Props> = ({ userId, onButtonClick }) => {
  const blocks = useSelector(selectChatBlocks(userId));

  function renderRow({ index, key, style }: ListRowProps) {
    const trace = blocks[index];
    return (
      <div key={key} style={style}>
        <Trace id={index.toString()} trace={trace} onButtonClick={onButtonClick} />
      </div>
    );
  }

  return (
    <div>
      <List rowCount={blocks.length} rowHeight={22} width={500} height={365} rowRenderer={renderRow} />
    </div>
  );
};

export default Feed;
