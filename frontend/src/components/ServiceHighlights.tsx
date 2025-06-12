import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const ServiceHighlights = () => {
  return (
    <div className="flex justify-between items-center px-20 bg-[#F9F2ED] font-josefin">
      <div className="flex items-center gap-3 py-10">
        <LocalShippingIcon fontSize={"large"} />
        <div>
          <p className="font-bold text-xl">Free Shipping</p>
          <p className="font-normal text-sm">
            Free shipping for order above $100
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 py-10">
        <PaymentIcon fontSize={"large"} />
        <div>
          <p className="font-bold text-xl">Flexible Payment</p>
          <p className="font-normal text-sm">Multiple secure payment option</p>
        </div>
      </div>
      <div className="flex items-center gap-3 py-10">
        <SupportAgentIcon fontSize={"large"} />
        <div>
          <p className="font-bold text-xl">24x7 Support</p>
          <p className="font-normal text-sm">We support online all day</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceHighlights;
