import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AllProducts = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <div className="flex">
          <Button className="mx-auto bg-[#FD6E0A] hover:bg-[#dc803fed]" variant="default">View Details</Button>
        </div>
      </Card>
    </div>
  );
};

export default AllProducts;
