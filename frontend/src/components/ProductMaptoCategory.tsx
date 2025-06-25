"use client";
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/apiService";
import { queryKey, SERVER_URL } from "@/constant";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductMaptoCategory = ({
  open,
  setOpen,
  selectedItemForCombo,
  setSelectedItemForCombo,
}: any) => {
  const [productDetails, setProductDetails] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(
    selectedItemForCombo || []
  );

  const { data } = useQuery({
    queryKey: [queryKey.productDetails],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    queryFn: () => getProducts({ offset: 0, limit: 0 }),
  });
  useEffect(() => {
    setProductDetails(data?.data);
  }, [data]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (selectedProduct?.length === 0) {
      setOpen(false);
    } else {
      setOpen(false);
      setSelectedItemForCombo(selectedProduct);
    }
  };

  const handleCheckBox = (e: any, item: any) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedProduct((prev: any) => [...prev, item]);
    } else {
      const filteredItems = selectedProduct.filter(
        (product: any) => product.id !== item.id
      );
      setSelectedProduct(filteredItems);
    }
  };

  const handleIsChecked = (id: number) => {
    return selectedProduct.some((product: any) => product.id === id);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description "
        className="max-h-[600px] overflow-y-auto my-auto"
      >
        <DialogTitle>{"Make a Combo"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="flex flex-col gap-3"
          >
            {productDetails?.map((product: any) => (
              <div
                key={product.id}
                className="flex items-center justify-between min-w-96 hover:bg-blue-300 px-2 py-2 cursor-pointer rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className=" relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={`${SERVER_URL}/${product.image_urls[0]?.url}`}
                      layout="fill"
                      objectFit="cover"
                      className="object-top"
                      alt=""
                    ></Image>
                  </div>
                  <p>{product?.name}</p>
                </div>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={handleIsChecked(product?.id)}
                  onChange={(e) => handleCheckBox(e, product)}
                />
              </div>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="my-3">
          <button
            onClick={handleClose}
            className=" px-6 py-2 rounded-3xl text-blue-400 mt-4"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-400 px-6 py-2 rounded-3xl text-white mt-4"
          >
            Add
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductMaptoCategory;
