import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import LoddingPage from "./LoddingPage";
import { useGetProductQuery } from "@/redux/features/ProductsApi/ProductsApi";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductQuery(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isLoading) {
    return <LoddingPage />;
  }
  const product = data?.data || {};

  const handleBuyNow = () => {
    dispatch(
      addToCart({
        _id: product._id,
        title: product.title,
        author: product.author,
        description: product.description,
        price: product.price,
        image: product.image,
        quantity: 1,
        category: product.category,
      })
    );
    navigate("/checkouts");
  };

  return (
    <section className="bg-gray-100 md:shadow-lg dark:text-gray-800 rounded">
      <div className="container flex flex-col-reverse justify-center md:p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row-reverse gap-9 md:gap-12">
        <div className="flex flex-col justify-center text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left space-y-3">
          <h1 className="text-2xl md:text-3xl font-semibold leading-none sm:text-4xl">
            {product?.title}
          </h1>
          <span className="font-semibold">Author: {product?.author}</span>
          <p className="">{product?.description}</p>
          <span className="font-semibold">Category: {product?.category}</span>
          <span className="font-semibold">Quantity: {product?.quantity}</span>
          <h3 className="text-xl font-semibold leading-none md:py-3">
            Price: {product?.price} BDT
          </h3>
          <div className="flex items-center">
            <Button
              className="mx-auto lg:mx-0 lg:ml-auto my-3 md:text-lg w-36 bg-[#FD6E0A] hover:bg-[#954d1aed]"
              variant="default"
              onClick={handleBuyNow}
            >
              <span>Buy Now</span>
              <MoveRight />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center my-3 lg:mt-0 h-72 sm:h-80 lg:h-96">
          <img
            src={product?.image}
            alt="book.image"
            className="object-contain h-72 sm:h-80 lg:h-96"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
