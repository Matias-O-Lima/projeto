import Link from 'next/link';

interface IProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  price: string;
}

interface PopularProductsProps {
  products: IProduct[];
}

const PopularProducts: React.FC<PopularProductsProps> = ({ products }) => {
  return (
    <div className="popular-products">
      <div className="products-grid">
        {products.map(product => (
          <Link key={product.id} href={`/product/${product.id}`} legacyBehavior>
            <a className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-details">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p className="price">{product.price}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .section-title {
          font-size: 1.5em;
          margin: 20px 0;
          text-align: center;
          color: #fff;
        }
        .popular-products {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .products-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center; /* Centraliza os itens horizontalmente */
        }
        .product-card {
          background: #000; /* Fundo preto */
          border: 1px solid #444; /* Bordas mais escuras */
          border-radius: 8px;
          overflow: hidden;
          text-align: center;
          transition: transform 0.2s ease;
          text-decoration: none;
          color: #fff; /* Texto branco */
          width: 200px; /* Largura fixa para cada cartão */
        }
        .product-card:hover {
          transform: scale(1.05);
        }
        .product-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .product-details {
          padding: 10px;
        }
        .product-details h2 {
          margin: 10px 0;
          font-size: 1.2em;
        }
        .product-details p {
          margin: 5px 0;
        }
        .price {
          color: #0070f3;
          font-size: 1.2em;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default PopularProducts;
