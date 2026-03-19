import ProductView from "@/components/product/ProductView";

// ✅ SAFE FETCH FUNCTION
async function getProduct(slug: string) {

  const API = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(
      `${API}/products/${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return null; // ✅ don't crash app
    }

    return res.json();

  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}


// ✅ MAIN PAGE (FIXED PARAMS)
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  // 🔥 IMPORTANT FIX
  const { slug } = await params;

  const product = await getProduct(slug);

  // ✅ SAFE FALLBACK UI
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F6F2]">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-[#2B1B14]">
            Product Not Found
          </h1>
          <p className="text-gray-500 mt-2">
            The product you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return <ProductView product={product} />;
}