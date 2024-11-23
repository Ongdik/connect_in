import { sampleProducts } from "@/states/atoms/ProductAtom";
import ProductCard from "./ProductCard";
import { useState } from "react";
import AccountCard from "./AccountCard";

const ProductList = () => {
  const [balance, setBalance] = useState(0);

  return (
    <div className="p-4">
      <AccountCard balance={balance} />
      <h2 className="text-xl font-semibold mb-4">추천 상품</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sampleProducts.map((product) => (
          <ProductCard
            key={product.idx}
            product={product}
            setBalance={setBalance}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;