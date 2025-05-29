"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { useParams } from "next/navigation";
// type PageProps = {
//   params: {
//     id: string;
//   };
// };
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
export default function Edit() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(Number);
  const [stock, setStock] = useState(Number);
  const [images, setImages] = useState<string[]>([]);
  const [rating, setRating] = useState(Number);
  const [category, setCategory] = useState("");

  const params = useParams() as Record<string, string | string[]>;

  const id = (params.id as string) ?? {};
  console.log(id, "this is id");

  useEffect(() => {
    async function fetchData() {
      console.log(params, "this is params");

      const response = await axios.post<{ data: { product: ProductType } }>(
        "http://localhost:3000/api/graphql",
        {
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
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const product: ProductType = response.data.data.product;
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setImages(product.images);
      setRating(product.stock);
      setCategory(product.category);
      console.log(product, "this is product");
    }

    fetchData();
  }, []);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e, "this is e");
  };
  return (
    <div className="px-40">
      <div className="mt-20 grid grid-cols-2 gap-2">
        <input
          type="text"
          onChange={(e) => handleName(e)}
          value={name}
          placeholder="name"
          className="rounded border-2 border-gray-600 outline-0 px-2 py-2"
        />
        <input
          placeholder="description"
          onChange={(e) => handleName(e)}
          value={description}
          type="text"
          className="rounded border-2 border-gray-600 outline-0 px-2 py-2"
        />
        <input
          placeholder="price"
          onChange={(e) => handleName(e)}
          value={price}
          type="text"
          className="rounded border-2 border-gray-600 outline-0 px-2 py-2"
        />{" "}
        <input
          placeholder="stock"
          onChange={(e) => handleName(e)}
          value={stock}
          type="text"
          className="rounded border-2 border-gray-600 outline-0 px-2 py-2"
        />{" "}
        <input
          placeholder="images"
          onChange={(e) => handleName(e)}
          value={images}
          type="text"
          className="rounded border-2 border-gray-600 outline-0 px-2 py-2"
        />{" "}
        <input
          placeholder="rating"
          onChange={(e) => handleName(e)}
          value={rating}
          type="text"
          className="rounded border-2 border-gray-600 outline-0 px-2 py-2"
        />{" "}
        <input
          placeholder="category"
          onChange={(e) => handleName(e)}
          value={category}
          type="text"
          className="rounded border-2 border-gray-600 outline-0 px-2 py-2"
        />
      </div>
      <div className="w-full flex gap-4 justify-end">
        <button className="border-2 border-gray-500  px-4 rounded mt-10 text-end">
          delete
        </button>
        <button className="border-2 border-gray-500  px-4 rounded mt-10 text-end">
          confirm
        </button>
      </div>
    </div>
  );
}
