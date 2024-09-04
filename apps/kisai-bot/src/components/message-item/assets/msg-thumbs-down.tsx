import React from 'react';

import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

const MsgThumbsDown = (props: any) => (
  <React.Fragment>
    {props.fill ? (
      <ThumbDownAltIcon style={{ color: 'red', fontSize: props.width }} />
    ) : (
      <ThumbDownAltOutlinedIcon style={{ color: 'red', fontSize: props.width }} />
    )}
  </React.Fragment>
);

export default MsgThumbsDown;
