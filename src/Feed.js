import React, { useState, useEffect } from 'react';
import './Feed.css';
import ImageIcon from '@mui/icons-material/Image';
import CreateIcon from "@mui/icons-material/Create";
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import EventNoteIcon from '@mui/icons-material/EventNote';
import InputOption from './inputOption';
import Post from './Post';
import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import {motion, AnimatePresence} from "framer-motion";

const MotionPost = motion(Post);

function Feed() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState([]);

  const postsQuery = query(
    collection(db, 'posts'),
    orderBy('timestamp', 'desc') // 👈 Order by latest post
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(postsQuery, snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    });

    return () => unsubscribe();
  }, []); // 👈 Only runs once on mount

  const sendPost = e => {
    e.preventDefault();

    addDoc(collection(db, 'posts'), {
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || "",
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className='feed'>
      <div className="feed_inputContainer">
        <div className='feed_input'>
          <CreateIcon />
          <form>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              type="text"
            />
            <button onClick={sendPost} type="submit">Send</button>
          </form>
        </div>
        <div className='feed_inputOptions'>
          <InputOption Icon={ImageIcon} title="Photo" color="#7085F9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBD" />
          <InputOption Icon={CalendarViewDayIcon} title="Write article" color="#7FC15E" />
        </div>
      </div>

      {/* Posts */}
      <AnimatePresence>
    {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
        <MotionPost
            key={id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            name={name}
            description={description}
            message={message}
            photoUrl={photoUrl}
        />
    ))}
    </AnimatePresence>

    </div>
  );
}

export default Feed;
