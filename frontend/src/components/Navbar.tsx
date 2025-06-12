import Link from "next/link";
import Menu from "./Menu";
import NavIcons from "./NavIcons";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <div className="h-20 md:px-8 px-16  relative bg-[#F9F2ED]">
      {/* MOBILE */}
      <div className="flex items-center justify-between h-full md:hidden">
        <Link href="/" className="text-2xl tracking-wide font-rollgates">
          FASHION WEAR
        </Link>
        <Menu />
      </div>
      {/* BIGGER sCREEN */}
      <div className="hidden md:flex items-center justify-between gap-16 h-full">
        {/* LEFT */}
        <div className="flex items-center justify-around gap-16 w-3/4">
          <Link href="/" className="flex gap-3">
            <div className="text-2xl tracking-widest font-rollgates font-normal">FASHION WEAR</div>
          </Link>
          <div className="hidden xl:flex gap-12 font-josefin">
            <Link href="/" className="text-orange-400">Homepage</Link>
            <Link href="/">Shop</Link>
            <Link href="/">Accessories</Link>
            <Link href="/">Combo</Link>
            <Link href="/">Contact us</Link>
          </div>
        </div>
        {/* RIGHT */}
        <div className=" flex items-center justify-between gap-8 w-1/4">
          {/* <SearchBar /> */}
          <NavIcons />
        </div>
       {/*  <Link
          href="/admin/categories-list"
          className=" border border-pink-500 text-pink-500 p-2 px-4 rounded-md hover:text-white hover:bg-pink-500"
        >
          Admin
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;
