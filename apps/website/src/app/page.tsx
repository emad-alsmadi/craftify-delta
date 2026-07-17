'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ProductsQuery } from '@/types';
import { useProducts } from '@/hooks/products/productsQuery';
import { HeroSection } from '@/components/home/HeroSection';
import { Testimonials } from '@/components/home/Testimonials';
import { CTASection } from '@/components/home/CTASection';
import { PopularCategories } from '@/components/home/PopularCategories';

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState<ProductsQuery>({
    page: 1,
    limit: 8,
    sort: 'createdAt',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const stableQuery = useMemo(() => query, [query]);
  const productsQuery = useProducts(stableQuery);
  const data = productsQuery.data;
  const loading = productsQuery.isLoading;
  const error = (productsQuery.error as any)?.message || null;

  const handlePageChange = (page: number) => {
    setQuery((q: ProductsQuery) => ({ ...q, page }));
  };

  const handleFiltersChange = (newFilters: any) => {
    setQuery((q: ProductsQuery) => ({ ...q, ...newFilters, page: 1 }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className='space-y-0'>
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearch}
      />

      <PopularCategories />

      <Testimonials />

      <CTASection />
    </div>
  );
}
