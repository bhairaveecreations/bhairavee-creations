// app/product/[slug]/page.tsx

import ProductView from "@/components/product/ProductView";

async function getProduct(slug: string) {

  const API = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(
    `${API}/products/${slug}`,
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
  params: { slug: string };
}) {

  const product = await getProduct(params.slug);

  return <ProductView product={product} />;

}