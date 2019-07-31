import React from 'react'

import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'

const toolbar = (props) => ( //<Header> is normally for beginnign of navigation components
    <header className={classes.Toolbar}> 
        <div>MENU</div>
        <Logo />
        <nav>
            ...
        </nav>
    </header>
);

export default toolbar;