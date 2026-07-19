import { motion } from 'framer-motion';
import { Users, Package, ShoppingCart, DollarSign } from 'lucide-react';

const stats = [
  {
    icon: Users,
    label: 'Total Users',
    value: '2,543',
    change: '+12%',
    color: 'blue',
  },
  {
    icon: Package,
    label: 'Products',
    value: '1,234',
    change: '+8%',
    color: 'green',
  },
  {
    icon: ShoppingCart,
    label: 'Orders',
    value: '567',
    change: '+23%',
    color: 'purple',
  },
  {
    icon: DollarSign,
    label: 'Revenue',
    value: '$12,345',
    change: '+18%',
    color: 'yellow',
  },
];

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-8'>
        Dashboard Overview
      </h1>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'
            >
              <div className='flex items-center justify-between mb-4'>
                <div
                  className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900`}
                >
                  <Icon
                    className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`}
                  />
                </div>
                <span className='text-green-500 text-sm font-medium'>
                  {stat.change}
                </span>
              </div>
              <h3 className='text-gray-600 dark:text-gray-400 text-sm'>
                {stat.label}
              </h3>
              <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                {stat.value}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'
        >
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
            Revenue Overview
          </h2>
          <div className='h-64 flex items-center justify-center text-gray-400'>
            Chart placeholder - Add Recharts component here
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'
        >
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
            User Growth
          </h2>
          <div className='h-64 flex items-center justify-center text-gray-400'>
            Chart placeholder - Add Recharts component here
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'
      >
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
          Recent Activity
        </h2>
        <div className='space-y-4'>
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className='flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0'
            >
              <div className='flex items-center space-x-4'>
                <div className='w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center'>
                  <Users className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                </div>
                <div>
                  <p className='text-gray-900 dark:text-white font-medium'>
                    New user registered
                  </p>
                  <p className='text-gray-500 dark:text-gray-400 text-sm'>
                    2 minutes ago
                  </p>
                </div>
              </div>
              <span className='text-green-500 text-sm'>Completed</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
