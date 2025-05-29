"use client";
import { useState } from "react";

export default function CreateProductForm() {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [uploadedUrl, setUploadedUrl] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    images: [],
    rating: 0,
    category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mutation = `
      mutation CreateProduct($input: ProductInput!) {
        createProduct(input: $input) {
          id
          name
        }
      }
    `;
    const res = await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: mutation, variables: { input: form } }),
    });
    const json = await res.json();
    console.log(json.data);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file: File = e.target.files[0];
    console.log(file, "this is file");
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    } else {
      console.log("no file");
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data, "this is data");
      if (res.ok) {
      } else {
        console.error("Upload failed:", data.error);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <form
      className="mt-20 px-40 grid grid-cols-4 gap-4"
      onSubmit={handleSubmit}
    >
      <input
        className="outline-0 rounded border-2 border-gray-600 py-2 px-1"
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="outline-0 rounded border-2 border-gray-600 py-2 px-1"
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        className="outline-0 rounded border-2 border-gray-600 py-2 px-1"
        type="number"
        placeholder="Price"
        onChange={(e) =>
          setForm({ ...form, price: parseFloat(e.target.value) })
        }
      />
      <input
        className="outline-0 rounded border-2 border-gray-600 py-2 px-1"
        type="number"
        placeholder="Stock"
        onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) })}
      />
      <input
        className="outline-0 rounded border-2 border-gray-600 py-2 px-1"
        placeholder="Category"
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <input type="file" accept="image" onChange={(e) => handleUpload(e)} />
      <button type="submit">Create Product</button>
    </form>
  );
}
