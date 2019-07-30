import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 1
        }
    }

    render () {
        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients} />        
                <BuildControls />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;