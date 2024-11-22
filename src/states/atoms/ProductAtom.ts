// src/state/atoms/ProductAtom.ts
import { atom } from "jotai";
import { ProductType } from "@/types/ProductType";

// 더미 데이터
export const sampleProducts: ProductType[] = [
  { idx: 0, title: "BHC 치킨", imageUrl: "/images/chicken.jpg", price: 18000 },
  {
    idx: 1,
    title: "마라맛 엽떡",
    imageUrl: "/images/tteokbokki.jpg",
    price: 12000,
  },
  { idx: 2, title: "빽보이 피자", imageUrl: "/images/pizza.jpg", price: 15000 },
  {
    idx: 3,
    title: "장충동 왕족발",
    imageUrl: "/images/jokbal.jpg",
    price: 20000,
  },
  {
    idx: 4,
    title: "김밥 브라더스",
    imageUrl: "/images/kimbap.jpg",
    price: 8000,
  },
];

// 선택된 상품 인덱스 상태
export const selectedProductIndexAtom = atom<number | null>(null);
