import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag } from 'lucide-react';
import classes from './ProductCard.module.css';

const ProductCard = ({ product, index }) => {
    const { addToCart, toggleWishlist, isInWishlist } = useShop();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const isWished = isInWishlist(product.id);

    return (
        <div
            className={`${classes.card} animate-fade-in`}
            style={{ animationDelay: `${index * 0.05}s` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={classes.imageContainer}>
                <img
                    src={product.image}
                    alt={product.name}
                    className={classes.image}
                    onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x500?text=Beauty+Product"; }}
                />

                <button
                    className={`${classes.wishlistBtn} ${isWished ? classes.wished : ''}`}
                    onClick={() => toggleWishlist(product)}
                    aria-label="Add to wishlist"
                >
                    <Heart
                        size={20}
                        fill={isWished ? 'var(--primary-color)' : 'none'}
                        color={isWished ? 'var(--primary-color)' : 'black'}
                        strokeWidth={2}
                    />
                </button>

                <div className={`${classes.actionsOverlay} ${isHovered ? classes.actionsVisible : ''}`}>
                    <button
                        className="btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                        onClick={() => {
                            addToCart(product);
                            navigate('/cart');
                        }}
                    >
                        <ShoppingBag size={18} />
                        Quick Add
                    </button>
                </div>
            </div>

            <div className={classes.productInfo}>
                {product.brand && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '1px', marginBottom: '6px' }}>
                        {product.brand}
                    </div>
                )}
                <div className={classes.titleRow}>
                    <h3 className={classes.title}>{product.name}</h3>
                    <span className={classes.price}>${product.price.toFixed(2)}</span>
                </div>
                <p className={classes.description}>{product.description}</p>
                <button
                    className={classes.mobileAddBtn}
                    onClick={() => {
                        addToCart(product);
                        navigate('/cart');
                    }}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
