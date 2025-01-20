/* eslint-disable react/prop-types */
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const PurchaseModal = ({
  closeModal,
  isOpen,
  totalPrice,
  refetch,
  cartItems,
  clearCart,
}) => {
  const [adress, setAdress] = useState("");

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Review Info Before Purchase
                </DialogTitle>

                {/* Address input field */}
                <div className="space-x-2 mt-2 text-sm">
                  <label htmlFor="address" className=" text-gray-600">
                    Address:
                  </label>
                  <input
                    className="p-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                    name="address"
                    id="address"
                    onChange={(e) =>
                      setAdress((prv) => {
                        return { ...prv, address: e.target.value };
                      })
                    }
                    onBlur={(e) =>
                      setAdress((prv) => {
                        return { ...prv, address: e.target.value };
                      })
                    }
                    type="text"
                    placeholder="Shipping Address.."
                    required
                  />
                </div>
                {/* CheckoutForm */}
                <Elements stripe={stripePromise}>
                  {/* Form component */}
                  <CheckoutForm
                    closeModal={closeModal}
                    adress={adress}
                    refetch={refetch}
                    totalPrice={totalPrice}
                    cartItems={cartItems}
                    clearCart={clearCart}
                  />
                </Elements>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PurchaseModal;
