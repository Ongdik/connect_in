import { sampleProducts } from "@/states/atoms/ProductAtom";
import ProductCard from "./ProductCard";

const ProductList = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">추천 상품</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sampleProducts.map((product) => (
          <ProductCard key={product.idx} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
