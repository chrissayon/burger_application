import React from 'react';

import classes from './BuildControl.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
]; //Used as a shortcut to build controls

const buildControls = (props) => (
    <div className={classes.BuildControl}>
        {controls.map(ctrl => (
            <BuildControl key={ctrl.label} label={ctrl.label} />
        ))}

    </div>
);

export default buildControls