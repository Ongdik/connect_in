"use client";

import { useAtom } from "jotai";
import {
  selectedProductIndexAtom,
  sampleProducts,
} from "@/states/atoms/ProductAtom";
import Image from "next/image";
import { useEffect, useState } from "react";

const PaidProduct = () => {
  const [selectedProductIndex] = useAtom(selectedProductIndexAtom);
  const [selectedProduct, setSelectedProduct] = useState(sampleProducts[0]); // 초기값 설정

  useEffect(() => {
    // 로컬스토리지에서 값을 가져온 후 상품 설정
    if (selectedProductIndex !== null) {
      setSelectedProduct(sampleProducts[selectedProductIndex]);
    }
  }, [selectedProductIndex]);

  return (
    <div className="flex flex-col items-center">
      <Image
        src={selectedProduct.imageUrl}
        alt={selectedProduct.title}
        width={100}
        height={100}
      />
    </div>
  );
};

export default PaidProduct;
