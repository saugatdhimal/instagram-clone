import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import { Button } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import LoginForm from './LoginForm';

function App() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        setUser(authUser);
      }else{
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, []);

  if(!user) return <LoginForm />

  return (
    <div className="app">
      <div className="app__header">
        <img 
        className="app__headerImage"
        src="https://christhilk.files.wordpress.com/2016/03/instagram-logo.png?w=730"
        alt=""
        />
        <Button onClick={() => auth.signOut()}>Logout</Button>
        {/* {user? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ): (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )} */}

      </div>
      
      <div className="app__posts" > 
      {
        posts.map(({id,post}) => (
          <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }

      {/* <div className="app__postsRight">
      <InstagramEmbed
         url='https://www.instagram.com/p/CLuHdmRA0aL'
         clientAccessToken='936619743392459|3cdb3f896252a1db29679cb4554db266'
         maxWidth={320}
         hideCaption={false}
         containerTagName='div'
         protocol=''
         injectScript
         onLoading={() => {}}
         onSuccess={() => {}}
         onAfterRender={() => {}}
         onFailure={() => {}}
      />
      </div> */}
      </div>

        <ImageUpload username={user.displayName} />
      
    </div>
  );
}

export default App;
