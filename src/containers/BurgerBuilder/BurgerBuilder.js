import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

//Global variables usually all caps
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
};

class BurgerBuilder extends Component{
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false, //For the order button disable
        purchasing: false,
        loading: false,
        error: null
    }

    //If method is triggered through event, this won't work properly
    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    //Update purchase
    updatePurchaseState (ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);

            this.setState({purchaseable: sum > 0 })
            
            //Obtain sum of all ingedients, if 0 then you order button unselectable
    }

    //Handler for ingredients on button press
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type] //grab amount of ingredients
        const updatedCount = oldCount + 1; //increase amount of ingredients by 1

        //split ingredients to object
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount; //Increase amount of that ingredient by 1
        //updatedIngredients[type] selects the salad,bacon or w/e, and you add one to that count
        
        //Adds price
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        //Set state
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type] //grab amount of ingredients
        
        if (oldCount <= 0) { //if no items, stop
            return;
        }
        
        const updatedCount = oldCount - 1; //decrease amount of ingredients by 1

        //split ingredients to object
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount; //decrease amount of that ingredient by 1
        //updatedIngredients[type] selects the salad,bacon or w/e, and you add one to that count
        
        //Subtract price
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;

        //Set state
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseContinueHandler = () => {
        this.setState( {loading:true})

        // alert('You continue!');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Chris',
                address: {
                    street: "123 tests street",
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        
        axios.post('/orders.json', order)
            .then(response => 
                this.setState({loading:false, purchasing:false}))
            .catch(error => 
                this.setState({loading:false}));
    
    }

    componentDidMount () { //You can use constructor in component object will work too
        axios.get('https://react-my-burger-2d38e.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients:response.data})
            })
            .catch(error => {
                this.setState({error:true})
            });
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        //console.log(disabledInfo)
        
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        //Ridikulous
        let orderSummary = null
        
        let burger = this.state.error? <p>Ingredients can't be loaded</p> : <Spinner />
         
        if (this.state.ingredients) {
            burger = (
            <React.Fragment>
                <Burger
                ingredients={this.state.ingredients} />        
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo} //For disabling button
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler} />
            </React.Fragment>)

            orderSummary = ( <OrderSummary
            totalPrice={this.state.totalPrice} 
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} 
            ingredients={this.state.ingredients}/> );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

       

        return (
            <React.Fragment>
                <Modal //For the summary page
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                    >
                { orderSummary }
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);