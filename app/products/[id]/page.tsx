import React from "react";
import Image from "next/image";
type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  rating: number;
  category: string;
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { id }: { id: string } = await params;
  const response = await fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query GetProduct($id: ID!) {
          product(id: $id) {
            id
            name
            description
            price
            stock
            images
            rating
            category
          }
        }
      `,
      variables: {
        id: id,
      },
    }),
  });

  const { data } = await response.json();
  const product: ProductType = data.product;

  return (
    <div className="w-full">
      <div className="text-center flex items-center justify-center mt-20">
        <Image
          src={`/${product.images[0]}`}
          alt={product.name}
          width={300}
          height={400}
        />
      </div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
}
