import { motion } from 'framer-motion'
import { Search, Plus, MoreVertical } from 'lucide-react'

const products = [
  { id: 1, title: 'MAC Retro Matte Lipcolour', category: 'Makeup', subcategory: 'Lips', price: '$24.00', stock: 150, rating: 4.8 },
  { id: 2, title: 'Chanel No. 5 Eau de Parfum', category: 'Perfumes', subcategory: 'Women', price: '$150.00', stock: 80, rating: 4.9 },
  { id: 3, title: 'Dior Addict Lipstick', category: 'Makeup', subcategory: 'Lips', price: '$42.00', stock: 120, rating: 4.7 },
  { id: 4, title: 'NARS Orgasm Blush', category: 'Makeup', subcategory: 'Face', price: '$32.00', stock: 180, rating: 4.6 },
  { id: 5, title: 'Estée Lauder Double Wear Foundation', category: 'Makeup', subcategory: 'Face', price: '$44.00', stock: 140, rating: 4.8 },
]

export default function Products() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Product Management
        </h1>
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
          <option>All Categories</option>
          <option>Makeup</option>
          <option>Perfumes</option>
          <option>Skincare</option>
          <option>Clothing</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="h-48 bg-gradient-to-br from-fuchsia-400 to-purple-500" />
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {product.title}
                </h3>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {product.category} - {product.subcategory}
              </p>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-500 dark:text-gray-400">
                  Stock: {product.stock}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {product.price}
                </span>
                <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">                  
                  <span>⭐ {product.rating}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
