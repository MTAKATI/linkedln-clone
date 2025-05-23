import React, {forwardRef} from 'react';
import './Post.css';
import { Avatar } from '@mui/material';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined'; // If you meant "dislike"
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InputOption from './inputOption';

const Post = forwardRef(({name, description, message, photoUrl}, ref) => {
  return (
    <div ref={ref} className='post'>
      <Avatar src={photoUrl}>{name?.[0]}</Avatar>
      <div className='post_info'>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>

      <div className='post_body'>
        <p>{message}</p>
      </div>

      <div className='post_buttons'>
        <InputOption Icon={ThumbDownAltOutlinedIcon} title="Like" color="gray"/>
        <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray"/>
        <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray"/>
        <InputOption Icon={SendOutlinedIcon} title="Send" color="gray"/>
      </div>
    </div>
  );
})

export default Post
