"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface IProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  price: string;
  detailedDescription: string;
  additionalImages: string[];
  availability: string;
  sales: number;
  points: number;
  type: string;
  createdDate: string;
  seller: {
    name: string;
    avatar: string;
    memberSince: string;
    positiveRatings: string;
    ratingCount: number;
    lastAccess: string;
  };
  verifications: {
    email: string;
    phone: string;
    documents: string;
  };
}

const initialProducts: IProduct[] = [
  {
    id: '1',
    name: 'Valorant Points',
    category: 'Valorant',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfv5rCIOyHEXMunVyqKPX-1sq3XJdqONkzkw&s',
    description: 'Points for Valorant',
    price: 'R$70,00',
    detailedDescription: 'Detailed description of Valorant Points.',
    additionalImages: [
      'https://m.media-amazon.com/images/I/81Z+V7GJIEL.png',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfv5rCIOyHEXMunVyqKPX-1sq3XJdqONkzkw&s',
      'https://m.media-amazon.com/images/I/81Z+V7GJIEL.png'
    ],
    availability: '1',
    sales: 0,
    points: 70,
    type: 'Item',
    createdDate: '18/07/24 00:52',
    seller: {
      name: 'Gabriel3371972',
      avatar: 'https://example.com/avatar.jpg',
      memberSince: '09/06/24',
      positiveRatings: '100%',
      ratingCount: 10,
      lastAccess: 'em uma hora',
    },
    verifications: {
      email: 'Verificado',
      phone: 'Verificado',
      documents: 'Verificado'
    }
  },
  {
    id: '2',
    name: 'Clash of Clans Gems',
    category: 'Clash of Clans',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfv5rCIOyHEXMunVyqKPX-1sq3XJdqONkzkw&s',
    description: 'Gems for Clash of Clans',
    price: 'R$50,00',
    detailedDescription: 'Detailed description of Clash of Clans Gems.',
    additionalImages: [
      'https://example.com/image3.jpg',
      'https://example.com/image4.jpg'
    ],
    availability: '5',
    sales: 10,
    points: 50,
    type: 'Item',
    createdDate: '18/07/24 01:00',
    seller: {
      name: 'JaneDoe123',
      avatar: 'https://example.com/avatar2.jpg',
      memberSince: '10/07/24',
      positiveRatings: '95%',
      ratingCount: 15,
      lastAccess: 'há 2 horas',
    },
    verifications: {
      email: 'Verificado',
      phone: 'Verificado',
      documents: 'Verificado'
    }
  },
  // Adicione mais produtos conforme necessário
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [mainImage, setMainImage] = useState<string>('');

  useEffect(() => {
    if (id) {
      const foundProduct = initialProducts.find(product => product.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setMainImage(foundProduct.image); // Inicializa a imagem principal
      }
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-header">
        <div className="product-images">
          <img className="main-image" src={mainImage} alt={product.name} />
          <div className="additional-images">
            {product.additionalImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} additional ${index + 1}`}
                onClick={() => setMainImage(image)} // Atualiza a imagem principal ao clicar
              />
            ))}
          </div>
        </div>
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="availability">DISPONÍVEL: {product.availability}</p>
          <p className="sales">VENDA: {product.sales}</p>
          <p className="points">Você ganha {product.points} GG Points</p>
          <p className="price">{product.price}</p>
          <select className="product-select">
            <option>Escolha um item</option>
            {/* Adicione opções conforme necessário */}
          </select>
          <button className="buy-button">COMPRAR</button>
        </div>
      </div>
      <div className="product-details">
        <h2>CARACTERÍSTICAS</h2>
        <p><strong>Tipo do Anúncio:</strong> {product.type}</p>
        <h2>DESCRIÇÃO DO ANÚNCIO</h2>
        <p>{product.detailedDescription}</p>
        <p><strong>CRIAÇÃO EM:</strong> {product.createdDate}</p>
      </div>
      <div className="seller-info">
        <h2>Vendedor</h2>
        <div className="seller-details">
          <img className="seller-avatar" src={product.seller.avatar} alt={product.seller.name} />
          <div className="seller-text">
            <p><strong>{product.seller.name}</strong> ({product.seller.ratingCount} avaliações)</p>
            <p>Membro desde: {product.seller.memberSince}</p>
            <p>Avaliações positivas: {product.seller.positiveRatings}</p>
            <p>Último acesso: {product.seller.lastAccess}</p>
          </div>
        </div>
        <h2>Verificações</h2>
        <p>E-mail: {product.verifications.email}</p>
        <p>Telefone: {product.verifications.phone}</p>
        <p>Documentos: {product.verifications.documents}</p>
      </div>
      <style jsx>{`
        .product-detail {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
          color: #fff;
          background-color: #000;
        }
        .product-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          background-color: #333;
        }
        .product-images {
          flex: 1;
          margin-right: 20px;
        }
        .main-image {
          width: 100%;
          height: auto;
          max-height: 400px;
          object-fit: cover;
          border-radius: 8px;
        }
        .additional-images {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }
        .additional-images img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 5px;
          cursor: pointer;
        }
        .product-info {
          flex: 2;
          text-align: left;
        }
        .product-name {
          margin-bottom: 10px;
          font-size: 2em;
          font-weight: bold;
          color: #ffffff;
        }
        .product-info p {
          margin: 5px 0;
        }
        .availability, .sales, .points {
          color: #0070f3;
          font-weight: bold;
        }
        .price {
          color: #e60000;
          font-size: 2em;
          font-weight: bold;
          margin: 10px 0;
        }
        .product-select {
          display: block;
          width: 60%;
          padding: 5px; /* Diminua o padding para ajustar o tamanho */
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 0.9em; /* Ajuste o tamanho da fonte */
        }
        .buy-button {
          padding: 10px 20px;
          background-color: #0070f3;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1em;
          transition: background-color 0.3s ease;
        }
        .buy-button:hover {
          background-color: #005bb5;
        }
        .product-details, .seller-info {
          margin-top: 20px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          background-color: #333;
        }
        .product-details h2, .seller-info h2 {
          margin-bottom: 10px;
          color: #fff;
        }
        .seller-details {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .seller-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .seller-text {
          text-align: left;
        }
      `}</style>
    </div>
  );
}

export default ProductDetailPage;
