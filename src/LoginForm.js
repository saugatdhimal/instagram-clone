import React ,{ useState } from 'react';
import { auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import './LoginForm.css';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  };
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 250,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function LoginForm() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open,setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [email, setEmail] = useState('');


  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));

    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();

    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false);

  }
    return (
        <div className="LoginForm">
     <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className="LoginForm__sign">
        <center>
        <img 
        className="app__headerImage"
        src="https://christhilk.files.wordpress.com/2016/03/instagram-logo.png?w=730"
        alt=""
        />
        </center>
        <Input 
        placeholder="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
        <Input 
        placeholder="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <Input 
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      
        <Button  type="submit" onClick={signUp}>SIGN UP</Button>
        </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className="LoginForm__sign">
        <center>
        <img 
        className="app__headerImage"
        src="https://christhilk.files.wordpress.com/2016/03/instagram-logo.png?w=730"
        alt=""
        />
        </center>
        <Input 
        placeholder="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <Input 
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <Button  type="submit" onClick={signIn}>LOGIN</Button>
        </form>
        </div>
      </Modal>
           <img 
            className="LoginForm__image1"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png"
            alt=""
            />
            <img 
            className="LoginForm__image2"
            src="https://christhilk.files.wordpress.com/2016/03/instagram-logo.png?w=730"
            alt=""
            />
            <div className="LoginForm__button">
            <Button size="large" variant="contained" color="primary"  onClick={() => setOpenSignIn(true)}>LOGIN</Button>
            </div>
            <div className="LoginForm__button">
            <Button size="large" variant="contained" color="secondary" onClick={() => setOpen(true)}>SIGN UP</Button>
            </div>
        </div>
    )
}

export default LoginForm
