import Link from "next/link";
import React from "react";
import Image from "next/image";
type productType = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  rating: number;
  category: string;
};

export default async function App() {
  try {
    const api = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `   query {
        products {
          id
          name
          description
          price
          stock
          images
          rating
          category
        }
      }`,
      }),
      cache: "no-cache",
    });

    const { data } = await api.json();
    console.log(data, "this is data");
    return (
      <div>
        <div className="text-center py-10 text-9xl">welcome to your site</div>
        <div className=" grid grid-cols-8 px-10  mt-20 gap-4 ">
          {data.products?.map((item: productType, index: number) => (
            <Link href={`products/${item.id}`} className="" key={index}>
              <div className=" w-52 h-64 border-2 border-gray-600 rounded">
                <Image
                  src={`/${item.images ? item.images : item.images[0]}`}
                  width={300}
                  height={420}
                  className=""
                  alt="this is pic"
                />
                <div className="flex justify-between mt-4">
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.log("خطا:", error.message || error);
    return (
      <div className="p-6 bg-red-100 text-red-800 rounded-md">
        <h2 className="text-lg font-bold mb-2">خطا در دریافت اطلاعات</h2>
        <p>{error.message || "در دریافت اطلاعات مشکلی پیش آمده است."}</p>
      </div>
    );
  }
}
