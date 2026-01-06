import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Category {
    id: number;
    name: string;
    imageUrl: string;
}

const Home: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get<Category[]>('/categories')
            .then(response => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-10">Loading categories...</div>;

    return (
        <div className="home-container">
            <div className="home-header">
                <h1 className="home-title">
                    Welcome to Growth Guide
                </h1>
                <p className="home-subtitle">
                    Select a category to start growing.
                </p>
            </div>

            <div className="category-grid">
                {categories.map(category => (
                    <Link key={category.id} to={`/category/${category.id}`} className="category-card">
                        <div className="category-image-container">
                            {/* Use ImageUrl if available, else placeholder */}
                            {category.imageUrl ? <img src={category.imageUrl} alt={category.name} className="category-image" /> : <span className="category-placeholder-icon">🌱</span>}
                        </div>
                        <div className="category-info">
                            <h3 className="category-name">
                                {category.name}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
