import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';


const Header = () => {

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

    return (
        <header className="p-3 ">
          <div className="header flex-row">
            <nav className="navbar">
              <div className='title'>
                <Link to="/">
                  <h1>Magic The Gathering</h1>
                  </Link>
              </div>
             <div className="navLinks">
                  {Auth.loggedIn() ? (
                    <>
                  <Link to="/profile">Me</Link>
                  <a href="/" onClick={logout}>
                    Logout
                  </a>
                </>
                  ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Signup</Link>
                </>
              )}
             </div>
            </nav>
          </div>
        </header>
          

         
            
    );
};

export default Header;
