import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, Home, LogOut, Search } from 'lucide-react';
import classes from './Navbar.module.css';

const Navbar = () => {
    const { cart, wishlist, logout, searchQuery, setSearchQuery } = useShop();
    const location = useLocation();

    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className={`glass-panel ${classes.navbar}`}>
            <div className={classes.navContainer}>
                <div className={classes.logo}>
                    <Link to="/">
                        <img src="/logo.png" alt="Beautify Logo" className={classes.brandLogo} />
                        <span className={classes.brandName}>Beautify</span>
                    </Link>
                </div>

                <div className={classes.searchContainer}>
                    <Search className={classes.searchIcon} size={20} />
                    <input 
                        type="text" 
                        placeholder="Search for lipliner, lipstick..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={classes.searchInput}
                    />
                </div>

                <div className={classes.navLinks}>
                    <Link to="/" className={location.pathname === '/' ? classes.active : ''}>
                        <div className={classes.iconWrapper}>
                            <Home size={28} />
                            <span className={classes.iconLabel}>Shop</span>
                        </div>
                    </Link>
                    <Link to="/wishlist" className={location.pathname === '/wishlist' ? classes.active : ''}>
                        <div className={classes.iconWrapper}>
                            <Heart size={28} />
                            <span className={classes.iconLabel}>Wishlist</span>
                            {wishlist.length > 0 && (
                                <span className={classes.badge}>{wishlist.length}</span>
                            )}
                        </div>
                    </Link>
                    <Link to="/cart" className={location.pathname === '/cart' ? classes.active : ''}>
                        <div className={classes.iconWrapper}>
                            <ShoppingBag size={28} />
                            <span className={classes.iconLabel}>Cart</span>
                            {cartItemCount > 0 && (
                                <span className={classes.badge}>{cartItemCount}</span>
                            )}
                        </div>
                    </Link>
                    <button onClick={logout} className={classes.logoutBtn} aria-label="Logout">
                        <div className={classes.iconWrapper}>
                            <LogOut size={28} />
                            <span className={classes.iconLabel}>Logout</span>
                        </div>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
