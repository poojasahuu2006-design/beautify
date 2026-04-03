import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import classes from './Shop.module.css';
import { Sparkles, ArrowDown, Loader2 } from 'lucide-react';

const Shop = () => {
    const { searchQuery } = useShop();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
                const data = await res.json();

                // Map the data to our app's product structure, filtering badly populated results
                const validProducts = data
                    .filter(item => item.price && item.price !== "0.0" && item.image_link)
                    .map(item => ({
                        id: item.id,
                        name: item.name,
                        brand: item.brand ? item.brand.toUpperCase() : 'BOUTIQUE',
                        price: parseFloat(item.price),
                        category: item.product_type ? item.product_type.replace(/_/g, ' ').toUpperCase() : 'BEAUTY',
                        image: item.api_featured_image || item.image_link,
                        description: item.description ? item.description.substring(0, 100) + '...' : ''
                    }));

                setProducts(validProducts);
            } catch (err) {
                console.error("Failed fetching makeup products", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on search query
    const filteredProducts = products.filter(product => {
        if (!searchQuery) return true;
        const lowerQuery = searchQuery.toLowerCase();
        return (product.name && product.name.toLowerCase().includes(lowerQuery)) || 
               (product.category && product.category.toLowerCase().includes(lowerQuery)) ||
               (product.brand && product.brand.toLowerCase().includes(lowerQuery));
    });

    // Group filtered products by category logically
    const categories = filteredProducts.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    const scrollToCategories = () => {
        const el = document.getElementById('shop-collections');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={classes.shopContainer}>
            {/* Hero Section */}
            <section className={classes.hero}>
                <div className={classes.heroContent}>
                    <div className={classes.badge}>
                        <Sparkles size={16} /> New Arrivals
                    </div>
                    <h1 className={classes.heroTitle}>Discover Your <br /> Natural Elegance</h1>
                    <p className={classes.heroSubtitle}>
                        Explore our newly curated collection of luxurious lipsticks,
                        mesmerizing eyeshadows, and radiant skincare.
                    </p>
                    <button className={`btn-primary ${classes.exploreBtn}`} onClick={scrollToCategories}>
                        Explore Collection
                    </button>
                </div>
                <div className={classes.scrollIndicator} onClick={scrollToCategories}>
                    <ArrowDown size={24} />
                </div>
            </section>

            {/* Categories */}
            <div id="shop-collections" className={classes.collectionsWrapper}>
                {loading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', color: 'var(--text-secondary)' }}>
                        <Loader2 className="animate-spin" size={48} style={{ marginBottom: '16px' }} />
                        <h2 style={{ fontFamily: 'Playfair Display', fontStyle: 'italic' }}>Curating our latest luxury catalog...</h2>
                    </div>
                ) : Object.keys(categories).length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-secondary)' }}>
                        <h2 style={{ fontFamily: 'Playfair Display', marginBottom: '16px' }}>No products found matching "{searchQuery}"</h2>
                        <p>Try searching for "lipliner", "lipstick", or specific brands.</p>
                    </div>
                ) : (
                    Object.keys(categories).map((category, index) => (
                        <section key={category} className={`${classes.categorySection} animate-fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className={classes.categoryHeader}>
                                <h2 className={classes.categoryTitle}>{category}</h2>
                                <div className={classes.decoratorLine}></div>
                            </div>

                            <div className="products-grid">
                                {categories[category].slice(0, 12).map((product, idx) => (
                                    <ProductCard key={product.id} product={product} index={idx} />
                                ))}
                            </div>
                        </section>
                    ))
                )}
            </div>
        </div>
    );
};

export default Shop;
