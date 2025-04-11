import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Marquee from "react-fast-marquee";
import React, { useEffect, useState } from "react";
type BookReview = {
  id: number;
  user: string;
  book: string;
  comment: string;
  rating: number;
};

const Review: React.FC = () => {
  const [reviews, setReviews] = useState<BookReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("review.json")
      .then((res) => res.json())
      .then((data: BookReview[]) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading reviews...</div>;
  }

  return (
    <div>
      <div className="p-6  mx-auto">
        <h1 className="text-4xl text-center font-extrabold text-gray-800 mb-6">
          Book <span className="text-[#FD6E0A]">Reviews</span>
        </h1>
        <p className=" text-center my-4 font-medium text-gray-700">
          Discover honest and insightful reviews of your favorite books ,from
          timeless classics to the latest bestsellers. Find your next great read
          through our readers' perspectives.
        </p>
        <Marquee pauseOnHover={true}>
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="w-[350px] m-2 bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
            >
              <CardHeader>
                <CardTitle>{review.book}</CardTitle>
                <CardDescription>
                  Reviewed by <span className="font-medium">{review.user}</span>{" "}
                  | ⭐ {review.rating}/5
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">“ {review.comment} „</p>
              </CardContent>
            </Card>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Review;
