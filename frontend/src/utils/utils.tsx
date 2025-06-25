import { SERVER_URL } from "@/constant";

export const ProductDetails = [
  {
    id: 1,
    product_name: "Polo Shirt",
    price: "499",
    style:
      "absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500 max-h-80 w-full",
    img: "https://images.pexels.com/photos/25365159/pexels-photo-25365159/free-photo-of-blue-mug-with-plants.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
  },
  {
    id: 2,
    product_name: "Polo Shirt",
    price: "499",
    style:
      "absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500 max-h-80 w-full",
    img: "https://images.pexels.com/photos/25365159/pexels-photo-25365159/free-photo-of-blue-mug-with-plants.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
  },
  {
    id: 3,
    product_name: "Polo Shirt",
    price: "499",
    style:
      "absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500 max-h-80 w-full",
    img: "https://images.pexels.com/photos/25365159/pexels-photo-25365159/free-photo-of-blue-mug-with-plants.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
  },
  {
    id: 4,
    product_name: "Polo Shirt",
    price: "499",
    style:
      "absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500 max-h-80 w-full",
    img: "https://images.pexels.com/photos/25365159/pexels-photo-25365159/free-photo-of-blue-mug-with-plants.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
  },
  {
    id: 5,
    product_name: "Polo Shirt",
    price: "499",
    style:
      "absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500 max-h-80 w-full",
    img: "https://images.pexels.com/photos/25365159/pexels-photo-25365159/free-photo-of-blue-mug-with-plants.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
  },
  {
    id: 6,
    product_name: "Polo Shirt",
    price: "499",
    style:
      "absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500 max-h-80 w-full",
    img: "https://images.pexels.com/photos/25365159/pexels-photo-25365159/free-photo-of-blue-mug-with-plants.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
  },
  {
    id: 7,
    product_name: "Polo Shirt",
    price: "499",
    style:
      "absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500 max-h-80 w-full",
    img: "https://images.pexels.com/photos/25365159/pexels-photo-25365159/free-photo-of-blue-mug-with-plants.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
  },
];

export const formatImageUrl = (baseUrl: string) => {
  if (!baseUrl) return "";
  return `${SERVER_URL}/${baseUrl}`;
};
