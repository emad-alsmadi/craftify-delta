import { motion } from 'framer-motion'
import { Search, Plus, MoreVertical } from 'lucide-react'

const templates = [
  { id: 1, title: 'E-commerce Template', category: 'Business', price: '$49', downloads: 234, rating: 4.8 },
  { id: 2, title: 'Portfolio Template', category: 'Creative', price: '$29', downloads: 567, rating: 4.9 },
  { id: 3, title: 'Blog Template', category: 'Blog', price: '$19', downloads: 890, rating: 4.7 },
  { id: 4, title: 'SaaS Dashboard', category: 'Business', price: '$79', downloads: 123, rating: 4.6 },
  { id: 5, title: 'Landing Page', category: 'Marketing', price: '$39', downloads: 456, rating: 4.8 },
]

export default function Templates() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Template Management
        </h1>
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add Template
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
          <option>All Categories</option>
          <option>Business</option>
          <option>Creative</option>
          <option>Blog</option>
          <option>Marketing</option>
        </select>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500" />
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {template.title}
                </h3>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {template.category}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {template.price}
                </span>
                <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                  <span>{template.downloads} downloads</span>
                  <span>⭐ {template.rating}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
