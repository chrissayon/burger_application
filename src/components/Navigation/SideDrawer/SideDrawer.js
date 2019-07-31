import React from 'react';

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'

const sideDrawer = (props) => {
    //Conditionally attach classes so there will be animation
    return(
        <div className={classes.SideDrawer}>
            <Logo />
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
}

export default sideDrawer;