"use client";

import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {

  const { 
    items,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCartStore();

  const { user } = useAuthStore();
  const router = useRouter();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const DELIVERY_FEE = subtotal > 5000 ? 0 : 499;

  const total = subtotal + DELIVERY_FEE;

  const handleDecrease = (item: any) => {
    if (item.quantity === 1) {
      removeFromCart(item.productId);
    } else {
      decreaseQty(item.productId);
    }
  };

  const handleCheckout = () => {

    if (!user) {
      router.push("/login?redirect=/checkout");
      return;
    }

    router.push("/checkout");

  };

  return (

    <main className="bg-[#F8F6F2] min-h-screen py-16 px-4 overflow-x-hidden">

      <div className="max-w-6xl mx-auto">

        {/* PAGE TITLE */}

        <h1 className="text-4xl font-serif text-[#2B1B14] mb-10 text-center">
          Your Sacred Cart
        </h1>

        {/* EMPTY CART */}

        {items.length === 0 && (

          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

            <p className="text-gray-500 mb-6">
              Your cart is currently empty.
            </p>

            <Link
              href="/shop"
              className="bg-[#D4AF37] px-8 py-3 rounded-full text-black hover:shadow-md transition"
            >
              Explore Creations
            </Link>

          </div>

        )}

        {/* CART CONTENT */}

        {items.length > 0 && (

          <div className="grid md:grid-cols-3 gap-8 md:m-2">

            {/* CART ITEMS */}

            <div className="md:col-span-2 space-y-5">

              {items.map((item) => (

                <div
                  key={item.productId}
                  className="bg-white rounded-2xl shadow-sm p-4"
                >

                  <div className="flex gap-4">

                    {/* IMAGE */}

                    <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-[#F8F6F2]">

                      <Image
                        src={item.image || "/placeholder.png"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />

                    </div>

                    {/* INFO */}

                    <div className="flex-1 min-w-0">

                      <p className="font-serif text-lg text-[#2B1B14] leading-snug">
                        {item.title}
                      </p>

                      <p className="text-gray-500 text-sm mt-1">
                        ₹{item.price}
                      </p>

                    </div>

                  </div>

                  {/* CONTROLS */}

                  <div className="flex items-center justify-between mt-4">

                    <div className="flex items-center gap-3">

                      <button
                        onClick={() => handleDecrease(item)}
                        className="w-9 h-9 border rounded-lg hover:bg-gray-100"
                      >
                        –
                      </button>

                      <span className="font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item.productId)}
                        className="w-9 h-9 border rounded-lg hover:bg-gray-100"
                      >
                        +
                      </button>

                    </div>

                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>

                  </div>

                  {/* ITEM TOTAL */}

                  <div className="flex justify-between mt-4 text-sm text-gray-600">

                    <span>Item Total</span>

                    <span className="font-semibold text-[#2B1B14]">
                      ₹{item.price * item.quantity}
                    </span>

                  </div>

                </div>

              ))}

            </div>

            {/* ORDER SUMMARY */}

            <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">

              <h2 className="font-serif text-xl text-[#2B1B14] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 text-gray-600">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>₹{DELIVERY_FEE}</span>
                </div>

              </div>

              <div className="border-t mt-6 pt-5 flex justify-between text-lg font-semibold text-[#2B1B14]">

                <span>Total</span>
                <span>₹{total}</span>

              </div>

              {/* CHECKOUT BUTTON */}

              <button
                onClick={handleCheckout}
                className="mt-7 w-full text-center bg-[#2B1B14] text-white py-3 rounded-full hover:shadow-md transition"
              >
                Proceed to Checkout
              </button>

            </div>

          </div>

        )}

      </div>

    </main>

  );

}