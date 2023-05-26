import React from 'react';
import Header from './Header';
import './Layout.scss'
import Footer from './Footer';

const Layout = (props) => {
    return(
        <div className='app'>
        <div className='header'> <Header/></div>
           
            <div className='app-wrapper'>
                <div className='app-body'>
                    {props.children}
                </div>
            </div>
            {/* <div className='footer'> <Footer/></div> */}
           
        </div>
    )
}
export default Layout;