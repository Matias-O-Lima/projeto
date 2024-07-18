import React from 'react';

interface ICategory {
  id: string;
  name: string;
  image: string;
}

interface PopularCategoriesProps {
  categories: ICategory[];
}

const PopularCategories: React.FC<PopularCategoriesProps> = ({ categories }) => {
  return (
    <div className="category-grid">
      {categories.map(category => (
        <div key={category.id} className="category-card">
          <img src={category.image} alt={category.name} />
          <h3>{category.name}</h3>
        </div>
      ))}
      <style jsx>{`
        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Aumentado o tamanho mínimo */
          gap: 16px;
          width: 100%;
        }
        .category-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .category-card img {
          width: 150px; /* Aumentado o tamanho da imagem */
          height: 150px; /* Aumentado o tamanho da imagem */
          object-fit: cover;
          border-radius: 50%;
          margin-bottom: 10px;
        }
        .category-card h3 {
          margin: 0;
          font-size: 1.2em; /* Aumentado o tamanho da fonte */
        }
      `}</style>
    </div>
  );
};

export default PopularCategories;
