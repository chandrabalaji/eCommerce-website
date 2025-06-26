

const CustomizeProduct = () => {
  return (
    <div>
      {/* COLOR */}
      <ul className="flex items-center gap-3">
        <li className="w-6 h-6 rounded-full  cursor-pointer relative bg-red-500">
          <div className="absolute w-8 h-8 rounded-full  ring-red-400 ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </li>
        <li className="w-6 h-6 rounded-full ring-1 ring-blue-300 cursor-pointer relative bg-blue-500"></li>
        <li className="w-6 h-6 rounded-full ring-1 ring-green-300 cursor-not-allowed relative bg-green-500"></li>
      </ul>
      {/* OTHERS */}
      <h4 className="font-medium mt-6">Choose a size</h4>
      <ul className="flex items-center gap-4 mt-2">
        <li className="ring-1 ring-lama ring-orange-200 text-orange-400 rounded-md py-1 px-4 text-sm cursor-pointer">
          S
        </li>
        <li className="ring-1 ring-lama ring-orange-200 text-orange-400 rounded-md py-1 px-4 text-sm cursor-pointer">
          M
        </li>
        <li className="ring-1 ring-orange-200 text-orange-400   rounded-md py-1 px-4 text-sm ">
          L
        </li>
        <li className="ring-1 ring-orange-200 text-orange-400 rounded-md py-1 px-4 text-sm ">
          XL
        </li>
        <li className="ring-1 ring-orange-200 text-white bg-orange-200 rounded-md py-1 px-4 text-sm cursor-not-allowed">
          XXL
        </li>
      </ul>
    </div>
  );
};

export default CustomizeProduct;
