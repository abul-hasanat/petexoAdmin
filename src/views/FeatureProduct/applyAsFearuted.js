
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import ActionButton from "components/CustomButtons/ActionButton.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { withStyles } from "@material-ui/styles";
import Notification from "../../components/popup/notification.js"
import ConfirmDialog from "../../components/popup/ConfirmDialog.js"
import { EditOutlined } from "@material-ui/icons";

import axios from "axios";

var userInfo = JSON.parse(localStorage.getItem("UserData"));




function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [

  { id: 'category', numeric: true, disablePadding: true, label: 'Category' },
  { id: 'subcategory', numeric: true, disablePadding: true, label: 'Sub Category' },
  { id: 'Item', numeric: true, disablePadding: false, label: 'Item' },
  { id: 'description', numeric: true, disablePadding: false, label: 'Details' },
  { id: 'Price', numeric: true, disablePadding: false, label: 'Price' },
  { id: 'TotalReview', numeric: true, disablePadding: false, label: 'Total Review' },
  { id: 'AvgRatting', numeric: true, disablePadding: false, label: 'Avg. Ratting' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status'},
   { id: 'actions', numeric: true, disablePadding: false,  label: 'Actions' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));


const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Item List
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add New Item">
          <IconButton aria-label="Add New Item">
          </IconButton>
        </Tooltip>
      )
      
      }
    </Toolbar>

    
  );
  
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};






  const styles = {
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: 2, //theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },

  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
        // color: "#000000",
        color: "#FFFFFF",
      margin: "0",
      fontSize: "16px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
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
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }

  
};

  export class ApplyFeatured extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        itemList: [],
        msg: "",
        Checkstatus: 0,
        id: "12345",
        itemID : "",
        btnText : "",
        // editData: {},
        // listOpen: true,
        // createItem: false,
        // openEntry: true,

         // -------------
         order : 'asc',
         orderBy : 'calories',
         selected : [],
         page : 0,
         dense :false,
         rowsPerPage : 5,
         rows : [],
         //----------------
         isOpen : false,
        message: "", 
          type : "",
          //------
          dialogIsOpen : false, 
          title : "", 
          subTitle: "",
          maxword : 50,

    };

     //this.showList = this.showList.bind(this);

       this.showItemList = this.showItemList.bind(this);
      // this.handleRequestSort = this.handleRequestSort.bind(this);
      // this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    
      // this.handleClick = this.handleClick.bind(this);
      // this.handleChangePage = this.handleChangePage(this);
      // this.handleChangeRowsPerPage = this.handleChangeRowsPerPage(this);
      // this.handleChangeDense = this.handleChangeDense(this);
        // this.activeItem  = this.activeItem.bind(this)
        this.deleteItem  = this.deleteItem.bind(this)
        this.closeDialog = this.closeDialog.bind(this)     
        this.handleRowClick = this.handleRowClick.bind(this);
         this.onRowDelete = this.onRowDelete.bind(this)
      this.closeNotification = this.closeNotification.bind(this)
    }

 
    showItemList = () => {
		axios
        .get(process.env.REACT_APP_API + "/item/store/"+userInfo.UserID  ) 
			.then((res) => {
				
				this.setState({
					rows: res.data,
				});
				
			})
			.catch((err) => console.log(err));
    };
    

 

    

    handleRowClick = ()=>{
      this.setState({
       dialogIsOpen : false
      })
    }

    handleRowClick = ()=>{
      this.setState({
       dialogIsOpen : false
      })
    }

    onRowDelete = ( id, btntext )=>{
        // btntext = btnText
      this.setState({
        Checkstatus: 1,
      });

      this.setState({
        dialogIsOpen : false, 
      })
      
      axios
      .post(process.env.REACT_APP_API + "/featured/change-feature-status/" + this.state.itemID + "/" + this.state.btnText)
      .then((res) => {
       
        if(this.state.btnText === "Active"){
            this.setState({
                isOpen : true,
                message: " Featured Item Successfully Deleted", 
                type : "error"
              })
        }
        if(this.state.btnText === "Apply"){
            this.setState({
                isOpen : true,
                message: "Successfully applied as Featured Item", 
                type : "success"
              })
        }
       
        
      })
      .catch((err) => console.log(err));

    }




    deleteItem = (id, btntext)=>{
        if(btntext=== "Active"){
            this.setState({
                dialogIsOpen : true, 
                title : "Are you sure  you want to delete the Featured Item", 
                subTitle: "You cannot undo this operation once done.",
                itemID : id,
                btnText : btntext
              })
        }

        if(btntext=== "Apply"){
            this.setState({
                dialogIsOpen : true, 
                title : "Are you sure  you want to Active it as Featured Item", 
                subTitle: "You cannot undo this operation once done.",
                itemID : id,
                btnText : btntext
              })
        }
    

     
  
    

    }

    closeNotification = ()=>{
      this.setState({
        isOpen : false,
      })
    }



    notifi = ()=>{
          this.setState({
    isOpen : true,
    message: " Successfully activated", 
    type : "success"
  })
    }

 


    componentDidMount() {
		this.showItemList();
    }
    
    componentDidUpdate(prePro, preState) {
		if (preState.Checkstatus !== this.state.Checkstatus) {
			 this.showItemList();
			this.setState({
				Checkstatus: 0,
			});
		}
	}
  

   handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    this.setState({
			order: isAsc ? 'desc' : 'asc',
    });

    this.setState({
      order: isAsc ? 'desc' : 'asc',
      setOrderBy : property
    });
    
  };



   




   handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = this.state.rows.map((n) => n.name);
   
      this.setState({
         selected : newSelecteds
      })
      return;
    }
   
    this.setState({
      selected : [],
    })
  };



   handleClick = (event, name) => {
    const selectedIndex = this.state.selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(this.state.selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(this.state.selected.slice(1));
    } else if (selectedIndex === this.state.selected.length - 1) {
      newSelected = newSelected.concat(this.state.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        this.state.selected.slice(0, selectedIndex),
        this.state.selected.slice(selectedIndex + 1),
      );
    }

    this.setState({
      selected :newSelected
    })
    // setSelected(newSelected);
  };

   handleChangePage = (event, newPage) => {
    // setPage(newPage);
    this.setState({
      page: newPage,
    
    });
  };

   handleChangeRowsPerPage = (event) => {
     this.setState({
       rowsPerPage : parseInt(event.target.value, 10),
       page : 0
     })
    // setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
  };

   handleChangeDense = (event) => {
    // setDense(event.target.checked);
    this.setState({
      dense : 0, //event.target.checked,
      
    })
  };
  
  closeDialog = ()=>{
    this.setState({
      dialogIsOpen:false
    })
    console.log("closed the dialog---------------")
  }

  
   render() {
    const isSelected = (name) => this.state.selected.indexOf(name) !== -1;

    const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.rows.length - this.state.page * this.state.rowsPerPage);
    
    const { classes} = this.props;
  
        var deleteBtnText = "Active";
	
    
  return (

    <GridContainer>
    <GridItem  xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Feature Item List</h4>
          <p className={classes.cardCategoryWhite}>
            Use the status option to make the item featured and unfeatured
          </p>
        </CardHeader>
        <CardBody>
         
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={this.state.selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={this.state.dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={this.state.selected.length}
              order={this.state.order}
              orderBy={this.state.orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={this.state.rows.length}
            />
            <TableBody>
              {stableSort(this.state.rows, getComparator(this.state.order, this.state.orderBy))
                .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                 
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={(event) => this.handleClick(event, row.name)}
                        />
                      </TableCell>


                    
                      <TableCell align="right">{row.CatName}</TableCell>
                      <TableCell align="right">{row.SubCatName === undefined ? "" :row.SubCatName}</TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.itemDescription.length> this.state.maxword ? row.itemDescription.slice(0,this.state.maxword).split(' ').slice(0, -1).join(' ') : row.itemDescription}</TableCell>
                      {/* {row.itemDescription.length> this.state.maxword ? row.itemDescription.slice(0,this.state.maxword).split(' ').slice(0, -1).join(' ') : row.itemDescription} */}
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">
                      <ActionButton                     
  color = "primary"> {(row.appliedAsFeatured === 1?"Panding": row.appliedAsFeatured === 2? "Active":"Not Applied")} </ActionButton>
                          
                          </TableCell>
                     
                      <TableCell align="right">
                      <ActionButton  
                   
                    onClick={ () => {this.deleteItem(row._id, (row.isFeatured === true? deleteBtnText="Active": deleteBtnText ="Apply"))}}
                   
  color = "primary" >  <EditOutlined fontSize="small"/> </ActionButton>
                          
                          </TableCell>
                    
                     
                      
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (this.state.dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.state.rows.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={this.state.dense} onChange={this.handleChangeDense} />}
        label="Dense padding"
      />
    </div>
        </CardBody>
      </Card>
    </GridItem>

<Notification closeNotifi={this.closeNotification}  isOpen={this.state.isOpen} message={this.state.message} type={this.state.type} />

<ConfirmDialog onRowClick={this.handleRowClick } deleteClick={()=>{this.onRowDelete("id", deleteBtnText)}} dialogIsOpen={this.state.dialogIsOpen} title={this.state.title} subTitle={this.state.subTitle}/>

  </GridContainer>  



  );
              }
}


ApplyFeatured.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApplyFeatured);