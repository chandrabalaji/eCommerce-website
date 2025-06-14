import Link from "next/link";
import Image from "next/image";

const page = () => {
  const productList = [
    {
      id: 1,
      name: "Shirt",
      size: "28 - 36",
      cat_img:
        "https://images.pexels.com/photos/25365159/pexels-photo-25365159/free-photo-of-blue-mug-with-plants.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
    },
    {
      id: 2,
      name: "T-shirt",
      size: "28 - 36",
      cat_img:
        "https://images.pexels.com/photos/12405330/pexels-photo-12405330.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 3,
      name: "Kurti",
      size: "28 - 36",
      cat_img:
        "https://images.pexels.com/photos/12405330/pexels-photo-12405330.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 4,
      name: "Shorts",
      size: "28 - 36",
      cat_img:
        "https://images.pexels.com/photos/12405330/pexels-photo-12405330.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
  ];

  return (
    <div className="flex flex-col gap-3 px-10 py-4 w-full ">
      <div className="flex items-center justify-between w-full ">
        <div>
          <p className="text-3xl">Productes</p>
          <p>Groups Related Productes into Categories add them to your site.</p>
        </div>
        <Link
          href="/admin/product-list/add"
          className="bg-pink-400 px-6 py-2 rounded-3xl text-white"
        >
          + Add product
        </Link>
      </div>
      <section className="flex items-center flex-wrap gap-10 ">
        {productList?.map((product) => (
          <Link
            className="w-[350px] h-72 relative rounded-md overflow-hidden "
            key={product.id}
            href={`categories-list/edit=${product.id}`}
          >
            <Image
              src={product.cat_img}
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>
            <p className="absolute bottom-5 left-5 text-2xl text-white ">
              {product.name} {product.size}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default page;
