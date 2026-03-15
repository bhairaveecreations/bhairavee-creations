"use client";

export default function AddToCartToast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-6 right-6 z-[999] bg-white border shadow-xl rounded-xl px-6 py-4 flex items-center gap-3 animate-slideUp">
      
      <span className="text-green-600 text-xl">🛒</span>

      <div>
        <p className="font-semibold text-sm text-gray-800">
          Added to Cart
        </p>

        <p className="text-xs text-gray-600">
          {message}
        </p>
      </div>

    </div>
  );
}