import { products } from "../data/products";
import ProductCard from "./ProductCard";

interface ProductSectionProps {
  quantities: Record<string, number>;
  onQuantityChange: (productId: string, quantity: number) => void;
}

export default function ProductSection({ quantities, onQuantityChange }: ProductSectionProps) {
  return (
    <section id="products" className="py-16 sm:py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-clay-800 mb-2">
            আমাদের দই
          </h2>
          <p className="text-clay-500">আপনার পছন্দের দই বেছে নিন</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantities[product.id] || 0}
              onQuantityChange={(qty) => onQuantityChange(product.id, qty)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
