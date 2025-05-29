import React from "react";
import Link from "next/link";
export default function Headers() {
  return (
    <div>
      <header className="px-32  flex gap-4">
        <Link className="py-4 px-4 hover:text-amber-400 " href={"/products"}>
          products
        </Link>
        <Link className="py-4 px-4 hover:text-amber-400 " href={"/"}>
          Home
        </Link>
        <Link className="py-4 px-4 hover:text-amber-400 " href={"/login"}>
          Login
        </Link>
        <Link className="py-4 px-4 hover:text-amber-400 " href={"/admin"}>
          admin panel
        </Link>
      </header>
    </div>
  );
}
