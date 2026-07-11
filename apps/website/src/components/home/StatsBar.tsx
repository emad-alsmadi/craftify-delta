'use client';

export function StatsBar() {
  const stats = [
    { value: '10K+', label: 'Templates' },
    { value: '500+', label: 'Creators' },
    { value: '50K+', label: 'Downloads' },
    { value: '4.9', label: 'Avg Rating' },
  ];

  return (
    <div className='bg-gray-50 border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          {stats.map((stat) => (
            <div key={stat.label} className='text-center'>
              <div className='text-3xl font-bold text-gray-900'>{stat.value}</div>
              <div className='text-sm text-gray-600'>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
