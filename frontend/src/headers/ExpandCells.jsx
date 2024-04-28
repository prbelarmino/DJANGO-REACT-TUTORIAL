import React from 'react';
import { styled } from '@mui/system';

const ExpandedCell = styled('div')({
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
});

const ExpandCellRenderer = ({ value }) => {
  return (
    <ExpandedCell>
      {value}
    </ExpandedCell>
  );
};

export default ExpandCellRenderer;
