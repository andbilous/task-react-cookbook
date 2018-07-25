import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = (props) => { 
        return(
            <div className='Navbar'>
                <Link to='/recipes'>Рецепти</Link>
                <Link to='/search'>Пошук</Link>
            </div>
        )
}

export default Navbar;