import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { addRecipe, editRecipe } from '../../actions/recipesAction';

import './RecipeForm.css';


class RecipeForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            recipe: '',
            errors: {
                nameIsValid: true,
                recipeIsValid: true
            },
            edit: false
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;

        if   (id && this.props.recipes[id]){
            const recipe = this.props.recipes[id];
            
                
            this.setState({
                name: recipe.name,
                recipe: recipe.recipe,
                edit: true
            }); 
        }
        } ;
    validationForm()
    {
        const state = this.state.errors;
        
        for(let key in state){
            state[key] = true
        }
        
        if(this.state.name === ''){
            state.nameIsValid = false;
        }

        if(this.state.recipe === ''){
            state.recipeIsValid = false;
        }

        this.setState(state);

        if(this.state.errors.nameIsValid && this.state.errors.recipeIsValid /* && this.state.errors.recipeIngredientsIsValid */ ){
            return true;
        } else{
            return false;
        }

    }

    handleFormSubmit(e)
    {
        e.preventDefault();

        const obj = {
            name: this.state.name,
            recipe: this.state.recipe
        }
        
        
        if(this.validationForm()){
            const id = this.props.match.params.id;
            if(id && this.props.recipes[id]){
                this.props.editRecipe({
                    ...obj,
                    id
                });
                this.props.history.push('/recipes');
            } else{
                this.props.addRecipe(obj);
                this.props.history.push('/recipes');
            }

        }
        
    }

    onInputChange(e)
    {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        const state = this.state.errors;

        state[`${name}IsValid`] = true;

        this.setState({
            [name]: value,
            state
        });
    }
    render()
    {
        return(
            <div className='column RecipeForm'>
                <Link to='/recipes'>Назад</Link>
                <div>
                    <form onSubmit={ this.handleFormSubmit.bind(this) } >
                        <label htmlFor='name' className={ this.state.errors.nameIsValid ? '' : 'input--error' } >Назва</label>
                        <input type='text' name='name' value={this.state.name} id='name' onChange={ this.onInputChange.bind(this) } className={ this.state.errors.nameIsValid ? '' : 'input--error' } />
                        <label htmlFor='recipe' className={ this.state.errors.recipeIsValid ? '' : 'input--error' } >Рецепт</label>
                        <textarea type='text' name='recipe' value={this.state.recipe} id='recipe' onChange={ this.onInputChange.bind(this) } className={ this.state.errors.recipeIsValid ? '' : 'input--error' } />
                        <hr/>
                        <button type='submit'>{ this.state.edit ? 'Редагувати' : 'Додати рецепт' }</button>
                    </form>
                    <ul>
                    </ul>
                </div>
            </div>
        )
    }
}

RecipeForm.propTypes = {
    recipes: PropTypes.object.isRequired,
    addRecipe: PropTypes.func.isRequired,
    editRecipe: PropTypes.func.isRequired
}

function mapStateToProps({ ingredients, recipes }){
    return { 
        recipes
    }
}

export default connect(mapStateToProps, { addRecipe, editRecipe })(RecipeForm);