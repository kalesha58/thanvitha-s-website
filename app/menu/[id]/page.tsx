import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/product-page";
import { getProduct, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/menu/[id]">): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Meal" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function Page({ params }: PageProps<"/menu/[id]">) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();
  return <ProductDetailPage product={product} />;
}
