import React, {Component} from 'react';
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

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import "./styles/login.css";
import axios from "axios";



	const styles = {
  paper: {

	marginTop: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
	margin: 1,

	 backgroundColor:  "#d60606"
  },
  form: {
    width: '100%',
	
	marginTop: 3,
  },
  submit: {
	
  },
	}

	export class SignUp extends Component {

		constructor(props) {
			super(props);
		
			this.onSubmit = this.onSubmit.bind(this);
			this.alreadyhaveaccount = this.alreadyhaveaccount.bind(this);
			this.handelChange = this.handelChange.bind(this);
			this.state = {
				firstName : "",
				lastName : "",
				email: "",
				userName: "",
				password: "",
				confirmPassword: "",
				userTypeID: 3,
				isActive: 0,
				isDeleted: 0,
				createdBy: "",
				
			};
			
		}
	
handelChange(e){
	this.setState({
		[e.target.name]: e.target.value,
	})
}
	
	
		
	
		
		alreadyhaveaccount(){
			this.props.history.push("/login");
		}
		onSubmit(e) {
			e.preventDefault();
			console.log("bTN cLICKED BY ME")
			const registration = {
				// authenticationID: 4,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				email: this.state.email,
				userName: this.state.userName,
				password: this.state.password,
				confirmPassword: this.state.confirmPassword,
				userTypeID: 3,
				isActive: 0,
				isDeleted: 0,
				createdBy: "",
			};

			console.log("This is the value"+ registration.email)
	
			//  let valid_data = true;
	
			
			this.setState({
				email_error: null,
			})
			
			this.setState({
				userName_error: null,
			})
			
			this.setState({
				password_error: null,
			})
			
			this.setState({
				confirmPassword_error: null,
			})
	
			if (this.state.email === "") {
				
				this.setState({
					email_error: "Required",
				})
				// valid_data = false;
			}
			
			
	
			if (this.state.password === "") {
			
				this.setState({
					password_error: "Required",
				})
				// valid_data = false;
			}
	
			if (this.state.confirmPassword === "") {
			
				this.setState({
					confirmPassword_error: "Required",
				})
				// valid_data = false;
			}
	
			if (this.state.password !== this.state.confirmPassword) {
				console.log("Password Missmatch, Please correct your password");
				// valid_data = false;
			}
	
			this.setState({
				update: true,
			});
	
			// if (valid_data === true) {
				axios
					.post(process.env.REACT_APP_API + "/authentication/add", registration)
					.then((res) =>{
						this.props.history.push("/login");
						 window.location.reload(false);
					});
				
			// }
	
		}
	




render() {
	const { classes } = this.props;
	
  return (
    <Container className="loginForm" component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
				autoFocus
				onChange={this.handelChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
				autoComplete="lname"
				onChange={this.handelChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
				autoComplete="email"
				onChange={this.handelChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
				autoComplete="current-password"
				onChange={this.handelChange}
              />
            </Grid>
			<Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
				autoComplete="current-password"
				onChange={this.handelChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
			className={classes.submit}
			onClick={this.onSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/user/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    
    </Container>
  );
}
	}
	SignUp.propTypes = {
	classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SignUp);