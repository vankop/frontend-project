import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { List, ListRowProps } from 'react-virtualized';

import { selectChatBlocks } from '../store/selectors';
import Trace from './Trace';

interface Props {
  userId: string;
  onButtonClick: (btn: string) => void;
}

const Feed: React.FC<Props> = ({ userId, onButtonClick }) => {
  const blocks = useSelector(selectChatBlocks(userId));
  const ref = React.createRef<List>();

  useLayoutEffect(() => {
    const list = ref.current;
    if (list) {
      list.scrollToRow(blocks.length - 1);
    }
  }, [blocks]);

  function renderRow({ index, key, style }: ListRowProps) {
    const trace = blocks[index];
    return (
      <div key={key} style={style}>
        <Trace trace={trace} onButtonClick={onButtonClick} />
      </div>
    );
  }

  return (
    <div>
      <List ref={ref} rowCount={blocks.length} rowHeight={22} width={500} height={330} rowRenderer={renderRow} />
    </div>
  );
};

export default Feed;
