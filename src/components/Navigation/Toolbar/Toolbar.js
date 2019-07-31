import React from 'react'

import classes from './Toolbar.module.css'

const toolbar = (props) => ( //<Header> is normally for beginnign of navigation components
    <header className={classes.Toolbar}> 
        <div>MENU</div>
        <div>LOGO</div>
        <nav>
            ...
        </nav>
    </header>
);

export default toolbar;