import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Auth from "./auth";
import Notification from "../../components/popup/notification.js"
import "./styles/login.css";
import axios from "axios";

 

	// const styles = {
	// 	paper: {
		 
	// 	  marginTop: 4,
	// 	  display: 'flex',
	// 	  flexDirection: 'column',
	// 	  alignItems: 'center',
	// 	},
	// 	avatar: {
	// 	  margin: 1,
		  
	// 	   backgroundColor:  "#d60606"
	// 	},
	// 	form: {
	// 	  width: '100%', 
		   
	// 	  marginTop: 3,
	// 	},
		

		
	// 	submit: {
		 
	// 	},

	// 	  }
	




	 var userInfo = JSON.parse(localStorage.getItem("UserData"));
	class Login extends Component {


constructor(props) {
	super(props);
	

	this.state = {
		email: "",
		password: "",
		error: "",
		emailError: "",
		passwordError: "",
		show_progress: false,
		isOpen : false,
		message : "",
		type : "success",
	    login_error : false,
	}

	this.handelChange = this.handelChange.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
	this.signupPage = this.signupPage.bind(this);
	this.closeNotification = this.closeNotification.bind(this);
}
closeNotification = ()=>{
	this.setState({
	  isOpen : false,
	})
  }


validate = () => {
	let emailError = "";
	let passwordError = "";
	if (!this.state.email.includes("@")) {
		emailError = "Invalid Email";
	}
	if (!this.state.password) {
		passwordError = "Password cannot be empty";
	}
	if (emailError || passwordError) {
		this.setState({ emailError, passwordError });
		return false;
	}
	return true;
};

handelChange = (e) => {
	this.setState({
		[e.target.name]: e.target.value,
	});
};
signupPage() {
	this.props.history.push("/signup");
}


async onSubmit(e) {
	e.preventDefault();





	const { email, password } = this.state;

	try {
		
	

			await axios
				.post(process.env.REACT_APP_API + "/authentication/admin-login", { email, password })
				.then((res) => {
					if (res.data) {
						this.setState({
							isOpen : true,
							message : "Successfully logged in",
							type : "success",
							
						})


						localStorage.setItem("UserData", JSON.stringify(res.data));
						// localStorage.setItem("token", JSON.stringify(res.data.UserID));
						
					

						Auth.isAuthenticated = true;
				
						window.location.assign('http://localhost:3001/admin/dashboard');
						 window.location.reload(false);
					}
					// else{
					// 	this.setState({
					// 		login_error : true
					// 	})
					// }
				});
	
	
	} catch (err) {
		this.setState({
			error: err.message,
			login_error : true
		});
	}
}


render() {

	if (userInfo !== null) {
		window.location.assign('http://localhost:3000/admin/dashboard');

	
				
						 window.location.reload(false);
		
	}

  return (
    <Container className="loginForm" component="main" maxWidth="xs">
      <CssBaseline />
	  {/* className={classes.paper} */}
      <div style={{  marginTop: 4,
		  display: 'flex',
		  flexDirection: 'column',
		  alignItems: 'center',}}  >
	  {/* className={classes.avatar} */}
	  <a href="https://karukaj.com.bd">
	  <Avatar  style={{ margin: 1,
		  
		  backgroundColor:  "green"}} >
          <LockOutlinedIcon />
        </Avatar>
	  </a>
       
        <Typography  component="h1" variant="h5">
          Sign in
        </Typography>
		{/* className={classes.form} */}
        <form  noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
			autoFocus
			onChange={this.handelChange}
			error = {this.state.login_error}
			helperText={(this.state.login_error === true ? "Incorrect Email or Password":"")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
			autoComplete="current-password"
			onChange={this.handelChange}
			error = {this.state.login_error}
			helperText={(this.state.login_error === true ? "Incorrect Email or Password":"")}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
		  style= {{backgroundColor : "green", color: "white"}}
            type="submit"
            fullWidth
            variant="contained"
            // color="primary"
			// className={classes.submit}
			onClick={this.onSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/signupPage" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              {/* <Link href="/user/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link> */}
            </Grid>
          </Grid>
        </form>
      </div>

   
	  <Notification closeNotifi={this.closeNotification}  isOpen={this.state.isOpen} message={this.state.message} type={this.state.type} />
    </Container>
	
  );
}
}

// Login.propTypes = {
// 	classes: PropTypes.object.isRequired,
//   };
// withStyles(styles)
  export default (Login);

  