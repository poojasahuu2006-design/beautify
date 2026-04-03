import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, CheckCircle } from 'lucide-react';
import classes from './Cart.module.css';

const Cart = () => {
    const { cart, removeFromCart, clearCart } = useShop();
    const [isConfirmed, setIsConfirmed] = useState(false);

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 15;
    const total = subtotal + (cart.length > 0 ? shipping : 0);

    const handleCheckout = () => {
        // Simulate order processing
        setIsConfirmed(true);
        clearCart();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isConfirmed) {
        return (
            <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
                <div className={classes.confirmationCard}>
                    <CheckCircle size={80} color="var(--primary-color)" className={classes.checkIcon} />
                    <h1 className={classes.confirmTitle}>Your Order is Confirmed!</h1>
                    <p className={classes.confirmSubtitle}>
                        Thank you for shopping with Beautify. We've sent a confirmation email with your order details.
                    </p>
                    <div className={classes.orderInfo}>
                        <p><strong>Order Number:</strong> #BEAU-{Math.floor(1000 + Math.random() * 9000)}</p>
                        <p><strong>Estimated Delivery:</strong> 3-5 Business Days</p>
                    </div>
                    <Link to="/" className={`btn-primary ${classes.continueShoppingBtn}`}>
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="animate-fade-in">
                <h1 className="page-title">Your Bag</h1>
                <p className="page-subtitle">Review your items before checkout.</p>
            </div>

            {cart.length === 0 ? (
                <div className={classes.emptyCart}>
                    <ShoppingBag size={64} style={{ marginBottom: '24px', opacity: 0.5, color: 'var(--text-secondary)' }} />
                    <h2>Your bag is currently empty</h2>
                    <p>Discover our beautiful collection to find something you love.</p>
                    <Link to="/" className="btn-primary" style={{ marginTop: '24px', display: 'inline-block' }}>Continue Shopping</Link>
                </div>
            ) : (
                <div className={classes.cartContainer}>
                    <div className={classes.itemsSection}>
                        {cart.map((item, index) => (
                            <div
                                key={item.id}
                                className={`${classes.cartItem} animate-fade-in`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <img src={item.image} alt={item.name} className={classes.itemImage} />
                                <div className={classes.itemDetails}>
                                    <h3>{item.name}</h3>
                                    <p className={classes.price}>${item.price.toFixed(2)}</p>
                                    <p className={classes.quantity}>Qty: {item.quantity}</p>
                                </div>
                                <button
                                    className={classes.removeBtn}
                                    onClick={() => removeFromCart(item.id)}
                                    aria-label="Remove item"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className={`${classes.summarySection} animate-fade-in`} style={{ animationDelay: '0.3s' }}>
                        <div className={classes.summaryCard}>
                            <h3>Order Summary</h3>

                            <div className={classes.summaryRow}>
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            <div className={classes.summaryRow}>
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>

                            {shipping > 0 && (
                                <div className={classes.shippingNotice}>
                                    Spend ${(100 - subtotal).toFixed(2)} more for free shipping!
                                </div>
                            )}

                            <div className={`${classes.summaryRow} ${classes.totalRow}`}>
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            <button
                                className={`btn-primary ${classes.checkoutBtn}`}
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
