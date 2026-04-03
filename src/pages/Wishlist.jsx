import React from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Wishlist = () => {
    const { wishlist } = useShop();

    return (
        <div className="page-container">
            <div className="animate-fade-in">
                <h1 className="page-title">Your Wishlist</h1>
                <p className="page-subtitle">Styles and essentials you've saved for later.</p>
            </div>

            {wishlist.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '60px', padding: '60px', background: 'white', borderRadius: '16px' }} className="animate-fade-in shadow-sm">
                    <Heart size={64} color="var(--text-secondary)" strokeWidth={1} style={{ marginBottom: '24px', opacity: 0.5 }} />
                    <h2 style={{ marginBottom: '16px' }}>Your wishlist is empty</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Save items you love and they will appear here.</p>
                    <Link to="/" className="btn-primary">Explore Products</Link>
                </div>
            ) : (
                <div className="products-grid">
                    {wishlist.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
