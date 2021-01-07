import React, { Component } from "react";

import originData, {
  sexData,
  maturityData,
  breederData,
  currencyData,
  dietTypeData,
  dietData,
  availablityData,
} from "./staticData/staticJsonData";


import InputLabel from "@material-ui/core/InputLabel";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";


import { CardActionArea, CardMedia, TextField } from "@material-ui/core";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import FormControl from "@material-ui/core/FormControl";
import Grid from '@material-ui/core/Grid';
import Select from "@material-ui/core/Select";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
  // import TextField from '@material-ui/core/TextField';
  import ContactSupportIcon from '@material-ui/icons/ContactSupport';
  import Tooltip from '@material-ui/core/Tooltip';


import axios from "axios";
//

const styles = {
  cardCategoryWhite: {
    // color: "#000000", //"rgba(255,255,255,.62)",
    color: "#FFFFFF",
    margin: "0",
    fontSize: "16px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    // color: "#000000",
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "600",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

var userInfo = JSON.parse(localStorage.getItem("UserData"));

export class ItemEntry extends Component {
  fileObj = [];
  fileArray = [];
  // URLArray = [];
  constructor(props) {
    super(props);
    console.log("Item Entry Clicked" + props);
    // console.log("Image URL ---" + props.editData.itemImage.imageUrl);
    this.state = {
      CatList: [],
      SubCatList: [],
      SubSubCatList: [],
      itemID: props.editData._id  || "",
      quantity: props.editData.quantity || 1,
      CatID: "",
      CatName: props.editData.CatName  || "",
      SubCatID: "",
      SubCatName: props.editData.SubCatName || "",
      SubSubCatName : props.editData.SubSubCatName || "",
      origin: props.editData.origin || "",
      title: props.editData.title || "",
      sequence: props.editData.sequence  || "",
      sex: props.editData.sex  || "",
      maturity: props.editData.maturity  || "",
      breeder: props.editData.breeder  || "",
      price: props.editData.price || 0,
      //price: props.editData.price,
      currency: props.editData.currency  || "",
      minimumShippingPrice:
      	props.editData.minimumShippingPrice || "",
      maximumShippingPrice:
      	props.editData.maximumShippingPrice  || "",
      weight: props.editData.weight  || "",
      length: props.editData.length  || "",
      DOB: props.editData.DOB? props.editData.DOB: "",
      diet: props.editData.diet  || "",
      dietType: props.editData.dietType  || "",
      itemDescription: props.editData.itemDescription || "",
      tag : props.editData.tag || "",
      itemImage : props.editData.itemImage?props.editData.itemImage: [],
         // itemImage: [props.editData.itemImage? props.editData.itemImage[0].imageUrl: [null]],
        // itemImage: [props.editData.itemImage[0].imageUrl === undefined? props.editData.itemImage[0].imageUrl: [null]],
      availablity: props.editData.availablity || "",
        //  upload: props.editData.itemImage? process.env.REACT_APP_API+props.editData.itemImage[0].imageUrl.replace("public", ""): null,
          // upload: null,
     
      originList: [],
      sexList: [],
      maturityList: [],
      breederList: [],
      currencyList: [],
      dietList: [],
      dietTypeList: [],
      availabiltyList: [],

      CatName_error : false,
      SubCatName_error : null,
      Price_error : null,
      title_error : null,
      details_error : null,
      image_error : null,

    };

    this.handleChange = this.handleChange.bind(this);
    this.changeItemImage = this.changeItemImage.bind(this);
    this.fetchItemDetails = this.fetchItemDetails.bind(this);
    this.changeDate = this.changeDate.bind(this);
    
  }

  fetchItemDetails = (id) => {
    console.log("Btn Clicked for Item Details" + id);

    axios
      .get(process.env.REACT_APP_API + "/item/" + id)

      .then((res) => {
        this.setState({
          title: res.data.title,
        });
      })
      .catch((err) => console.log(err));
  };

  changeItemImage = (event) => {
    this.fileObj = [];
    this.fileArray = [];

    this.fileObj.push(event.target.files);
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
     
  }
    this.setState({   
         itemImage:  event.target.files
    });
    console.log("File URL"+ this.state.itemImage)
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  
  changeDate = (date) => {
    this.setState({
      DOB: date.target.value,
    });


  };

  fetchCategory = (e) => {
   console.log("Subcate name in cat"+ this.state.SubCatName) 
    axios
      .get(process.env.REACT_APP_API + "/category")

      .then((res) => {
      
        var CategoryList = res.data;
       // console.log(CategoryList);
        this.setState({
          CatList: CategoryList.map((CatList) => CatList), //.CatName),
            CatName: this.state.CatName,
       
          //CatName: this.props.editData.CatName,
        });
        // console.log(this.state.CatList)
      
         this.subCategory(this.state.CatName);
      })
      .catch((err) => console.log(err));
  };


  subCategory = (e) => {
      // this.setState({ [e.target.name]: e.target.value });
     if(e){
      this.setState({ 
        CatName : e.target.value,
        SubSubCatList : []
      
      });
     }
     

    //  this.setState({ [e.target.name]: e });
       
    console.log("Subcat Btn Clicked " + this.props.editData.SubCatName);

    axios
      // .get(process.env.REACT_APP_API + "/category/" + e.target.value)
      .get(process.env.REACT_APP_API + "/category/" + (e === undefined?this.state.CatName:e.target.value))
      .then((res) => {
        var SubCategoryList = res.data[0].SubCategory;
        
        console.log(SubCategoryList);
        this.setState({
          SubCatList: SubCategoryList.map(
            (SubCatList) => SubCatList //.SubCatName
          ),
          // SubCatName: this.state.SubCatName,
        });
        console.log("Cat Cat " + this.state.CatName);

        console.log("Sub Cat  " + this.state.SubCatName);
      })
      .catch((err) => console.log(err));
  };


  
  SubsubCategory = (e) => {
    // this.setState({ [e.target.name]: e.target.value });
    // console.log("Subcat Btn Clicked " + e.target.value);

    if(e){
      this.setState({ 
        [e.target.name] : e.target.value,
        // SubSubCatName : e.target.value,
         SubSubCatList : []
      });
     }

    axios
      .get(process.env.REACT_APP_API + "/category/" + this.state.CatName +"/"+(e === undefined?this.state.SubCatName: e.target.value))
      .then((res) => {      
        var SubSubCategoryList = res.data[0].SubCategory[0].SubSubCategory;
        console.log("Sub Sub Category"+ SubSubCategoryList)
     
        this.setState({
          SubSubCatList: SubSubCategoryList.map(
            (SubSubCatList) => SubSubCatList //.SubCatName
          ),
         // SubCatName: this.props.editData.SubCatName,
        });
        
      })
      .catch((err) => console.log(err));
  };




  fatchOrigin = () => {
    this.setState({
      originList: originData.map((originList) => originList),
      //CatName: CategoryList[0].CatName,
    });




    
    this.setState({
    	sexList: sexData.map((sexList) => sexList),
    	sex: this.state.sex,
    	maturityList: maturityData.map((maturityList) => maturityList),
    	maturity: this.state.maturity,
    	breederList: breederData.map((breederList) => breederList),
    	breeder: this.state.breeder,
    	currencyList: currencyData.map((currencyList) => currencyList),
    	currency: this.state.currency,
    	dietList: dietData.map((dietList) => dietList),
    	diet: this.state.diet,
    	dietTypeList: dietTypeData.map((dietTypeList) => dietTypeList),
    	dietType: this.state.dietType,
    	availabiltyList: availablityData.map(
    		(availabiltyList) => availabiltyList
    	),
    	availabilty: this.state.availabilty,
    });


  };


  addItemeHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("storeID", userInfo.UserID);
    formData.append("quantity", this.state.quantity);
    formData.append("CatID", this.state.CatID);
    formData.append("CatName", this.state.CatName);
    formData.append("SubCatID", this.state.SubCatID);
    formData.append("SubCatName", this.state.SubCatName);
    formData.append("SubSubCatName", this.state.SubSubCatName);
    formData.append("origin", this.state.origin);
    formData.append("title", this.state.title);
    formData.append("sequence", this.state.sequence);
    formData.append("sex", this.state.sex);
    formData.append("maturity", this.state.maturity);
    formData.append("breeder", this.state.breeder);
    formData.append("price", this.state.price);
    formData.append("currency", this.state.currency);
    formData.append("minimumShippingPrice", this.state.minimumShippingPrice);
    formData.append("maximumShippingPrice", this.state.maximumShippingPrice);
    formData.append("weight", this.state.weight);
    formData.append("length", this.state.length);
    formData.append("DOB", this.state.DOB);
    formData.append("diet", this.state.diet);
    formData.append("dietType", this.state.dietType);
    formData.append("itemDescription", this.state.itemDescription);
    formData.append("availablity", this.state.availablity);
    formData.append("tag", this.state.tag);
    
    for (const key of Object.keys(this.state.itemImage)) {
      formData.append('itemImage', this.state.itemImage[key])
  }
 
  let valid_data = true;
    // CatName_error : false,
    // SubCatName_error : null,
    // Price_error : null,
    // title_error : null,
    // details_error : null,
    // image_error : null,

    if (this.state.CatName ==="" || this.state.CatName === null) {
      this.setState({
        CatName_error : true
      })
     
       valid_data = false;
     }

     if (this.state.SubCatName ==="" || this.state.SubCatName === null) {
      this.setState({
        SubCatName_error : true
      })
     
       valid_data = false;
     }

     if (this.state.price ==="" || this.state.price === null) {
      this.setState({
        Price_error : true
      })
     
       valid_data = false;
     }

     if (this.state.title ==="" || this.state.title === null) {
      this.setState({
        title_error : true
      })
     
       valid_data = false;
     }

     if (this.state.itemDescription ==="" || this.state.itemDescription === null) {
      this.setState({
        details_error : true
      })
     
       valid_data = false;
     }
console.log("Item Image Check "+ this.state.itemImage.length)
    //  if (this.state.itemImage.length < 1 || this.state.itemImage === [] || this.state.itemImage === null || this.state.itemImage === "") {
      if (this.state.itemImage.length < 1) {
      this.setState({
        image_error : true
      })
     
       valid_data = false;
     }

    if (valid_data === true){
      var URL = "";
      if(this.state.itemID){
        URL = "/item/update/"+this.state.itemID
      }
      else{
        URL = "/item/add/"
      }
      axios
        .post(process.env.REACT_APP_API + URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
  
        .then((res) => {
          console.log("This is the Responds" + res);
          window.location.reload(false)
          this.setState({ msg: res.data.message });
          this.setState({ userImage: res.data.results.userImage });
        })
        .catch((err) => console.log(err));
        
    }
    
  };

 

  componentDidMount() {
      this.fetchCategory();
    this.fatchOrigin();
    this.subCategory();
    this.SubsubCategory()

    if(this.props.editData.itemImage){
      this.fileObj.push(this.props.editData.itemImage);
      var url = ""
      for (let i = 0; i < this.fileObj[0].length; i++) {
        url =  this.fileObj[0][i].imageUrl.replace("public", "")
        this.fileArray.push(process.env.REACT_APP_API + url)
        url = "" 
    }
      this.setState({   
           itemImage:   this.fileArray
      });
    }
    const da = new Date(this.props.editData.DOB)
    var d = da.getDate();
    var m = da.getMonth() + 1; //Month from 0 to 11
    var y = da.getFullYear();
    var fullDate =  '' + (m<=9 ? '0' + m : m) + '-'  + y + '-' + (d <= 9 ? '0' + d : d);
    
    this.setState({   
      DOB:   fullDate
 });
console.log("New Date is "+ this.state.DOB)
  }

  render() {
    const { classes } = this.props;
  
    return (
      <div>
        <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Add New item</h4>
                <p className={classes.cardCategoryWhite}>
                  Provide as much as information you can.
                </p>
              </CardHeader>

              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl
                      fullWidth
                      // required= {true}
                      style={{ marginTop: 15 }}
                      className={classes.formControl}
                      error = {this.state.CatName_error}
                      // helperText={(this.state.CatName_error === true ? "Category is Required":"")}
                      
                    >
                      {/* <InputLabel htmlFor="age-native-simple">
                        Category{" "}
                      </InputLabel> */}
                      <div style={{fontSize:16}} >
                      Category
      <Tooltip   title="Select the Category of your item. This is required!!" aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
    </div>
  
                      <Select
                        native
                        value={this.state.CatName}
                          onChange={this.subCategory}
                        inputProps={{
                          name: "CatName",
                          id: "CatName",
                        }}
                      >
                        <option aria-label="None" value="" />

                        {this.state.CatList.map((e, key) => {
                          return (
                            <option key={key} value={e.CatName}>
                              {e.CatName}
                            </option>
                          );
                        })}

                      </Select>
                    </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl
                      fullWidth
                      // required="true"
                      style={{ marginTop: 15 }}
                      className={classes.formControl}
                      error = {this.state.SubCatName_error}
                    >
                      {/* <InputLabel htmlFor="age-native-simple">
                        Sub Category{" "}
                      </InputLabel> */}
                         <div style={{fontSize:16}} >
                         Sub Category
      <Tooltip   title="Select the  Sub Category of your item. This is required!!" aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
    </div>

                      <Select
                        native
                      
                           value={this.state.SubCatName}
                        //  value={this.props.editData.SubCatName}
                         onChange={this.SubsubCategory}
                        inputProps={{
                          name: "SubCatName",
                          id: "SubCatName",
                        }}
                      >
                        <option aria-label="None" value="" />

                        {this.state.SubCatList.map((e, key) => {
                          return (
                            <option key={key} value={e.SubCatName}>
                              {e.SubCatName}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl
                      fullWidth
                      // required="true"
                      style={{ marginTop: 15 }}
                      className={classes.formControl}
                    >
                      {/* <InputLabel htmlFor="age-native-simple">
                        Sub Category{" "}
                      </InputLabel> */}
                        <div style={{fontSize:16}} >
                         Sub Category
      <Tooltip   title="Select the  Sub Category of your item. This is required!!" aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
    </div>
                      <Select
                        native
                        value={this.state.SubSubCatName}
                        // onChange={this.changeHandaler}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "SubSubCatName",
                          id: "SubSubCatName",
                        }}
                      >
                        <option aria-label="None" value="" />

                        {this.state.SubSubCatList.map((e, key) => {
                          return (
                            <option key={key} value={e.SubSubCatName}>
                              {e.SubSubCatName}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      // labelText="Quantity"
                      labelText={
                        <div>
                           {/* style={{fontSize:20, marginTop:-3}} */}
                           Quantity
                          <Tooltip title="How many item do you have to sell!!" aria-label="add">
                    
                    <ContactSupportIcon style={{color:"black"}}/>
                    
                    </Tooltip>
                        </div>
                      }

                      id="quantity"
                      type="number"
                      name="quantity"
                      value = {this.state.quantity}
                      onChange={this.handleChange}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      // labelText="Price"
                      labelText={
                        <div>
                           {/* style={{fontSize:20, marginTop:-3}} */}
                           Price
                          <Tooltip title="Price of your Pet!!" aria-label="add">
                    
                    <ContactSupportIcon style={{color:"black"}}/>
                    
                    </Tooltip>
                        </div>
                      }
                      type="number"
                      id="price"
                      name="price"
                      required = {true}
                      error = {this.state.Price_error}
                      helperText={(this.state.Price_error === true ? "Price is Required":"")}

                      value={this.state.price}
                      onChange={this.handleChange}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl
                      fullWidth
                      // required="true"
                      style={{ marginTop: 15 }}
                      className={classes.formControl}
                    >
                      {/* <InputLabel htmlFor="age-native-simple">
                        currency{" "}
                      </InputLabel> */}
                       <div style={{fontSize:16}} >
                       Currency
      <Tooltip   title="Select the currency!!" aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
    </div>
                      <Select
                        native
                        value={this.state.currency}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "currency",
                          id: "currency",
                        }}
                      >
                        <option aria-label="None" value="" />

                        {this.state.currencyList.map((e, key) => {
                          return (
                            <option key={key} value={e.currency}>
                              {e.currency}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl
                      fullWidth
                      // required="true"
                      style={{ marginTop: 15 }}
                      className={classes.formControl}
                    >
                      {/* <InputLabel htmlFor="age-native-simple">
                        Origin{" "}
                      </InputLabel> */}
                       <div style={{fontSize:16}} >
                       Origin
      <Tooltip   title="Select an Origin type!!" aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
    </div>
                      <Select
                        native
                        value={this.state.origin}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "origin",
                          id: "origin",
                        }}
                      >
                        <option aria-label="None" value="" />

                        {this.state.originList.map((e, key) => {
                          return (
                            <option key={key} value={e.origin}>
                              {e.origin}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl
                      fullWidth
                      // required="true"
                      style={{ marginTop: 15 }}
                      className={classes.formControl}
                    >
                      {/* <InputLabel htmlFor="age-native-simple">Sex </InputLabel> */}
                      <div style={{fontSize:16}} >
                      Sex
      <Tooltip   title="Sex of the item!!" aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
    </div>

                      <Select
                        native
                        value={this.state.sex}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "sex",
                          id: "sex",
                        }}
                      >
                        <option aria-label="None" value="" />

                        {this.state.sexList.map((e, key) => {
                          return (
                            <option key={key} value={e.sex}>
                              {e.sex}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl
                      fullWidth
                      // required="true"
                      style={{ marginTop: 15 }}
                      className={classes.formControl}
                    >
                      {/* <InputLabel htmlFor="age-native-simple">
                        Maturity{" "}
                      </InputLabel> */}
                       <div style={{fontSize:16}} >
                       Maturity
      <Tooltip   title="Maturity type of your pet!!" aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
    </div>

                      <Select
                        native
                        value={this.state.maturity}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "maturity",
                          id: "maturity",
                        }}
                      >
                        <option aria-label="None" value="" />

                        {this.state.maturityList.map((e, key) => {
                          return (
                            <option key={key} value={e.maturity}>
                              {e.maturity}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    {/* <CustomInput
                      labelText="Title"
                      id="title"
                      name="title"
                      required
                      error = {this.state.title_error}
                      helperText = {this.state.title_error === true?"Title is Required":""}
                      value={this.state.title}
                      onChange={this.handleChange}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    /> */}
<FormControl fullWidth  required={true} style={{marginTop:28}}    className={classes.formControl}>
<TextField 
  id="title"
  name="title"
  // label="Title"
  label={
    <div style={{fontSize:20, marginTop:-3}}>
    Title
      <Tooltip title="Write the title best for your item. This is required!!" aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
    </div>
  }
  value={this.state.title}
  onChange={this.handleChange}
// required = {true}

 error = {this.state.title_error}
 helperText={(this.state.title_error === true ? "Title is Required":"")}

InputLabelProps={{
    style: { color: 'Black' },
  }}
 


  />
                     </FormControl> 

                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    {/* <CustomInput
                      labelText="Details"
                      id="itemDescription"
                      name="itemDescription"
                      required = {true}

                      error = {this.state.title_error}
                      value={this.state.itemDescription}
                      onChange={this.handleChange}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                      }}
                    /> */}

                    
<FormControl fullWidth  required={true} style={{marginTop:28}}    className={classes.formControl}>
<TextField 
  id="itemDescription"
  name="itemDescription"
  // label="Item Detail "
  label={
    <div style={{fontSize:20, marginTop:-3}}>
    Item Detail
      <Tooltip title="Provide details of your pet so that user can get more information about it. This is required!!" aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
    </div>
  }
  multiline
  rows={5}
  value={this.state.itemDescription}
  onChange={this.handleChange}
// required = {true}

 error = {this.state.details_error}
 helperText={(this.state.details_error === false ? "Please write minimum 150 words about your store":"Please write minimum 150 words about your store")}

InputLabelProps={{
    style: { color: 'Black' },
  }}
 
  />
</FormControl>




                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      // labelText="Domesting Shipping Minimum Price"
                      labelText={
                        <div style={{marginTop:-3}}>
                        Domesting Shipping Minimum Price
                          <Tooltip title="Domesting Shipping Minimum Price!!" aria-label="add">
                    
                    <ContactSupportIcon style={{color:"black"}}/>
                    
                    </Tooltip>
                        </div>
                      }
                      type="number"
                      id="minimumShippingPrice"
                      name="minimumShippingPrice"
                      placeholder="Minimum Shipping Price.."
                      value={this.state.minimumShippingPrice}
                      onChange={this.handleChange}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      // labelText="Domesting Shipping Maximum Price"
                      labelText={
                        <div style={{marginTop:-3}}>
                       Domesting Shipping Maximum Price
                          <Tooltip title="Domesting Shipping Maximum Price!!" aria-label="add">
                    
                    <ContactSupportIcon style={{color:"black"}}/>
                    
                    </Tooltip>
                        </div>
                      }
                      type="number"
                      id="maximumShippingPrice"
                      name="maximumShippingPrice"
                      placeholder="Maximum Shipping Price.."
                      value={this.state.maximumShippingPrice}
                      onChange={this.handleChange}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    {/* <FormControl
                      fullWidth
                      required="true"
                      style={{ marginTop: 28 }}
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="age-native-simple">Diet </InputLabel>
                      <Select
                        native
                        value={this.state.diet}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "diet",
                          id: "diet",
                        }}
                      >
                        <option aria-label="None" value="" />

                        {this.state.dietList.map((e, key) => {
                          return (
                            <option key={key} value={e.diet}>
                              {e.diet}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl> */}
<CustomInput
                    // labelText="Store Short Name"
                    labelText= {
                      <div style={{marginTop:-3}}>
                       Diet & Diet Type
                        <Tooltip title="Provide the Diet & Diet type if any!!" aria-label="add">
                  
                  <ContactSupportIcon style={{color:"black"}}/>
                  
                  </Tooltip>
                      </div>
                    }

                    id="diet"
                    name="diet"
                    value={this.state.diet}
                    onChange={this.handleChange}

                    formControlProps={{
                      fullWidth: true
                    }}
                  />

                  </GridItem>
{/* 
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl
                      fullWidth
                      required="true"
                      style={{ marginTop: 28 }}
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="age-native-simple">Diet </InputLabel>
                      <Select
                        native
                        value={this.state.dietType}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "dietType",
                          id: "dietType",
                        }}
                      >
                        <option aria-label="None" value="" />

                        {this.state.dietTypeList.map((e, key) => {
                          return (
                            <option key={key} value={e.dietType}>
                              {e.dietType}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </GridItem> */}

                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl
                      fullWidth
                      // required="true"
                      style={{ marginTop: 15 }}
                      className={classes.formControl}
                    >
                      {/* <InputLabel htmlFor="age-native-simple">
                        Availablity{" "}
                      </InputLabel> */}
                       <div style={{fontSize:16}} >
                       Availablity
      <Tooltip   title="provide Availablity status!!" aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
    </div>

                      <Select
                        native
                        value={this.state.availablity}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "availablity",
                          id: "availablity",
                        }}
                      >
                        <option aria-label="None" value="" />

                        {this.state.availabiltyList.map((e, key) => {
                          return (
                            <option key={key} value={e.availablity}>
                              {e.availablity}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>




                <GridContainer>
              

                    
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        // labelText="Weight"
                        labelText= {
                          <div style={{marginTop: -3}}>
                          Average Length/Weight
                            <Tooltip title=" Average Length/Weight" aria-label="add">
                      
                      <ContactSupportIcon style={{color:"black"}}/>
                      
                      </Tooltip>
                          </div>
                        }

                        type="text"
                        id="weight"
                        name="weight"
                        value={this.state.weight}
                        onChange={this.handleChange}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>

                    {/* <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Length"
                        type="text"
                        id="length"
                        name="length"
                        value={this.state.length}
                        onChange={this.handleChange}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem> */}

                    <GridItem xs={12} sm={12} md={6}>
                     

                     
     <form fullWidth  style={{marginTop:28}}  className={classes.container} noValidate>
      <TextField
       fullWidth
        id="DOB"
          name="DOB"
        // label="DOB"

        label= {
          <div style={{fontSize:20, marginTop:-3}}>
         DOB
            <Tooltip title=" Date of Birth if you know" aria-label="add">
      
      <ContactSupportIcon style={{color:"black"}}/>
      
      </Tooltip>
          </div>
        }
        type="date"
         defaultValue={this.state.DOB}    //"2020-01-30"
      selected={this.state.DOB}      
      onChange={this.changeDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>


                    </GridItem>
                 
                </GridContainer>



            <GridContainer>
               
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  // labelText="Tag coma seperated"
                  labelText= {
                    <div style={{ marginTop:-3}}>
                   Tag coma seperated
                      <Tooltip title=" Tag coma seperated" aria-label="add">
                
                <ContactSupportIcon style={{color:"black"}}/>
                
                </Tooltip>
                    </div>
                  }

                  type="text"
                  id="tag"
                  name="tag"
                  value={this.state.tag}
                  onChange={this.handleChange}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>

            
           
           
          </GridContainer>



                <GridContainer>
                  <GridItem  xs={12} sm={12} md={4}>
                   <TextField
                   rows = {5}
                     
                      required= {true}
                      error = {this.state.image_error}
                      helperText = {this.state.image_error === true? "Upload Minimum 1 image. it is required":""}
                      label="Item Image"
                      id="itemImage"
                      name="itemImage"
                      type="file"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        multiple : true
                      }}
                      variant="outlined"
                      onChange={this.changeItemImage}
                    /> 
             
                 {/* <input
            
                type="file"
                required = "true"
                error =  "true"  //{this.state.image_error}
                helperText = "it is required"
								src=""
								alt="Image"
								width="300"
								height="300"
								id="itemImage"
								name="itemImage"
								accept="Image"
								placeholder="Your Picture.."
								onChange={this.changeItemImage}
								multiple 
							/>  */}

                  
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardActionArea >
                        {/* <CardMedia
                          component="img"
                          alt="contemplative reptil"
                          height="150"
                          width="200"
                          title="contemplative reptil"
                         
                          src={this.state.upload}
                        /> */}
                        {(this.fileArray || []).map(url => (
                        <img style={{height:300, width:300}} src={url} alt="..." />
                    ))}
                      </CardActionArea>
                    </Card>
                  </GridItem>
                </GridContainer>
              </CardBody>

              <CardFooter>
                <Button onClick={this.addItemeHandler} color="primary">
                  Save
                </Button>
              </CardFooter>
            </Card>
          </GridItem>



        </GridContainer>
      </div>
    );
  } 
}

ItemEntry.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemEntry);
