'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ProductCard } from '@/components/product-card';
import type { Product } from '@/types/product';

export function ProductGrid({ products }: { products: Product[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('[data-card]');
    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.04,
      },
    );
  }, [products]);

  if (products.length === 0) {
    return (
      <p className="py-24 text-center text-sm text-ink-400">
        Nenhum achado por aqui ainda. Volte em breve.
      </p>
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
    >
      {products.map((product) => (
        <div key={product.id} data-card>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
