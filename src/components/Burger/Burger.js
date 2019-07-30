import React from 'react';

import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    //Input is from burgerbuilder is in object format
    //Needs to be converted into an array

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                //Creating an array object where props.ingredients[igKey] is length
                    //since props.ingredients[igKey] is number on that key
                //Map function is used to return
                    //If array has space of two, this would go off twice
                //Underscore _ is to indicate blank
                
                //console.log("Igkey:" + igKey)
                //console.log("props.ingredients[igKey]:\n" + props.ingredients[igKey])
                
                return <BurgerIngredient key={igKey + i} type={igKey} />
                
                //Giving key cause good pracice
                    //Creates unique key or each ingredient

            }); 
        })
        .reduce((arr, el) => {
            console.log(arr)
            return arr.concat(el) //Returns value to second arguement of reduce
        }, []); //Allows  to transform an array to something else 
    //Default javascript object script
    //Extract keys from object into array type
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
                {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;