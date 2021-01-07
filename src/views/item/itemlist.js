
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
import CloseIcon from "@material-ui/icons/Close";
import { EditOutlined } from "@material-ui/icons";


import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { withStyles } from "@material-ui/styles";
import Button from "components/CustomButtons/Button.js";
import ItemEntry from "./itementry.js";
import Notification from "../../components/popup/notification.js"
import ConfirmDialog from "../../components/popup/ConfirmDialog.js"
import axios from "axios";


var userInfo = JSON.parse(localStorage.getItem("UserData"));
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }


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
  { id: 'category', numeric: false, disablePadding: true, label: 'Category' },
  { id: 'subCategory', numeric: true, disablePadding: false, label: 'SubCategory' },
  { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
  { id: 'title', numeric: true, disablePadding: false, label: 'Title' },
  { id: 'description', numeric: true, disablePadding: false, label: 'Description' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status'},
  { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
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
  const { numSelected, onClick } = props;


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
            {/* <FilterListIcon /> */}
             <AddCircleOutlineIcon 
            onClick={onClick}
           
             style={{ fontSize: 40 }} color="secondary"/>
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>

    
  );
  
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};





// const useStyles = makeStyles((theme) => ({
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
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
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



  export class Itemlist extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        itemList: [],
        msg: "",
        status: 0,
        id: "12345",
        editData: {},
        listOpen: true,
        createItem: false,
        openEntry: true,

        // -------------
        order : 'asc',
        orderBy : 'calories',
        selected : [],
        page : 0,
        dense :false,
        rowsPerPage : 5,
        rows : []
        
      };
  
      this.showItemList = this.showItemList.bind(this);
      this.deleteItem  = this.deleteItem.bind(this)
      this.onRowDelete  = this.onRowDelete.bind(this)
      this.closeNotification = this.closeNotification.bind(this);
      // this.handleRequestSort = this.handleRequestSort.bind(this);
      // this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
     // this.editClicked = this.editClicked.bind(this);
      // this.handleClick = this.handleClick.bind(this);
      // this.handleChangePage = this.handleChangePage(this);
      // this.handleChangeRowsPerPage = this.handleChangeRowsPerPage(this);
      // this.handleChangeDense = this.handleChangeDense(this);
      
  
      
    }
    closeNotification = ()=>{
      this.setState({
        isOpen : false,
      })
    }
  
    deleteItem = (id, btntext)=>{
      this.setState({
        dialogIsOpen : true, 
        title : "Are you sure  you want to delete it", 
        subTitle: "You cannot undo this operation once done.",
        itemID : id,
        btnText : btntext
      })

    }

    closeNotification = ()=>{
      this.setState({
        isOpen : false,
      })
    }


    onRowDelete = ( id, btntext )=>{
      //console.log("Btn Clicked" + btntext);
      this.setState({
        Checkstatus: 1,
      });

      this.setState({
        dialogIsOpen : false, 
   
      })
      
      axios
      .post(process.env.REACT_APP_API + "/item/activelisting/" + this.state.itemID + "/" + btntext)
      .then((res) => {
       
        this.setState({
          isOpen : true,
          message: " Item Successfully Deleted", 
          type : "error"
        })
        
      })
      .catch((err) => console.log(err));

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



showItemList = () => {
		axios
			.get(process.env.REACT_APP_API + "/item/store/"+userInfo.UserID  )   //userInfo.UserID)
			.then((res) => {

				
        this.setState({
          rows: res.data
        })


			})
			.catch((err) => console.log(err));
	};



  componentDidMount() {
    this.showItemList();
  
  }

  componentDidUpdate(prePro, preState) {
		if (preState.status !== this.state.status) {
			this.showItemList();
			this.setState({
				status: 0,
			});
		}
	}

   handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = this.state.rows.map((n) => n.name);
      // setSelected(newSelecteds);
      this.setState({
         selected : newSelecteds
      })
      return;
    }
    // setSelected([]);
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
    //  console.log("Pages "+newPage);
    //  console.log("Pages--------2 "+ event.target.value)
    this.setState({
      page: newPage,
    
    });
  };

   handleChangeRowsPerPage = (event) => {
     this.setState({
        //  rowsPerPage : 10,   //parseInt(event.target.value, 10),
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
  
  

  
   render() {
    const isSelected = (name) => this.state.selected.indexOf(name) !== -1;

    const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.rows.length - this.state.page * this.state.rowsPerPage);
    var deleteBtnText = "Delete";
    const { classes } = this.props;
    let { editData, createItem, openEntry, listOpen } = this.state;
    
  return (

    <GridContainer>
    <GridItem hidden={listOpen} xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Simple Table</h4>
          <p className={classes.cardCategoryWhite}>
            Here is a subtitle for this table
          </p>
        </CardHeader>
        <CardBody>
         
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar  onClick={()=>   this.setState({   openEntry: true,
										listOpen: true,
										createItem: false, })} numSelected={this.state.selected.length} />
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
                     // onClick={(event) => handleClick(event, row.name)}
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


                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.CatName}
                      </TableCell>
                      <TableCell align="right">{row.SubCatName}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.itemDescription}</TableCell>
                      <TableCell align="right">{row.isActive}</TableCell>
                      {/* <TableCell align="right">{this.state.editData}</TableCell> */}
                      <TableCell align="center">
                      {/* onClick={(event) => editClicked(event, row)} */}
                      {/* onClick={getChildData(row)}  */}
            <ActionButton  onClick={() =>
									this.setState({
										
									
                    
                    openEntry: true,
										listOpen: true,
										createItem: false,
										editData: row,
									})

								}
  color = "primary"> <EditOutlined fontSize="small"/> </ActionButton>

            <ActionButton onClick={ () => {this.deleteItem(row._id, deleteBtnText)}} color = "secondary"> <CloseIcon fontSize="small"/> </ActionButton>
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
          rowsPerPageOptions={[5,10, 15, 20,25]}
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

    {/* <GridItem  xs={12} sm={12} md={12} >
      <div>
      <p>Hello World</p>
    
              <p>{editData.title}</p>
              <p>{openEntry}</p>
              <p>{listOpen}</p>
              <p>{createItem}</p>

      </div>


</GridItem> */}

  

{openEntry && (
<GridItem hidden={createItem}  xs={12} sm={12} md={8} >

  <ItemEntry editData={editData} listOpen={listOpen}  
                    //  onClick={() =>
                    // this.setState({
                    //   openEntry: false,
                    //   listOpen: false,
                    //   createItem: true,
                     
                    // })
                  // }   
                  />

</GridItem>
)}

<GridItem hidden={createItem}   xs={12} sm={12} md={4}>
          {/* <GridItem hidden={openEntry}  xs={12} sm={12} md={4}> */}
            <Card profile>
              {/* <CardAvatar profile>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar> */}
              <CardBody profile>
                <h6 className={classes.cardCategory}> Notice </h6>
                <h4 className={classes.cardTitle}>PETEXO</h4>
                <p className={classes.description}>
                  It is to inform you that you can post 3 listings for now.
                  If you want to post more please upgrade your membership.
                </p>
                  <popup/>

                <Button
                  color="primary"
                  round
                 

                  onClick={() =>
                    this.setState({
                      openEntry: false,
                      listOpen: false,
                      createItem: true,
                      editData : {}
                    })
                  }
                >
                  Show Items List  
                
                </Button>
              </CardBody>
            </Card>
          </GridItem>
          <Notification closeNotifi={this.closeNotification}  isOpen={this.state.isOpen} message={this.state.message} type={this.state.type} />

<ConfirmDialog onRowClick={this.handleRowClick } deleteClick={()=>{this.onRowDelete("id", deleteBtnText)}} dialogIsOpen={this.state.dialogIsOpen} title={this.state.title} subTitle={this.state.subTitle}/>
       
  </GridContainer>







  );
              }
}


Itemlist.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Itemlist);