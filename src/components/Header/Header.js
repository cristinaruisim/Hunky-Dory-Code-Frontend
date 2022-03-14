import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useState } from 'react';
import logo from "../assets/logo-fondo-blanco.png"



const Header = () => {
    const classes = useStyles();
     const [show, setShow] = useState(false);

     const hideHeader = ()=> {
         if (window.scrollY > 100) {
            setShow(true)
             
         }else {
             setShow(false)
         }
     }

     useEffect(()=>{
         window.addEventListener("scroll", hideHeader)
     },[])
     
  return (
    <AppBar position= "sticky" elevation={0} className={`${classes.root} ${show && classes.transparent}`}>
        <Toolbar  className={classes.toolbar}>
        <img src={ logo } alt="logo" className={classes.logo}/>
        
        </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles((theme) => ({
    root: {
        top:0,
        left: 0,
        right: 0,
        backgroundColor:"#FFCC",
        

    },
    transparent: {
        backgroundColor:"transparent"
    },

    toolbar:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
    },
    logo: {
          width: "120px",
          cursor:"pointer",
    },
  }));

export default Header;
