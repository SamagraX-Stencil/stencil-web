import React from 'react';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const MsgThumbsUp = (props: any) => (
  <React.Fragment>
    {props.fill ? (
      <ThumbUpAltIcon style={{ color: 'green', fontSize: props.width }} />
    ) : (
      <ThumbUpAltOutlinedIcon style={{ color: 'green', fontSize: props.width }} />
    )}
  </React.Fragment>
);

export default MsgThumbsUp;
