import { Link, Outlet } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as LLKlogo } from '../../assets/Logomark_pink_adobe_express.svg';
import './navigation.styles.scss';

const Navigation = () => {
    return(
        <Fragment>
            <div className="navigation">
                
                <Link className="logo-container" to='/'>
                    <LLKlogo className="logo"/>
                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                </div> 
                
                <div className="nav-links-container">
                    <Link className="nav-link" to='/auth'>
                       Sign in
                    </Link>
                </div>
                
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;