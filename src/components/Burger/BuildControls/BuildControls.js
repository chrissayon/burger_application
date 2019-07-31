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
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                added={() => props.ingredientAdded(ctrl.type)} //handler
                removed={() => props.ingredientRemoved(ctrl.type)}
                key={ctrl.label} 
                label={ctrl.label} 
                disabled={props.disabled[ctrl.type]}
                />
        ))}
        <button className={classes.OrderButton}
                disabled={!props.purchaseable}>Order Now </button>
    </div>
);

export default buildControls