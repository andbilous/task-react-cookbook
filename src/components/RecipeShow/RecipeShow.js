import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './RecipeShow.css';

class RecipeShow extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            recipe: ''
        }
    }

    componentDidMount(){
        this.setState({
            name: this.props.recipe.name,
            recipe: this.props.recipe.recipe
        });
    }
    render(){
        return(
            <div className='column RecipeShow'>
                <Link to='/recipes'>Назад</Link>
                <h2>{ this.state.name }</h2>
                <h3>Рецепт</h3>
                <p>{ this.state.recipe }</p>
            </div>
        )
    }
}

RecipeShow.propTypes = {
    recipe: PropTypes.object.isRequired,
    ingredients: PropTypes.object.isRequired
}

function mapStateToProps({ recipes, ingredients }, ownProps){
    return { 
        recipe: recipes[ownProps.match.params.id],
        ingredients
    }
}

export default connect(mapStateToProps)(RecipeShow);