import { ReactNode } from "react";

type  TProduct = {
    _id: string;
    product: {
      title: string;
    };
    quantity: number;
  }
  
 type TPopulatedProduct = {
    _id: string;
    title: string;
    author: string;
    image: string;
    price: number;
    category: string;
    description: string;
    quantity: number;
    inStock: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  
  export type TOrder = {
    _id: string;
    transaction: {
      method: ReactNode;
      id: string;
    };
    email: string;
    products: TProduct[];
    totalPrice: number;
    status: string;
    populatedProducts:TPopulatedProduct[];
    createdAt: string;
  }