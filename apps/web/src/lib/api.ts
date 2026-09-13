import type { Product } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

/**
 * Busca os produtos direto do backend (NestJS -> Postgres/NeonDB).
 * O frontend nunca escreve dados: este e o unico ponto de acesso a API,
 * e ele so faz GET.
 */
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`, {
    // Recarrega a lista periodicamente sem exigir rebuild do site.
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Falha ao buscar produtos (${res.status})`);
  }

  return res.json();
}
