"use client";

import { useEffect, useState } from 'react';
import { ViewLayout } from "@/layout/view-layout";
import PopularCategories from '@/components/PopularCategories';
import FeaturedProducts from '@/components/FeaturedProducts';
import PopularProducts from '@/components/PopularProducts';

interface ICategory {
  id: string;
  name: string;
  image: string;
}

interface IProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  featured: boolean;
  popularity: number;
  description: string;
  price: string;
}

const initialCategories: ICategory[] = [
  { id: '1', name: 'Valorant', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfv5rCIOyHEXMunVyqKPX-1sq3XJdqONkzkw&s' },
  { id: '2', name: 'Clash of Clans', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfv5rCIOyHEXMunVyqKPX-1sq3XJdqONkzkw&s' },
  { id: '3', name: 'Fortnite', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfv5rCIOyHEXMunVyqKPX-1sq3XJdqONkzkw&s' },
  { id: '4', name: 'Apex Legends', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfv5rCIOyHEXMunVyqKPX-1sq3XJdqONkzkw&s' },
  { id: '5', name: 'Free Fire', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfv5rCIOyHEXMunVyqKPX-1sq3XJdqONkzkw&s' },
  { id: '6', name: 'Roblox', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfv5rCIOyHEXMunVyqKPX-1sq3XJdqONkzkw&s' }
];

const initialProducts: IProduct[] = [
  { id: '1', name: 'Valorant Points', category: 'Valorant', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfv5rCIOyHEXMunVyqKPX-1sq3XJdqONkzkw&s', featured: true, popularity: 95, description: 'Points for Valorant', price: 'R$9,99' },
  { id: '2', name: 'Clash of Clans Gems', category: 'Clash of Clans', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfv5rCIOyHEXMunVyqKPX-1sq3XJdqONkzkw&s', featured: true, popularity: 90, description: 'Gems for Clash of Clans', price: 'R$4,99' },
  { id: '3', name: 'Fortnite V-Bucks', category: 'Fortnite', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfv5rCIOyHEXMunVyqKPX-1sq3XJdqONkzkw&s', featured: true, popularity: 85, description: 'V-Bucks for Fortnite', price: 'R$19,99' },
  { id: '4', name: 'Apex Coins', category: 'Apex Legends', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfv5rCIOyHEXMunVyqKPX-1sq3XJdqONkzkw&s', featured: false, popularity: 80, description: 'Coins for Apex Legends', price: 'R$9,99' },
  { id: '5', name: 'Free Fire Diamonds', category: 'Free Fire', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfv5rCIOyHEXMunVyqKPX-1sq3XJdqONkzkw&s', featured: false, popularity: 75, description: 'Diamonds for Free Fire', price: 'R$14,99' },
  { id: '6', name: 'Roblox Robux', category: 'Roblox', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfv5rCIOyHEXMunVyqKPX-1sq3XJdqONkzkw&s', featured: false, popularity: 70, description: 'Robux for Roblox', price: 'R$9,99' }
];

export default function MarketplacePage() {
  const [popularCategories, setPopularCategories] = useState<ICategory[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);
  const [popularProducts, setPopularProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    // Simulate data loading
    setPopularCategories(initialCategories);
    setFeaturedProducts(initialProducts.filter(product => product.featured));
    setPopularProducts(initialProducts.sort((a, b) => b.popularity - a.popularity));
  }, []);

  return (
    <ViewLayout disableHistoryRoute itemActive="marketplace">
      <div className="container">
        <h1 className="marketplace-title">Marketplace</h1>
        <h2 className="category-header">Categorias Populares</h2>
        <PopularCategories categories={popularCategories} />
        <h2 className="category-header">Produtos em Destaque</h2>
        <FeaturedProducts products={featuredProducts} />
        <h2 className="category-header">Produtos Mais Populares</h2>
        <PopularProducts products={popularProducts} />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center; /* Centraliza o conteúdo horizontalmente */
          justify-content: center; /* Centraliza o conteúdo verticalmente */
          width: 100%;
        }
        .marketplace-title {
          font-size: 2em;
          margin: 20px 0;
          text-align: center;
          color: #fff;
        }
        .category-header {
          width: 100%;
          text-align: left;
          padding: 20px 0 10px 20px;
          background: transparent;
          margin-top: 20px;
          font-size: 1.5em;
          color: #fff;
        }
      `}</style>
    </ViewLayout>
  );
}
