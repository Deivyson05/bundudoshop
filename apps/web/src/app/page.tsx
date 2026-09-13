import { getProducts } from '@/lib/api';
import { ProductGrid } from '@/components/product-grid';

export const revalidate = 60;

export default async function HomePage() {
  const products = await getProducts().catch(() => []);

  return (
    <main className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink-900 dark:text-ink-50">
          Bundudo Shop
        </h1>
        <p className="mt-1 max-w-md text-sm text-ink-600 dark:text-ink-400">
          Achados da internet, garimpados um por um. Clique para ver a oferta.
        </p>
      </header>

      <ProductGrid products={products} />
    </main>
  );
}
