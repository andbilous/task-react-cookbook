import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ResipesList from '../RecipesList/RecipesList';

import './Recipes.css';

class Recipes extends Component{ 
    render(){
        return(
            <div className='column recipes'>
                <Link to='/recipes/add'>Додати рецепт</Link>
                <ResipesList />
            </div>
        )
    }
}

export default Recipes;