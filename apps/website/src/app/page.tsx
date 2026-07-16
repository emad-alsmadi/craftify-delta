'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { TemplatesQuery } from '@/types';
import { useTemplates } from '@/hooks/templates/templatesQuery';
import { HeroSection } from '@/components/home/HeroSection';
import { TrendingTemplates } from '@/components/home/TrendingTemplates';
import { NewArrivals } from '@/components/home/NewArrivals';
import { Testimonials } from '@/components/home/Testimonials';
import { TopCreators } from '@/components/home/TopCreators';
import { CTASection } from '@/components/home/CTASection';
import { BestSellingTemplates } from '@/components/home/BestSellingTemplates';
import { PopularCategories } from '@/components/home/PopularCategories';

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState<TemplatesQuery>({
    page: 1,
    limit: 8,
    sort: 'createdAt',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const stableQuery = useMemo(() => query, [query]);
  const templatesQuery = useTemplates(stableQuery);
  const data = templatesQuery.data;
  const loading = templatesQuery.isLoading;
  const error = (templatesQuery.error as any)?.message || null;

  const handlePageChange = (page: number) => {
    setQuery((q: TemplatesQuery) => ({ ...q, page }));
  };

  const handleFiltersChange = (newFilters: any) => {
    setQuery((q: TemplatesQuery) => ({ ...q, ...newFilters, page: 1 }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/templates?q=${encodeURIComponent(searchQuery)}`);
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

      <TrendingTemplates
        templates={data?.data || []}
        loading={loading}
        error={error}
        gridVariants={gridVariants}
        itemVariants={itemVariants}
      />

      <NewArrivals
        templates={data?.data || []}
        loading={loading}
        error={error}
        gridVariants={gridVariants}
        itemVariants={itemVariants}
      />

      <BestSellingTemplates
        templates={data?.data || []}
        loading={loading}
        error={error}
        gridVariants={gridVariants}
        itemVariants={itemVariants}
      />

      <TopCreators />

      <Testimonials />

      <CTASection />
    </div>
  );
}
