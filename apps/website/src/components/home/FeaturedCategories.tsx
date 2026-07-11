'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Globe, LayoutGrid, ShoppingCart, Palette, Smartphone, Code } from 'lucide-react';

export function FeaturedCategories() {
  const categories = [
    {
      name: 'Website Templates',
      icon: Globe,
      count: '2.5K',
      href: '/templates?category=website',
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'WordPress',
      icon: LayoutGrid,
      count: '1.8K',
      href: '/templates?category=wordpress',
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'E-commerce',
      icon: ShoppingCart,
      count: '1.2K',
      href: '/templates?category=ecommerce',
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'UI Kits',
      icon: Palette,
      count: '950',
      href: '/templates?category=uikits',
      color: 'from-pink-500 to-pink-600',
    },
    {
      name: 'Mobile Apps',
      icon: Smartphone,
      count: '680',
      href: '/templates?category=mobile',
      color: 'from-orange-500 to-orange-600',
    },
    {
      name: 'Admin Dashboards',
      icon: Code,
      count: '420',
      href: '/templates?category=admin',
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  return (
    <div className='bg-white py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Browse by Category
          </h2>
          <p className='text-gray-600 text-lg'>
            Find the perfect template for your specific needs
          </p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6'>
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className='group'
            >
              <motion.div
                whileHover={{ y: -4 }}
                className='bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-gray-300'
              >
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br ${category.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <category.icon className='h-7 w-7' />
                </div>
                <h3 className='font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors'>
                  {category.name}
                </h3>
                <p className='text-sm text-gray-500'>
                  {category.count} templates
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
