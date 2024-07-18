import Link from 'next/link';

interface IProduct {
  id: string;
  name: string;
  image: string;
  price: string;
  description: string;
}

interface FeaturedProductsProps {
  products: IProduct[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  return (
    <div className="product-grid">
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
      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          margin: 20px;
          width: 100%;
          max-width: 1200px;
        }
        .product-card {
          display: flex;
          flex-direction: column;
          border: 1px solid #444; /* Bordas mais escuras */
          border-radius: 8px;
          overflow: hidden;
          text-align: left;
          text-decoration: none;
          color: #fff; /* Texto branco */
          transition: transform 0.2s;
          padding: 10px;
          box-sizing: border-box;
          background: #000; /* Fundo preto */
        }
        .product-card:hover {
          transform: scale(1.05);
        }
        .product-card img {
          width: 100%;
          height: auto;
          border-bottom: 1px solid #444; /* Bordas mais escuras */
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
        .product-details .price {
          color: #0070f3;
          font-size: 1.1em;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default FeaturedProducts;
