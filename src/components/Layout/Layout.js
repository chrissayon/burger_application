import React from 'react';

import classes from './Layout.module.css'

const Layout = (props) => (
    <React.Fragment>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
        <div>Build Controls</div>
    </React.Fragment>
);

export default Layout;