'use client';
import { useMemo, useState } from 'react';
import { TemplateCard } from '@/components/TemplateCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { Pagination } from '@/components/ui/Pagination';
import {
  Loader2,
  Search,
  LayoutGrid,
  ShoppingCart,
  Sparkles,
  Users,
  Heart,
} from 'lucide-react';
import { Template } from '@/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { TemplatesQuery } from '@/types';
import { useTemplates } from '@/hooks/templates/templatesQuery';

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
    <div className='space-y-6'>
      {/* Hero Section - Split Layout */}
      <div className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
            {/* Left Side - Search and Content */}
            <div className='space-y-6'>
              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight'>
                Find the Perfect Template for Your Next Project
              </h1>
              <p className='text-lg sm:text-xl text-white/90'>
                Browse thousands of premium templates crafted by professional
                creators
              </p>

              {/* Search Box */}
              <form
                onSubmit={handleSearch}
                className='relative max-w-xl'
              >
                <input
                  type='text'
                  placeholder='Search templates...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full pl-12 pr-4 py-4 rounded-xl border-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg'
                />
                <Search className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
              </form>

              {/* Quick Links */}
              <div className='flex flex-wrap gap-3'>
                <Link
                  href='/templates?category=website'
                  className='inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors'
                >
                  <LayoutGrid className='h-4 w-4' />
                  Website Templates
                </Link>
                <Link
                  href='/templates?category=wordpress'
                  className='inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors'
                >
                  <LayoutGrid className='h-4 w-4' />
                  WordPress Themes
                </Link>
                <Link
                  href='/templates?category=ecommerce'
                  className='inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors'
                >
                  <ShoppingCart className='h-4 w-4' />
                  E-commerce
                </Link>
              </div>
            </div>

            {/* Right Side - Images */}
            <div className='hidden lg:grid grid-cols-2 gap-4'>
              <div className='space-y-4'>
                <div className='aspect-[4/3] rounded-2xl bg-white/20 backdrop-blur-sm overflow-hidden shadow-2xl'>
                  <div className='w-full h-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center'>
                    <LayoutGrid className='h-16 w-16 text-white/50' />
                  </div>
                </div>
                <div className='aspect-[4/3] rounded-2xl bg-white/20 backdrop-blur-sm overflow-hidden shadow-2xl'>
                  <div className='w-full h-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center'>
                    <Sparkles className='h-16 w-16 text-white/50' />
                  </div>
                </div>
              </div>
              <div className='space-y-4 mt-8'>
                <div className='aspect-[4/3] rounded-2xl bg-white/20 backdrop-blur-sm overflow-hidden shadow-2xl'>
                  <div className='w-full h-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center'>
                    <Users className='h-16 w-16 text-white/50' />
                  </div>
                </div>
                <div className='aspect-[4/3] rounded-2xl bg-white/20 backdrop-blur-sm overflow-hidden shadow-2xl'>
                  <div className='w-full h-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center'>
                    <Heart className='h-16 w-16 text-white/50' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className='bg-gray-50 border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            <div className='text-center'>
              <div className='text-3xl font-bold text-gray-900'>10K+</div>
              <div className='text-sm text-gray-600'>Templates</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-gray-900'>500+</div>
              <div className='text-sm text-gray-600'>Creators</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-gray-900'>50K+</div>
              <div className='text-sm text-gray-600'>Downloads</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-gray-900'>4.9</div>
              <div className='text-sm text-gray-600'>Avg Rating</div>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]'>
        <aside className='lg:sticky lg:top-24 lg:self-start'>
          <FilterSidebar
            filters={query}
            onFiltersChange={handleFiltersChange}
          />
        </aside>

        <div className='min-w-0'>
          {loading && (
            <div className='rounded-3xl border border-white/40 bg-white/50 p-5 shadow-sm backdrop-blur-xl'>
              <div className='flex items-center gap-3'>
                <Loader2 className='h-5 w-5 animate-spin text-fuchsia-600' />
                <div className='text-sm font-semibold text-indigo-950/80'>
                  Loading templates...
                </div>
              </div>
              <div className='mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className='h-[260px] animate-pulse rounded-3xl border border-white/30 bg-white/30'
                  />
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className='rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-900'>
              <p className='font-semibold'>{error}</p>
              <button
                onClick={() => templatesQuery.refetch()}
                className='mt-2 underline'
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && data && (
            <>
              <div className='rounded-3xl border border-white/40 bg-white/50 p-5 shadow-sm backdrop-blur-xl'>
                <p className='text-sm font-semibold text-indigo-950/80'>
                  Showing {data.data.length} of {data.meta.total} templates
                </p>
              </div>

              <motion.div
                variants={gridVariants}
                initial='hidden'
                animate='show'
                className='mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              >
                {data.data.map((template: Template) => (
                  <motion.div
                    key={template._id}
                    variants={itemVariants}
                  >
                    <TemplateCard template={template} />
                  </motion.div>
                ))}
              </motion.div>

              {data.meta.pages > 1 && (
                <div className='mt-8 flex justify-center'>
                  <Pagination
                    currentPage={data.meta.page}
                    totalPages={data.meta.pages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
