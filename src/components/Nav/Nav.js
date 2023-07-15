import { NavLink } from 'react-router-dom';
import './Nav.scss';

function Nav({ listTo }) {
    return (
        <>
            <div className="nav">
                {listTo.map((to, index) => (
                    <NavLink
                        key={index}
                        to={to.to}
                        className={(navData) => (navData.isActive ? 'nav-item-active nav-item' : 'none nav-item')}
                    >
                        {to.text}
                    </NavLink>
                ))}
            </div>
        </>
    );
}

export default Nav;
