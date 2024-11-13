// import Image from "next/image";
// import { ProductType } from "@/types/ProductType";

// // 더미 데이터
// const sampleProducts: ProductType[] = [
//   { id: 1, title: "BHC 치킨", imageUrl: "/images/image_test.png" },
//   { id: 2, title: "마라맛 엽떡", imageUrl: "/images/image_test.png" },
//   { id: 3, title: "빽보이 피자", imageUrl: "/images/image_test.png" },
//   { id: 4, title: "장충동 왕족발", imageUrl: "/images/image_test.png" },
//   { id: 5, title: "김밥 브라더스", imageUrl: "/images/image_test.png" },
//   // 추가 샘플 데이터
// ];

// const ProductList = () => {
//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">추천 상품</h2>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//         {sampleProducts.map((product) => (
//           <div
//             key={product.id}
//             className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
//           >
//             <Image
//               src={product.imageUrl}
//               alt={product.title}
//               className="w-full h-auto object-cover rounded-lg"
//               width={500}
//               height={300}
//               layout="responsive" // 반응형
//             />
//             <div className="mt-2 font-bold text-gray-800">{product.title}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;

import { ProductType } from "@/types/ProductType";
import ProductCard from "./ProductCard";

// 더미 데이터
const sampleProducts: ProductType[] = [
  {
    id: 1,
    title: "BHC 치킨",
    imageUrl: "/images/image_test.png",
    price: 18000,
  },
  {
    id: 2,
    title: "마라맛 엽떡",
    imageUrl: "/images/image_test.png",
    price: 12000,
  },
  {
    id: 3,
    title: "빽보이 피자",
    imageUrl: "/images/image_test.png",
    price: 15000,
  },
  {
    id: 4,
    title: "장충동 왕족발",
    imageUrl: "/images/image_test.png",
    price: 20000,
  },
  {
    id: 5,
    title: "김밥 브라더스",
    imageUrl: "/images/image_test.png",
    price: 8000,
  },
];

const ProductList = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">추천 상품</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sampleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
