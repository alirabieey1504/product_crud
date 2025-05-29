import { buildSchema } from "graphql";
import { graphql } from "graphql";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data/products.json");

// خواندن لیست
function getProducts() {
  const jsonData = fs.readFileSync(dataPath, "utf8");
  console.log(JSON.parse(jsonData), "this is current");
  return JSON.parse(jsonData);
}

// ذخیره‌سازی
function saveProducts(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// type productType = {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
//   images: string[];
//   rating: number;
//   category: string;
// };

// ساخت schema
const schema = buildSchema(`
  type Product {
   id: ID!
   name: String!
   description: String!
   price: Float!
   stock: Int!
   images: [String!]!
   rating: Float 
   category: String!
}
   input ProductInput {
    name: String!
    description: String!
    price: Float!
    stock: Int!
    images: [String!]!
    rating: Float
    category: String!
  }
  type Query {
    products(page: Int, limit: Int, search: String): [Product!]!
    product(id: ID!): Product
}
   type Mutation {
     createProduct(input: ProductInput!): Product!
     updateProduct(id: ID!, input: ProductInput!): Product!
    deleteProduct(id: ID!): Boolean!
}
`);

// ریزالوورها
const rootValue = {
  hello: () => "Hello from raw GraphQL without Apollo!",
  // products: ({ page = 1, limit = 10 }) => {
  //   const start = (page - 1) * limit;
  //   return products.slice(start, start + limit);
  // },
  // product: ({ id }: { id: string }) => products.find((p) => p.id === id),
  product: ({ id }: { id: string }) => {
    const products = getProducts();
    return products.find((p) => p.id === id);
  },
  products: ({ page = 1, limit = 20 }) => {
    const products = getProducts();
    const start = (page - 1) * limit;
    return products.slice(start, start + limit);
  },
  createProduct: ({ input }) => {
    const products = getProducts();
    const maxId = Math.max(...products.map((p) => parseInt(p.id)));
    const newProduct = { id: (maxId + 1).toString(), ...input };

    products.push(newProduct);
    saveProducts(products);

    return newProduct;
  },
  // updateProduct: ({
  //   id,
  //   input,
  // }: {
  //   id: string;
  //   input: Omit<productType, "id">;
  // }) => {
  //   const index = products.findIndex((p) => p.id === id);
  //   if (index === -1) return null;
  //   products[index] = { id, ...input };
  //   return products[index];
  // },
  // deleteProduct: ({ id }: { id: string }) => {
  //   const index = products.findIndex((p) => p.id === id);
  //   if (index === -1) return false;
  //   products.splice(index, 1);
  //   return true;
  // },
};

// فقط POST ساپورت میشه
export async function POST(req: NextRequest) {
  const { query, variables } = await req.json();

  const result = await graphql({
    schema,
    source: query,
    rootValue,
    variableValues: variables,
  });

  return NextResponse.json(result);
}
