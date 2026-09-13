import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { Product } from '@/types/product';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group flex flex-col overflow-hidden transition-colors hover:border-garimpo-500">
      <a
        href={product.affiliateLink}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="flex flex-col"
      >
        <div className="relative aspect-square w-full bg-ink-100 dark:bg-ink-800">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex items-start justify-between gap-2 p-4">
          <h2 className="line-clamp-2 text-sm leading-snug text-ink-800 dark:text-ink-100">
            {product.name}
          </h2>
          <ArrowUpRight
            className="mt-0.5 h-4 w-4 shrink-0 text-ink-400 transition-colors group-hover:text-garimpo-500"
            aria-hidden="true"
          />
        </div>
      </a>
    </Card>
  );
}
