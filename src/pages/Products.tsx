// import { useGetProductsQuery } from "@/redux/features/Products/ProductsApi";
// import { TProduct } from "@/types/product.type";
// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarProvider,
} from "@/components/ui/sidebar";
// import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

const Products = () => {
  // const { data, isLoading } = useGetProductsQuery(undefined);

  // const products = useMemo(() => data?.data || [], [data?.data]);
  // const categories = [
  //   "All Categories",
  //   ...new Set(products.map((product: TProduct) => product.category)),
  // ];
  // const authors = [
  //   "All Authors",
  //   ...new Set(products.map((product: TProduct) => product.author)),
  // ];
  // const navigate = useNavigate();
  // const [search, setSearch] = useState("");
  // const [filterCategory, setFilterCategory] = useState("All Categories");
  // const [filterAuthor, setFilterAuthor] = useState("All Authors");
  // const [priceRange, setPriceRange] = useState([10, 50]);
  // const [maxPriceRange, setMaxPriceRange] = useState(0);
  // const [minPriceRange, setMinPriceRange] = useState(0);
  // const [availability, setAvailability] = useState("all");
  // const [currentPage, setCurrentPage] = useState(1);
  // const pageSize = 4;
  // useEffect(() => {
  //   if (products.length > 0) {
  //     const prices = products.map((product: TProduct) => product.price);
  //     setMinPriceRange(Math.min(...prices));
  //     setMaxPriceRange(Math.max(...prices));
  //     setPriceRange([Math.min(...prices), Math.max(...prices)]);
  //   }
  // }, [products]);
  // const filteredProducts = products.filter((product: TProduct) => {
  //   return (
  //     (search === "" ||
  //       product.title.toLowerCase().includes(search.toLowerCase()) ||
  //       product.author.toLowerCase().includes(search.toLowerCase()) ||
  //       product.category.toLowerCase().includes(search.toLowerCase())) &&
  //     (filterCategory === "All Categories" ||
  //       product.category === filterCategory) &&
  //     (filterAuthor === "All Authors" || product.author === filterAuthor) &&
  //     product.price >= priceRange[0] &&
  //     product.price <= priceRange[1] &&
  //     (availability === "all" ||
  //       (availability === "available" && product.inStock) ||
  //       (availability === "unavailable" && !product.inStock))
  //   );
  // });
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  const items = [
    {
      title: "Home",
      url: "#",
    },
    {
      title: "Inbox",
      url: "#",
    },
    {
      title: "Calendar",
      url: "#",
    },
    {
      title: "Search",
      url: "#",
    },
    {
      title: "Settings",
      url: "#",
    },
  ];
  return (
    <div className="">
      <SidebarProvider>
        <Sidebar className="w-[200px]">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-black text-xl">
                All Products
              </SidebarGroupLabel>
              <SidebarGroupContent className="py-9">
                <SidebarMenu>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <h3>Price</h3>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {items.map((item) => (
                          <SelectItem value={item.title} key={item.title}>
                            <span>{item.title}</span>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
};

export default Products;
