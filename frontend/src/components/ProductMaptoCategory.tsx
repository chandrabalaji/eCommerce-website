import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductMaptoCategory = ({ open, setOpen }: any) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const productList = [
    {
      id: 1,
      name: "Boat Air Buds",
      img: "https://images.pexels.com/photos/12405330/pexels-photo-12405330.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 2,
      name: "Boat Air Buds",
      img: "https://images.pexels.com/photos/12405330/pexels-photo-12405330.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 3,
      name: "Boat Air Buds",
      img: "https://images.pexels.com/photos/12405330/pexels-photo-12405330.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 4,
      name: "Boat Air Buds",
      img: "https://images.pexels.com/photos/12405330/pexels-photo-12405330.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
  ];

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description "
      >
        <DialogTitle>{"Add product to this category"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="flex flex-col gap-3"
          >
            {productList?.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between min-w-96 hover:bg-blue-300 px-2 py-2 cursor-pointer rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className=" relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    ></Image>
                  </div>
                  <p>{product?.name}</p>
                </div>
                <input type="checkbox" name="" id="" />
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
            onClick={handleClose}
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
