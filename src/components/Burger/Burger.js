import React from 'react';

import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    //Input is from burgerbuilder is in object format
    //Needs to be converted into an array

    const transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                //console.log("Igkey:" + igKey)
                //console.log("props.ingredients[igKey]:\n" + props.ingredients[igKey])
                
                return <BurgerIngredient key={igKey + i} type={igKey} />
                
                //Create array with only two elements
                //Underscore _ is to indicate blank
                //Giving key cause good pracice
            }); 
        }); 
    //Default javascript object script
    //Extract keys from object into array type

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
                {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;