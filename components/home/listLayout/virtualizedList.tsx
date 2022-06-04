import React from 'react';
import { areEqual, FixedSizeList as List } from 'react-window';
//@ts-ignore
import { ReactWindowScroller } from 'react-window-scroller';
import { MediaList } from '../../../apollo/queries/mediaQuery';
import ListEntry from './listEntry';

const Row: React.FC<{
  data: (MediaList | JSX.Element)[];
  index: number;
  style: React.CSSProperties;
}> = React.memo(({ data, index, style }) => {
  const item = data[index];
  const topRadius = index === 0 || React.isValidElement(data[index - 1]);
  const bottomRadius =
    index === data.length - 1 || React.isValidElement(data[index + 1]);

  return (
    <div style={style}>
      {React.isValidElement(item) ? (
        item
      ) : (
        <ListEntry
          {...(item as MediaList)}
          topRadius={topRadius}
          bottomRadius={bottomRadius}
        />
      )}
    </div>
  );
}, areEqual);

const VirtualizedList: React.FC<{
  current?: MediaList[];
  waiting?: MediaList[];
  statusTitle: JSX.Element;
}> = ({ current, waiting, statusTitle }) => {
  const itemData: (MediaList | JSX.Element)[] = [
    ...(current ?? []),
    ...(waiting && current ? [statusTitle] : []),
    ...(waiting ?? [])
  ];

  return (
    <ReactWindowScroller>
      {({ ref, outerRef, style, onScroll }: any) => (
        <List
          ref={ref}
          outerRef={outerRef}
          style={style}
          height={window.innerHeight}
          itemCount={itemData.length}
          itemSize={55}
          width={0}
          itemData={itemData}
          onScroll={onScroll}
        >
          {Row}
        </List>
      )}
    </ReactWindowScroller>
  );
};

export default VirtualizedList;