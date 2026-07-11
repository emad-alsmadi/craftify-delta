'use client';
import { useMemo, useState } from 'react';
import { TemplateCard } from '@/components/TemplateCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { Pagination } from '@/components/ui/Pagination';
import { Loader2 } from 'lucide-react';
import { Template } from '@/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { TemplatesQuery } from '@/types';
import { useTemplates } from '@/hooks/templates/templatesQuery';

export default function HomePage() {
  const [query, setQuery] = useState<TemplatesQuery>({
    page: 1,
    limit: 8,
    sort: 'createdAt',
  });

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
      {/* Hero Section - ThemeForest Style */}
      <div className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24'>
          <div className='max-w-3xl'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4'>
              Premium Digital Templates
            </h1>
            <p className='text-lg sm:text-xl text-white/90 mb-8'>
              Discover thousands of professionally designed templates for
              websites, apps, and more. Start your next project with confidence.
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Link
                href='/templates'
                className='inline-flex items-center justify-center rounded-lg bg-white text-indigo-600 px-8 py-3 text-base font-bold hover:bg-gray-100 transition-colors'
              >
                Browse Templates
              </Link>
              <Link
                href='/creators'
                className='inline-flex items-center justify-center rounded-lg border-2 border-white text-white px-8 py-3 text-base font-bold hover:bg-white/10 transition-colors'
              >
                Become a Creator
              </Link>
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
