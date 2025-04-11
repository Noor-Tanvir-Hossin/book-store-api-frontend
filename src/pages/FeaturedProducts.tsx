// import { useGetProductsQuery } from "@/redux/features/Products/ProductsApi";

// const FeaturedProducts = () => {
//   const { data, isLoading,error } = useGetProductsQuery(undefined);
//   console.log(data);
//   return <div></div>;
// };

// export default FeaturedProducts;
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetProductsQuery } from "@/redux/features/Products/ProductsApi";
import { TProduct } from "@/types/product.type";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const { data, isLoading, error } = useGetProductsQuery(undefined);
  const navigate = useNavigate();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data.data || data.data.length === 0) {
    return (
      <div className="max-w-md mx-auto  mt-10 p-6 border border-red-300 rounded-2xl shadow-md bg-red-50 text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-2">😢 Oops!</h2>
        <p className="text-red-500">
          Something went wrong. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className=" my-3">
      <h1 className="text-4xl text-center font-extrabold text-gray-800 mb-6">
        Featured <span className="text-[#FD6E0A]">Products</span>
      </h1>
      <p className="text-center my-4 font-medium text-gray-700">
        Handpicked reads you won't want to put down. Discover the books
        everyone’s talking about!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.data.slice(0, 6).map((product: TProduct) => (
          <Card key={product._id} className="w-full">
            <CardHeader>
              <img className="h-[250px]" src={product.image} alt="book.image" />

              <CardTitle>{product.title}</CardTitle>
              <CardDescription>{product.author}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between">
              <p>{product.category}</p>
              <p>{product.price}TK.</p>
            </CardContent>
            <CardFooter className="flex">
              <Button
                className="mx-auto bg-[#FD6E0A] hover:bg-[#dc803fed]"
                variant="default"
                onClick={() => navigate(`/products/${product._id}`)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex my-4">
        <Button
          className="mx-auto bg-[#FD6E0A] hover:bg-[#dc803fed]"
          variant="default"
          onClick={() => navigate("/products")}
        >
          View All
        </Button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
