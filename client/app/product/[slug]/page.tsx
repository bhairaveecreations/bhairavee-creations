// app/product/[slug]/page.tsx

import ProductView from "@/components/product/ProductView";

async function getProduct(slug: string) {
  const res = await fetch(
    `http://localhost:5000/api/products/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Product not found");
  }

  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return <ProductView product={product} />;
}