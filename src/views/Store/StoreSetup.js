import React, { Component } from "react";
// @material-ui/core components

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { CardActionArea, CardMedia, TextField } from "@material-ui/core";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Notification from "../../components/popup/notification.js"
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import Tooltip from '@material-ui/core/Tooltip';
import axios from "axios";




const styles = {
  cardCategoryWhite: {
    // color: "#000000", //"rgba(255,255,255,.62)",
    color: "#FFFFFF",
    margin: "0",
    fontSize: "16px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    // color: "#000000",
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "600",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};


var userInfo = JSON.parse(localStorage.getItem("UserData"));

  export class StoreSetup extends Component {

    constructor(props) {
		super(props);

		this.state = {
      updateID : (this.props.editStoreID === undefined?"":this.props.editStoreID),
			_id: "",
			userid: "",
			storeName: "",
			storeShortName: "",
			stAddress: "",
			stLocation: "",
			stZipCode: "",
			localPickup: false,
			regionalPickup: false,
			shiminPrice: 0,
			shimaxPrice: 0,
			storeDetails: "",
			privacyPolicy: "",
			stPhone: "",
			stEmail: "",
			website: "",
			fblink: "",
			youtube: "",
			stLogo: null,
            uploadedFile: null,
            CountryList: [],
            country : null,
            state : "",
            city:"",
            otherLinks:"",
            
	storeName_error : false,
	storeAddress_error : null,
storeEmail_error : null,
  storePhone_error : null,
 aboutStore_error : null,
  //----------------
  isOpen : false,
  message: "", 
    type : "",

		};
		this.changeHandaler = this.changeHandaler.bind(this);
		// this.submitStore = this.submitStore.bind(this);
		this.logoChangeHandaler = this.logoChangeHandaler.bind(this);
		this.checkboxHandaler = this.checkboxHandaler.bind(this);
	
        this.fetchStoreDetails = this.fetchStoreDetails.bind(this);

        this.getCountries = this.getCountries.bind(this);
        this.closeNotification = this.closeNotification.bind(this)
	}

  closeNotification = ()=>{
    this.setState({
      isOpen : false,
    })
  }


	changeHandaler(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	checkboxHandaler(event) {
		this.setState({
			[event.target.name]: event.target.checked,
		});
	}

	logoChangeHandaler(event) {
		this.setState({
			stLogo: event.target.files[0],
			uploadedFile: URL.createObjectURL(event.target.files[0]),
		});
    }
    
    getCountries = (e) => {
		axios
			.get(process.env.REACT_APP_API+"/location/countries")

			.then((res) => {
				var CounList = res.data;
				
				this.setState({
					CountryList: CounList.map((CatList) => CatList), 
				
					//  country: this.props.editData.CatName,
				});
			
			})
			.catch((err) => console.log(err));
    };
    


	fetchStoreDetails = () => {

    // if(this.props.editStoreID === undefined){
    //   this.setState({
    //     updateID : userInfo.UserID
    //   })
    // }
    // else {
    //   this.setState({
    //     updateID : this.props.editStoreID
    //   })
    // }
    
    console.log("Fatch button called"+this.props.editStoreID )
		axios
			.get(process.env.REACT_APP_API+"/store/" + (this.state.updateID === ""? userInfo.UserID:this.state.updateID))  //userInfo.UserID)  //userInfo.UserID)
            // .get("http://process.env.REACT_APP_API:5005/store/5f06f15be4fd1611bcdbbb10")
			.then((res) => {
				//localStorage.setItem("storeID", JSON.stringify(res.data._id));
				console.log("User ID is " + res.data.userid);
				this.setState({
					_id: res.data._id,
					userid: res.data.userid,
					storeName: (res.data.store.storeName === undefined?" ":res.data.store.storeName),
					storeShortName: res.data.store.storeShortName=== undefined?" ":res.data.store.storeShortName,
					stAddress: res.data.store.stAddress=== undefined?" ":res.data.store.stAddress,
					stLocation: res.data.store.stLocation=== undefined?" ":res.data.store.stLocation,
					stZipCode: res.data.store.stZipCode=== undefined?"":res.data.store.stZipCode,
					localPickup: res.data.store.localPickup=== undefined?false:res.data.store.localPickup,
					regionalPickup: res.data.store.regionalPickup=== undefined?false:res.data.store.regionalPickup,
					shiminPrice: res.data.store.shiminPrice=== undefined? 0:res.data.store.shiminPrice,
					shimaxPrice: res.data.store.shimaxPrice=== undefined?0:res.data.store.shimaxPrice,
					storeDetails: res.data.store.storeDetails=== undefined?"":res.data.store.storeDetails,
					privacyPolicy: res.data.store.privacyPolicy=== undefined?"":res.data.store.privacyPolicy,
					stPhone: res.data.store.stPhone=== undefined?"":res.data.store.stPhone,
					stEmail: res.data.store.stEmail=== undefined?"":res.data.store.stEmail,
					website: res.data.store.website=== undefined?"":res.data.store.website,
					fblink: res.data.store.fblink=== undefined?"":res.data.store.fblink,
					youtube: res.data.store.youtube=== undefined?"":res.data.store.youtube,
                    stLogo: res.data.store.stLogo=== undefined?"":res.data.store.stLogo,
                    city : res.data.store.city=== undefined?"":res.data.store.city,
                    state : res.data.store.state=== undefined?"":res.data.store.state,
                    otherLinks : res.data.store.otherLinks=== undefined?"":res.data.store.otherLinks,
			       // country: res.data.store.country,
                     country: res.data.store.country=== undefined? null :res.data.store.country,

				});
				var imagestr = this.state.stLogo;
				imagestr = imagestr.replace("public", "");
				this.setState({ uploadedFile: process.env.REACT_APP_API + imagestr });
				//this.logoChangeHandaler();
			})
			.catch((err) => console.log(err));
	};

	// submitStore = (e) => {
	// 	const formData = new FormData();

	// 	formData.append("userid", userInfo.UserID);
	// 	formData.append("storeName", this.state.storeName);
	// 	formData.append("storeShortName", this.state.storeShortName);
	// 	formData.append("stAddress", this.state.stAddress);
	// 	formData.append("stLocation", this.state.stLocation);
	// 	formData.append("stZipCode", this.state.stZipCode);
	// 	formData.append("localPickup", this.state.localPickup);
	// 	formData.append("regionalPickup", this.state.regionalPickup);
	// 	formData.append("shiminPrice", this.state.shiminPrice);
	// 	formData.append("shimaxPrice", this.state.shimaxPrice);
	// 	formData.append("storeDetails", this.state.storeDetails);
	// 	formData.append("privacyPolicy", this.state.privacyPolicy);
	// 	formData.append("stPhone", this.state.stPhone);
	// 	formData.append("stEmail", this.state.stEmail);
	// 	formData.append("website", this.state.website);
	// 	formData.append("fblink", this.state.fblink);
	// 	formData.append("youtube", this.state.youtube);
	// 	formData.append("stLogo", this.state.stLogo);

	// 	axios
	// 		.post(process.env.REACT_APP_API+"/store/add", formData, {
	// 			headers: {
	// 				"Content-Type": "multipart/form-data",
	// 			},
	// 		})
	// 		.then((res) => {
	// 			this.resetForm();
	// 			this.setState({
	// 				msg: res.data.message,
	// 			});
	// 		})
	// 		.catch((err) => console.log(err));
  // };
  


	UpdateProfileHandler = (e) => {
		e.preventDefault();
     
     console.log("Button clieked with updated data--2"+ this.props.editStoreID)
		const formData = new FormData();

		formData.append("userid", this.state.userid) //this.state.userid);
		formData.append("storeName", this.state.storeName);
		formData.append("storeShortName", this.state.storeShortName);
		formData.append("stAddress", this.state.stAddress);
		formData.append("stLocation", this.state.stLocation);
		formData.append("stZipCode", this.state.stZipCode);
		formData.append("localPickup", this.state.localPickup);
		formData.append("regionalPickup", this.state.regionalPickup);
		formData.append("shiminPrice", this.state.shiminPrice);
		formData.append("shimaxPrice", this.state.shimaxPrice);
		formData.append("storeDetails", this.state.storeDetails);
		formData.append("privacyPolicy", this.state.privacyPolicy);
		formData.append("stPhone", this.state.stPhone);
		formData.append("stEmail", this.state.stEmail);
		formData.append("website", this.state.website);
		formData.append("fblink", this.state.fblink);
		formData.append("youtube", this.state.youtube);
        formData.append("stLogo", this.state.stLogo);
        formData.append("country", this.state.country);
        formData.append("city", this.state.city);
        formData.append("state", this.state.state);
        formData.append("otherLinks", this.state.otherLinks);


        let valid_data = true;

		// this.state.storeName_error = false;
		// this.state.storeAddress_error = null;
		// this.state.storeEmail_error = null;
    // this.state.storePhone_error = null;
    // this.state.aboutStore_error = null;
    //  console.log("Store name is "+ this.state.storeName)

    if (this.state.storeName ==="" || this.state.storeName === null) {
     this.setState({
      storeName_error : true
     })
    
			valid_data = false;
    }
    
    if (this.state.stAddress ==="" || this.state.stAddress === null) {
      this.setState({
        storeAddress_error : true
      })
     
       valid_data = false;
     }

     if (this.state.stEmail ==="" || this.state.stEmail === null) {
      this.setState({
        storeEmail_error : true
      })
     
       valid_data = false;
     }


     if (this.state.stPhone === "" || this.state.stPhone === null) {
      this.setState({
        storePhone_error : true
      })
     
       valid_data = false;
     }

     if (this.state.storeDetails ==="" || this.state.storeDetails === null) {
      this.setState({
        aboutStore_error : true
      })
     
       valid_data = false;
     }
     
     
    
     console.log("Button clieked with updated data")
if(valid_data === true){
 
  axios
  .post(process.env.REACT_APP_API+"/store/update/"+ (this.state.updateID === ""? userInfo.UserID:this.state.updateID),   //userInfo.UserID , //userInfo.UserID, 
  formData, {
headers: {
"Content-Type": "multipart/form-data",
},
})
.then((res) => {
console.log("This is the Responds" + res);
this.setState({ msg: res.data.message });
this.setState({ userImage: res.data.results.userImage });
this.setState({
  isOpen : true,
  message: "Store Information Updated Successfully", 
    type : "success",
})
window.location.reload(false);
})
.catch((err) => console.log(err));


}

	  

	};

	componentDidMount() {
         this.fetchStoreDetails();
         this.getCountries();
	}



  render() {
    const { classes, updateID } = this.props;
  return (
    <div hidden={this.props.hideStoreEntry}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">

              <h4 className={classes.cardTitleWhite}>Edit Store</h4>
              <p className={classes.cardCategoryWhite}>Complete your store profile</p>
            </CardHeader>
            <CardBody>
            


              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  {/* <CustomInput
                   required = {true}
                    labelText="Store Full Name"
                    id="storeName"
                    name="storeName"
                    value={this.state.storeName}
                    onChange={this.changeHandaler}
                     error = {this.state.storeName_error}
                    success={(this.state.storeName_error === true ? "Store Name is Required":"")}
                    formControlProps={{
                      fullWidth: true
                    }}
                  /> */}



<FormControl fullWidth  required={true} style={{marginTop:28}}    className={classes.formControl}>
<TextField 
  id="storeName" 
  name="storeName"
  // label="Store Name" 
  label={
    <div style={{fontSize:20, marginTop:-3}}>
      Store Name
      <Tooltip title="Type your store name" aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
    </div>
  }
value={this.state.storeName}
onChange={this.changeHandaler}
// required = {true}

 error = {this.state.storeName_error}
 helperText={(this.state.storeName_error === true ? "Store Name is Required":"")}

InputLabelProps={{
    style: { color: 'Black' },
  }}
 


  />
                     </FormControl> 


                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    // labelText="Store Short Name"
                    labelText= {
                      <div>
                       Store Short Name
                        <Tooltip title="Type your store short name" aria-label="add">
                  
                  <ContactSupportIcon style={{color:"black"}}/>
                  
                  </Tooltip>
                      </div>
                    }

                    id="storeShortName"
                    name="storeShortName"
                    value={this.state.storeShortName}
					onChange={this.changeHandaler}

                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>

            

              <GridContainer>
               
                <GridItem xs={12} sm={12} md={6}>
                  
                  {/* <CustomInput
                    labelText="Email address"
                   
                    id="stEmail"
                    name="stEmail"
				
					value={this.state.stEmail}
					onChange={this.changeHandaler}
                    formControlProps={{
                      fullWidth: true
                    }}
                  /> */}

<FormControl fullWidth  required={true} style={{marginTop:28}}    className={classes.formControl}>
<TextField 
  id="stEmail"
  name="stEmail"
  // label="Store Email"
  label={
    <div style={{fontSize:20, marginTop:-3}}>
     Store Email
      <Tooltip title="Type your store contact Email. This is required!!" aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
    </div>
  }

	value={this.state.stEmail}
  onChange={this.changeHandaler}
// required = {true}

 error = {this.state.storeEmail_error}
 helperText={(this.state.storeEmail_error === true ? "Email is Required":"")}

InputLabelProps={{
    style: { color: 'Black' },
  }}
 
  />
</FormControl> 



                </GridItem>
                


                <GridItem xs={12} sm={12} md={6}>
                  {/* <CustomInput
                    labelText="Phone"
                    id="stPhone"       
                    name="stPhone"                                  
                    value={this.state.stPhone}
                    onChange={this.changeHandaler}


                    formControlProps={{
                      fullWidth: true
                    }}
                  /> */}

<FormControl fullWidth  required={true} style={{marginTop:28}}    className={classes.formControl}>
<TextField 
   id="stPhone"       
   name="stPhone"   
  // label="Store Contact"
  label={
    <div style={{fontSize:20, marginTop:-3}}>
     Store Contact
      <Tooltip title="Type your store contact Number. This is required!!" aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
    </div>
  }


  value={this.state.stPhone}
  onChange={this.changeHandaler}
  // required = {true}
  type = "number"
 error = {this.state.storePhone_error}
 helperText={(this.state.storePhone_error === true ? "Phone Number is Required":"")}

InputLabelProps={{
    style: { color: 'Black' },
  }}
 
  />
</FormControl> 



                </GridItem>
              </GridContainer>



              <GridContainer>

               <GridItem    xs={12} sm={12} md={3}>
                  
                  <FormControl fullWidth  style={{marginTop:15}}    className={classes.formControl}>
                     {/* <InputLabel    htmlFor="age-native-simple">  */}
                     {/* label= */}
                     {
                      //  style={{fontSize:20, marginTop:-3}}
    <div style={{fontSize:16}} >
     Country
      <Tooltip   title="Type your store contact Number. This is required!!" aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
    </div>
  }
                      
                     {/* </InputLabel> */}
                        <Select
                         native
                        //  name= 'country'
                        //     id= 'country'
                        value={this.state.country}
                        onChange={this.changeHandaler}

                         inputProps={{
                            name: 'country',
                            id: 'country'
                         }} 

                        >
                       
                                <option aria-label="None" value="" />
                               
                                {/* <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option> */}

                                {this.state.CountryList.map((e, key) => {
									return (
										<option key={key} value={e.name}>
											{e.name}
										</option>
									);
								})}

                                </Select>
                     </FormControl>

                  </GridItem>
 



              <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    // labelText="State"
                    labelText={
                      <div>
                       State
                        <Tooltip title="In Which state your store is." aria-label="add">
                  
                  <ContactSupportIcon style={{color:"black"}}/>
                  
                  </Tooltip>
                      </div>
                    }
                    id="state"
                    name="state"
                    value={this.state.state}
								onChange={this.changeHandaler}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    // labelText="City"
                    labelText={
                      <div>
                       City
                        <Tooltip title="In Which City your store is." aria-label="add">
                  
                  <ContactSupportIcon style={{color:"black"}}/>
                  
                  </Tooltip>
                      </div>
                    }
                    id="city"
                    name="city"
                    value={this.state.city}
                    onChange={this.changeHandaler}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
               
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    // labelText="Postal Code"
                    labelText={
                      <div>
                       Postal Code
                        <Tooltip title="Postal Code of  your store location." aria-label="add">
                  
                  <ContactSupportIcon style={{color:"black"}}/>
                  
                  </Tooltip>
                      </div>
                    }

                    id="stZipCode"
                    name="stZipCode"
                    value={this.state.stZipCode}
                    onChange={this.changeHandaler}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>


              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                
                  {/* <CustomInput
                    labelText="Address"
                    id="stAddress"
                    name="stAddress"
                    value={this.state.stAddress}
                    onChange={this.changeHandaler}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 2
                    }}
                  /> */}


<FormControl fullWidth   style={{marginTop:28}}    className={classes.formControl}>
<TextField 
  id="stAddress"
  name="stAddress" 
  // label="Store Address"
  label={
    <div style={{fontSize:20, marginTop:-3}}>
    Store Address
      <Tooltip title="street address of you store location" aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
    </div>
  }

  value={this.state.stAddress}
  onChange={this.changeHandaler}
// required = {true}

 error = {this.state.storeAddress_error}
 helperText={(this.state.storeAddress_error === true ? "Store Address is Required":"")}

InputLabelProps={{
    style: { color: 'Black' },
  }}
 
  />
</FormControl> 



                </GridItem>
              </GridContainer>



              <GridContainer>

<GridItem xs={12} sm={12} md={4}>
    <CustomInput
      // labelText="Website"
      labelText={
        <div>
           {/* style={{fontSize:20, marginTop:-3}} */}
           Website 
          <Tooltip title="Provide the website link if any." aria-label="add">
    
    <ContactSupportIcon style={{color:"black"}}/>
    
    </Tooltip>
        </div>
      }

      id="website"
      name="website"
     
      value={this.state.website}
      onChange={this.changeHandaler}

      formControlProps={{
        fullWidth: true
      }}
    />
  </GridItem>

  <GridItem xs={12} sm={12} md={4}>
    <CustomInput
      // labelText="FB Page Link"
      labelText={
        <div>
           {/* style={{fontSize:20, marginTop:-3}} */}
           FB Page Link 
          <Tooltip title="Provide your store fb page link if any." aria-label="add">
    
    <ContactSupportIcon style={{color:"black"}}/>
    
    </Tooltip>
        </div>
      }

      id="fblink"
      name="fblink"
    
      value={this.state.fblink}
      onChange={this.changeHandaler}

      formControlProps={{
        fullWidth: true
      }}
    />
  </GridItem>
 
  <GridItem xs={12} sm={12} md={4}>
    <CustomInput
      // labelText="Youtube Link"
      labelText={
        <div>
           {/* style={{fontSize:20, marginTop:-3}} */}
           Youtube Link
          <Tooltip title="Provide your store youtube channel link  if any." aria-label="add">
    
    <ContactSupportIcon style={{color:"black"}}/>
    
    </Tooltip>
        </div>
      }
      id="youtube"
      name="youtube"
     
      value={this.state.youtube}
      onChange={this.changeHandaler}

      formControlProps={{
        fullWidth: true
      }}
    />
  </GridItem>


</GridContainer>


      <GridContainer>

<GridItem xs={12} sm={12} md={12}>
    <CustomInput
      // labelText="Other URLs"
      labelText={
        <div>
           {/* style={{fontSize:20, marginTop:-3}} */}
           Other URLs
          <Tooltip title="Provide all other online links if any. it should be coma seperated if multiple." aria-label="add">
    
    <ContactSupportIcon style={{color:"black"}}/>
    
    </Tooltip>
        </div>
      }
      id="otherLinks"
      name="otherLinks"
      
      value={this.state.otherLinks}
      onChange={this.changeHandaler}

      formControlProps={{
        fullWidth: true
      }}
    />
  </GridItem>

 
 



</GridContainer>

           



              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
{/*                 
                  <CustomInput
                    labelText="About Store"
                    id="storeDetails"
                    name="storeDetails"
                    required
                    value={this.state.storeDetails}
                    onChange={this.changeHandaler}

                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                     
                    }}
                  /> */}



<FormControl fullWidth  required={true} style={{marginTop:28}}    className={classes.formControl}>
<TextField 
  id="storeDetails"
  name="storeDetails"
  // label="About Your Store"
  label={
    <div style={{fontSize:20, marginTop:-3}}>
       {/* style={{fontSize:20, marginTop:-3}} */}
       About Your Store
      <Tooltip title="Provide details about your store. What you offer and more." aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
    </div>
  }

  multiline
  rows={4}
  value={this.state.storeDetails}
  onChange={this.changeHandaler}
// required = {true}

 error = {this.state.aboutStore_error}
 helperText={(this.state.aboutStore_error === false ? "Please write minimum 150 words about your store":"Please write minimum 150 words about your store")}

InputLabelProps={{
    style: { color: 'Black' },
  }}
 
  />
</FormControl>

                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                  {/* <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel> */}
                  <CustomInput
                    // labelText="Store Policy"
                    labelText={
                      <div>
                         {/* style={{fontSize:20, marginTop:-3}} */}
                         Store Policy
                        <Tooltip title="Provide  Store Policy of your store." aria-label="add">
                  
                  <ContactSupportIcon style={{color:"black"}}/>
                  
                  </Tooltip>
                      </div>
                    }

                    id="privacyPolicy"
                    name="privacyPolicy"
                  
                  
                    value={this.state.privacyPolicy}
                    onChange={this.changeHandaler}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>


              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                 
                 <TextField
                 id="outlined-full-width"
                 label= "Store Logo"
               
                 name="stLogo"
                 type="file"
                
                 margin="normal"
                 InputLabelProps = {{
                   shrink: true
                 }}
                 variant="outlined"
                 onChange={this.logoChangeHandaler}
                 />

                  {/* <CustomInput
                   type="file"
                    labelText="Image Upload"
                    id="upload-photo"
                    value={this.state.userDetails}
                    onChange={this.changeProfileImage}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 2
                    }}
                  /> */}



                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                 <Card>
<CardActionArea>
  <CardMedia
  component = "img"
  alt="contemplative reptil"
  height= "150"
  width = "200"
  title = "contemplative reptil"
  //style={{margin:8}}
  //margin="normal"
  src={this.state.uploadedFile}
  />

 
</CardActionArea>
                 </Card>
               
                </GridItem>

              </GridContainer>

            </CardBody>


            <CardFooter>
              <Button  	onClick={this.UpdateProfileHandler} color="primary">Update Store</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={this.state.uploadedFile} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              {/* <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6> */}
              <h4 className={classes.cardTitle}>{this.state.storeName}</h4>
              <p className={classes.description}>
                Email: {this.state.stEmail} <br/>
                Phone: {this.state.stPhone} <br/>
                Address: {this.state.country}, {this.state.state} {this.state.city},{this.state.address}<br/>
                URLS: {this.state.website}, {this.state.fblink} {this.state.youtube}
               
              </p>


              <p className={classes.description}>
               {this.state.storeDetails}
              </p>
              {/* !== "" || updateID !== undefined */}
              {updateID && (
 <Button color="primary" round>
 Show List
</Button>
              )    } 

{/* {updateID === "" || updateID === undefined && (
 <Button color="primary" round>
 Follow
</Button>
              )    }  */}
             

            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <Notification closeNotifi={this.closeNotification}  isOpen={this.state.isOpen} message={this.state.message} type={this.state.type} />
    </div>
    
  )};
}


StoreSetup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StoreSetup);