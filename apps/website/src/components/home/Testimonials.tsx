'use client';

import { motion } from 'framer-motion';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Web Developer',
      content:
        'Craftify has been a game-changer for my freelance business. The templates are top-notch and save me countless hours of work.',
      rating: 5,
      avatar: 'SJ',
    },
    {
      name: 'Michael Chen',
      role: 'Agency Owner',
      content:
        'The quality of templates on Craftify is unmatched. We use them for all our client projects and they always impress.',
      rating: 5,
      avatar: 'MC',
    },
    {
      name: 'Emily Davis',
      role: 'Startup Founder',
      content:
        'As a startup, we needed professional templates on a budget. Craftify delivered exactly that with excellent support.',
      rating: 5,
      avatar: 'ED',
    },
  ];

  return (
    <div className='bg-white py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            What Our Customers Say
          </h2>
          <p className='text-gray-600 text-lg'>
            Join thousands of satisfied customers who trust Craftify
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              whileHover={{ y: -4 }}
              className='bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200'
            >
              <div className='flex items-center gap-1 mb-4'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className='h-5 w-5 text-yellow-400 fill-current'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                ))}
              </div>
              <p className='text-gray-700 mb-6 leading-relaxed'>
                {testimonial.content}
              </p>
              <div className='flex items-center gap-3'>
                <div className='inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-600 via-indigo-600 to-cyan-500 text-white font-bold'>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className='font-semibold text-gray-900'>
                    {testimonial.name}
                  </div>
                  <div className='text-sm text-gray-500'>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
