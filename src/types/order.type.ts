type  TProduct = {
    _id: string;
    product: {
      title: string;
    };
    quantity: number;
  }
  
  
  export type TOrder = {
    _id: string;
    transaction: {
      id: string;
    };
    email: string;
    products: TProduct[];
    totalPrice: number;
    status: string;
    createdAt: string;
  }