import { useGetProductsQuery } from "@/redux/features/Products/ProductsApi";
import { TProduct } from "@/types/product.type";
// import { useNavigate } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import LoddingPage from "./LoddingPage";

// import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery(undefined);

  const products = useMemo(() => data?.data || [], [data?.data]);
  const categories = [
    "All Categories",
    ...new Set(products.map((product: TProduct) => product.category)),
  ];
  const authors = [
    "All Authors",
    ...new Set(products.map((product: TProduct) => product.author)),
  ];
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterAuthor, setFilterAuthor] = useState("All Authors");
  const [priceRange, setPriceRange] = useState([500, 1000]);
  const [maxPriceRange, setMaxPriceRange] = useState(0);
  const [minPriceRange, setMinPriceRange] = useState(0);
  const [availability, setAvailability] = useState("all");
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((product: TProduct) => product.price);
      setMinPriceRange(Math.min(...prices));
      setMaxPriceRange(Math.max(...prices));
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  }, [products]);

  const filteredProducts = products.filter((product: TProduct) => {
    return (
      (search === "" ||
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.author.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())) &&
      (filterCategory === "All Categories" ||
        product.category === filterCategory) &&
      (filterAuthor === "All Authors" || product.author === filterAuthor) &&
      (availability === "all" ||
        (availability === "instock" && product.inStock) ||
        (availability === "uavailable" && !product.inStock)) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
    );
  });

  if (isLoading) {
    return <LoddingPage />; //<p className="text-center">Loading...</p>
  }

  return (
    <div className="">
      <div className="mb-9 md:w-[50%] mx-auto">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, category or author"
        />
      </div>

      <div className="flex items-center flex-col md:flex-row my-6 md:my-9 space-y-6">
        <div className="flex items-center gap-3">
          <Slider
            className="w-44 mx-auto lg:mt-6"
            value={priceRange}
            onValueChange={setPriceRange}
            max={maxPriceRange}
            min={minPriceRange}
            step={3}
          />
          <div className="size-6 w-12 px-1.5 text-sm font-bold border border-black lg:mt-6 rounded">
            {priceRange[0]}
          </div>
        </div>
        <div className="mx-auto">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[180px]">
              {filterCategory}
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category as string} value={category as string}>
                  {category as string}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mx-auto">
          <Select value={filterAuthor} onValueChange={setFilterAuthor}>
            <SelectTrigger className="w-[180px]">{filterAuthor}</SelectTrigger>
            <SelectContent>
              {authors.map((author) => (
                <SelectItem key={author as string} value={author as string}>
                  {author as string}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mx-auto">
          <Select value={availability} onValueChange={setAvailability}>
            <SelectTrigger className="w-[180px]">{availability}</SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="instock">Instock</SelectItem>
              <SelectItem value="unavailable">Unavailable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {filteredProducts.length === 0 && (
        <div className="flex flex-col">
          <p className="mx-auto my-6 md:text-lg">
            We're sorry. We cannot find any matches for your query term.
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="300"
            height="300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-search-x-icon lucide-search-x mx-auto"
          >
            <path d="m13.5 8.5-5 5" />
            <path d="m8.5 8.5 5 5" />
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      )}
      <div className="md:ml-0 gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-evenly items-center w-full">
        {filteredProducts.map((product: TProduct) => (
          <Card key={product._id} className="w-full">
            <CardHeader>
              <img className="h-[300px]" src={product.image} alt="book.image" />

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
    </div>
  );
};

export default Products;
