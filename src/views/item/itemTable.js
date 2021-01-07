import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

import ActionButton from "components/CustomButtons/ActionButton.js";
import CloseIcon from "@material-ui/icons/Close";
import { EditOutlined } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function ItemTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

        ) : null}



      
{tableData.length !== 0 ? (
        <TableBody>
  
          {tableData.map((row) => {
            return (
              <TableRow key={row.name} className={classes.tableBodyRow}>
               
               <TableCell component="th" scope="row">
                {row.CatName}
              </TableCell>
              <TableCell align="left">{row.SubCatName}</TableCell>
              <TableCell align="right">{row.title}</TableCell>
           
              <TableCell align="right">{row.itemDescription}</TableCell>
             
              <TableCell align="Center">
              <ActionButton color = "primary"> <CloseIcon fontSize="small"/> </ActionButton>
            <ActionButton color = "secondary"> <EditOutlined fontSize="small"/> </ActionButton>

            
              
              </TableCell>

              


              </TableRow>
            );
          })}
        
        </TableBody>
 ) : null}


      </Table>
    </div>
  );
}

ItemTable.defaultProps = {
  tableHeaderColor: "gray"
};

ItemTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
 
};
