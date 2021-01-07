import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import "./styles/login.css";
import Notification from "../../components/popup/notification.js"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [key, setKey] = useState("");
  const [isOpen, setisOpen] = useState("");
  const [message, setmessage] = useState("");
  const [type, settype] = useState("success");
  const [login_error, setlogin_error] = useState(false);

//  const  handelChange = (e)=>{
//   setKey(e)
//   console.log("Key is "+ key)
//  }
  
const closeNotification = ()=>{
	// this.setState({
	//   isOpen : false,
  // })
  setisOpen(false)
  }

 const onSubmit =(e)=> {
	e.preventDefault();





  // const { email, password } = this.state;
  if(key === "a1a2a3"){

    localStorage.setItem("token", JSON.stringify("a1a2a3"));
    console.log("Tocken is "+ JSON.parse(localStorage.getItem("token")))
    window.location.assign('http://localhost:3001/admin/login');
               window.location.reload(false);
    setisOpen(true)
    setmessage("Successfully Entered the Key")
    settype("success")
  }
  else{

    setlogin_error(true)

  }

	// try {
		
	

	// 		await axios
	// 			.post(process.env.REACT_APP_API + "/authentication/login", { email, password })
	// 			.then((res) => {
	// 				if (res.data) {

	// 					// this.setState({
	// 					// 	isOpen : true,
	// 					// 	message : "Successfully logged in",
	// 					// 	type : "success",
							
	// 					// })


	// 					// localStorage.setItem("UserData", JSON.stringify(res.data));
	// 					localStorage.setItem("token", JSON.stringify(res.data.UserID));
						
					

	// 					Auth.isAuthenticated = true;
				
	// 					window.location.assign('http://localhost:4001/admin/dashboard');
	// 					 window.location.reload(false);
	// 				}
				
	// 			});
	
	
	// } catch (err) {
	// 	this.setState({
	// 		error: err.message,
	// 		login_error : true
	// 	});
  // }
  


}



  return (
    <Container className="loginForm" component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Verify
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="key"
            label="your secrate key"
            name="key"
            autoComplete="key"
             value={key}
            autoFocus
             onChange={event => setKey(event.target.value)}
             error = {login_error}
		      	helperText={(login_error === true ? "Incorrect Secrate Key":"")}
          />
         
          <Button
            style= {{backgroundColor : "green"}}
            type="submit"
            fullWidth
            variant="contained"
            // color="primary"
            className={classes.submit}
            onClick= {onSubmit}
          >
            Submit
          </Button>

         


        </form>
      </div>
      <Notification closeNotifi={closeNotification}  isOpen={isOpen} message={message} type={type} />
    </Container>
  );
}
