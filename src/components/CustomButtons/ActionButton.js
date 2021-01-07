// const { readConfigFile } = require("typescript");

import { Button, makeStyles } from '@material-ui/core';
import React from 'react'  

const useStyles = makeStyles(theme=>({
    root:{
        minWidth:0,
        margin: theme.spacing(0.5)
    },
    secondary : {
        backgroundColor : "#eb3434",   //theme.palette.secondary.light,
        '& .MuiButton-label':{
            color: "#0d0d0d"  ,   //theme.palette.secondary.main,
        }

    },
    primary : {
        backgroundColor : "#07a309", //theme.palette.primary.light,
        '& .MuiButton-label':{
            color: "#0d0d0d", //theme.palette.primary.main,
        }
        
    }
}) )

export default function ActionButton ( props){
    const{ color, children, onClick} = props;
const classes = useStyles();
    return (
        <di>
<Button onClick={onClick} 
className = {`${classes.root} ${classes[color]}`}
>
                    
    {children}
</Button>
        </di>
    )
}