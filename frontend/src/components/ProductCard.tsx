import React from "react";

interface Tag {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  short_description: string;
  description: string;
  price: number;
  category: Category;
  tags: Tag[];
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="card">
      <h3 className="product-name">{product.name}</h3>
      <p className="category">{product.category.name}</p>
      <p className="description">
        {product.short_description || product.description}
      </p>
      <p className="price">${product.price}</p>
      <div className="tags">
        {product.tags.map((t) => (
          <span key={t.id} className="tag">
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
