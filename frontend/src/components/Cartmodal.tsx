import Image from "next/image";
import React from "react";

const Cartmodal = () => {
  const cartItems = false;
  return (
    <div className=" w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col z-10">
      {cartItems ? (
        <div>Cart Is Empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          <div className="flex flex-col gap-8 mt-2">
            <div className="flex gap-4">
              <Image
                src="https://images.pexels.com/photos/12405330/pexels-photo-12405330.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="cartImage"
                width={80}
                height={75}
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full">
                {/* TOP */}
                <div>
                  {/* TITLE  */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">Product Name</h3>
                    <div className="p-1 bg-gray-50 rounded-sm">$49</div>
                  </div>
                  {/* DESC  */}
                  <div className="text-sm text-gray-500">available</div>
                </div>
                {/* BOTTOM  */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qty. 2</span>
                  <span className="text-blue-500">Remove</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Image
                src="https://images.pexels.com/photos/12405330/pexels-photo-12405330.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="cartImage"
                width={80}
                height={75}
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full">
                {/* TOP */}
                <div>
                  {/* TITLE  */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">Product Name</h3>
                    <div className="p-1 bg-gray-50 rounded-sm">$49</div>
                  </div>
                  {/* DESC  */}
                  <div className="text-sm text-gray-500">available</div>
                </div>
                {/* BOTTOM  */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qty. 2</span>
                  <span className="text-blue-500">Remove</span>
                </div>
              </div>
            </div>
          </div>
          {/* footer  */}
          <div>
            <div className="flex items-center justify-between font-semibold">
              <span>Subtotal</span>
              <span>$49</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                View Cart
              </button>
              <button className="rounded-md py-3 px-4 bg-black text-white">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cartmodal;
