import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {login, logout, selectUser} from "./features/userSlice";
import {auth} from './firebase';
import './App.css';
import Header from "./Header"
import Sidebar from './Sidebar';
import Feed from "./Feed";
import Login from './Login';
import Widgets from './Widgets';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // user is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        // user is logged out
        dispatch(logout());
      }
    }) 
  }, [])

  return (
    <div className="app">
      {/* Header */}
      <Header />

      {!user ? (
        <Login />
      ) : (
        <div className='app_body'>
          <Sidebar /> 
          <Feed />
          <Widgets />
        </div>
      )}
    </div>
  );
}

export default App;
