'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function TopCreators() {
  const creators = [
    {
      name: 'John Doe',
      templates: 245,
      sales: '12.5K',
      avatar: 'JD',
    },
    {
      name: 'Jane Smith',
      templates: 189,
      sales: '9.8K',
      avatar: 'JS',
    },
    {
      name: 'Mike Johnson',
      templates: 156,
      sales: '7.2K',
      avatar: 'MJ',
    },
    {
      name: 'Sarah Wilson',
      templates: 134,
      sales: '6.5K',
      avatar: 'SW',
    },
    {
      name: 'Tom Brown',
      templates: 112,
      sales: '5.8K',
      avatar: 'TB',
    },
  ];

  return (
    <div className='bg-slate-50 py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              Top Creators
            </h2>
            <p className='text-gray-600'>
              Meet our most talented template creators
            </p>
          </div>
          <Link
            href='/creators'
            className='inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-fuchsia-600 transition-colors'
          >
            View All
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
          {creators.map((creator) => (
            <Link
              key={creator.name}
              href='/creators'
              className='group'
            >
              <motion.div
                whileHover={{ y: -4 }}
                className='bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300 border border-slate-200 hover:border-slate-300'
              >
                <div className='inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-600 via-indigo-600 to-cyan-500 text-white text-xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300'>
                  {creator.avatar}
                </div>
                <h3 className='font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors'>
                  {creator.name}
                </h3>
                <p className='text-sm text-gray-500'>
                  {creator.templates} templates
                </p>
                <p className='text-sm text-gray-500'>{creator.sales} sales</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
