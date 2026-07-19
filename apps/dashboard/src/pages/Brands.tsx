import { motion } from 'framer-motion'
import { Search, Plus, MoreVertical } from 'lucide-react'

const brands = [
  { id: 1, name: 'MAC Cosmetics', country: 'USA', website: 'maccosmetics.com', products: 3 },
  { id: 2, name: 'Chanel', country: 'France', website: 'chanel.com', products: 3 },
  { id: 3, name: 'Dior', country: 'France', website: 'dior.com', products: 3 },
  { id: 4, name: 'Sephora', country: 'France', website: 'sephora.com', products: 2 },
  { id: 5, name: 'NARS Cosmetics', country: 'USA', website: 'narscosmetics.com', products: 2 },
]

export default function Brands() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Brand Management
        </h1>
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add Brand
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search brands..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
          <option>All Countries</option>
          <option>USA</option>
          <option>France</option>
          <option>Italy</option>
          <option>Spain</option>
        </select>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand, index) => (
          <motion.div
            key={brand.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="h-48 bg-gradient-to-br from-purple-400 to-cyan-500 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">{brand.name.charAt(0)}</span>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {brand.name}
                </h3>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {brand.country}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {brand.website}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  {brand.products} Products
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
