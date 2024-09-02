"use client";
import { useState } from "react";

import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "../modal/modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { sleep } from "@/libs/helpers";
import { useNotificationContext } from "../notification/notification-context";
import Button from "../button/button";

const DeleteProduct: React.FC<{ productId: string }> = ({ productId }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { handleShowNotification, setMessage } = useNotificationContext();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/product/${productId}`);

      setMessage("Delete Succesful");
      await sleep(3000);
      handleCloseModal();
      handleShowNotification();
      await sleep(4000);
    } catch (error) {
      setMessage((error as Error).message);
      handleShowNotification();
    } finally {
      setLoading(false);
      router.push("/");
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={handleOpenModal}
        className="-mt-0.5 bg-transparent border-0 hover:scale-105 transition-transform duration-300"
      >
        <FaTrashAlt color="red" size={24} />
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="text-center w-full flex-row">
          <h2 className="font-bold text-xl">Delete Product</h2>
          <p className="mb-4">Are you sure you want to delete this product</p>
          <div className="flex gap-x-4 mx-auto">
            <Button
              disabled={loading}
              loading={false}
              onClick={handleCloseModal}
            >
              No
            </Button>
            <Button
              disabled={loading}
              loading={loading}
              onClick={handleDelete}
              className="bg-orange-500"
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteProduct;

{
  /* <button
disabled={loading}
className="bg-black px-10 md:px-20 py-2 rounded-lg text-white hover:scale-[1.01] transition-all duration-500"
onClick={handleCloseModal}
>
No
</button>
<Button 
disabled={loading}
loading={loading}
onClick={handleDelete}
className="bg-orange-500 disabled:bg-transparent px-10 md:px-20 py-2 rounded-lg text-white hover:scale-[1.01] transition-all duration-500">
Yes */
}
// </Button>
