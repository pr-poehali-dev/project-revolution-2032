import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'

const CATEGORIES = [
  { id: 'all', label: 'Все' },
  { id: 'juice', label: '💧 Жижи' },
  { id: 'pod', label: '🔋 Испарители' },
  { id: 'device', label: '⚡ Устройства' },
]

const PRODUCTS = [
  {
    id: 1, category: 'juice',
    name: 'Mango Ice Salt', brand: 'Brusko',
    price: 490, oldPrice: 690,
    ml: '30мл', nic: '20мг',
    image: 'https://cdn.poehali.dev/projects/df6e77b1-7f66-4912-8060-0c7bc1225d77/files/64a65c48-04b4-4918-8194-fd729497f60f.jpg',
    badge: 'Хит',
  },
  {
    id: 2, category: 'juice',
    name: 'Blueberry Mint', brand: 'ElMerlo',
    price: 520, oldPrice: null,
    ml: '30мл', nic: '20мг',
    image: 'https://cdn.poehali.dev/projects/df6e77b1-7f66-4912-8060-0c7bc1225d77/files/64a65c48-04b4-4918-8194-fd729497f60f.jpg',
    badge: null,
  },
  {
    id: 3, category: 'juice',
    name: 'Strawberry Cream', brand: 'WizLab',
    price: 450, oldPrice: 600,
    ml: '30мл', nic: '50мг',
    image: 'https://cdn.poehali.dev/projects/df6e77b1-7f66-4912-8060-0c7bc1225d77/files/64a65c48-04b4-4918-8194-fd729497f60f.jpg',
    badge: '-25%',
  },
  {
    id: 4, category: 'pod',
    name: 'Vaporesso XROS 3', brand: 'Vaporesso',
    price: 2490, oldPrice: 2990,
    ml: null, nic: null,
    image: 'https://cdn.poehali.dev/projects/df6e77b1-7f66-4912-8060-0c7bc1225d77/files/c0335f6c-6c0a-4247-b8c0-2d8b5226ceba.jpg',
    badge: 'Акция',
  },
  {
    id: 5, category: 'pod',
    name: 'SMOK Nord 5', brand: 'SMOK',
    price: 3200, oldPrice: null,
    ml: null, nic: null,
    image: 'https://cdn.poehali.dev/projects/df6e77b1-7f66-4912-8060-0c7bc1225d77/files/c0335f6c-6c0a-4247-b8c0-2d8b5226ceba.jpg',
    badge: 'Новинка',
  },
  {
    id: 6, category: 'device',
    name: 'Lost Vape Thelema', brand: 'Lost Vape',
    price: 5900, oldPrice: 7200,
    ml: null, nic: null,
    image: 'https://cdn.poehali.dev/projects/df6e77b1-7f66-4912-8060-0c7bc1225d77/files/f9e99600-255f-407f-ab3a-ddbfa57f9266.jpg',
    badge: '-18%',
  },
  {
    id: 7, category: 'device',
    name: 'Geekvape Aegis X', brand: 'Geekvape',
    price: 6400, oldPrice: null,
    ml: null, nic: null,
    image: 'https://cdn.poehali.dev/projects/df6e77b1-7f66-4912-8060-0c7bc1225d77/files/f9e99600-255f-407f-ab3a-ddbfa57f9266.jpg',
    badge: null,
  },
  {
    id: 8, category: 'pod',
    name: 'Elfbar BC5000', brand: 'Elfbar',
    price: 890, oldPrice: 1100,
    ml: null, nic: null,
    image: 'https://cdn.poehali.dev/projects/df6e77b1-7f66-4912-8060-0c7bc1225d77/files/f9e99600-255f-407f-ab3a-ddbfa57f9266.jpg',
    badge: 'Хит',
  },
]

interface CartItem {
  id: number
  name: string
  price: number
  qty: number
}

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const filtered = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory)

  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#09000f] text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#09000f]/90 backdrop-blur-md border-b border-[#2a1040]">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-white font-bold text-xl tracking-tight">
            Shuzik <span className="text-[#b366ff]">Shop</span>
          </a>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 bg-[#1a0530] hover:bg-[#2a1040] px-4 py-2 rounded-xl transition-colors"
          >
            <Icon name="ShoppingCart" size={20} className="text-[#b366ff]" />
            <span className="text-sm font-medium">Корзина</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#b366ff] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-32">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 mb-8 rounded-2xl overflow-hidden relative bg-gradient-to-r from-[#1a0530] to-[#0d0020] border border-[#2a1040] p-6 md:p-8"
          style={{ boxShadow: '0 0 40px rgba(179,102,255,0.1)' }}
        >
          <div className="absolute top-0 right-0 w-64 h-full opacity-20"
            style={{ background: 'radial-gradient(ellipse at right, #b366ff, transparent 70%)' }} />
          <Badge className="bg-[#ff6400] text-white border-0 mb-3">🔥 Акция</Badge>
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Обрушение цен!</h1>
          <p className="text-neutral-400 text-sm md:text-base">Скидки до 40% на жижи, испарители и устройства</p>
        </motion.div>

        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#b366ff] text-white shadow-[0_0_16px_#b366ff66]'
                  : 'bg-[#1a0530] text-neutral-400 hover:text-white hover:bg-[#2a1040]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          <AnimatePresence>
            {filtered.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-[#110020] border border-[#2a1040] rounded-2xl overflow-hidden flex flex-col hover:border-[#b366ff44] transition-colors group"
                style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-[#0d0018]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-lg ${
                      product.badge === 'Хит' ? 'bg-[#ff6400] text-white' :
                      product.badge === 'Новинка' ? 'bg-[#b366ff] text-white' :
                      'bg-[#b366ff] text-white'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col flex-1 gap-1">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{product.brand}</p>
                  <p className="text-sm font-semibold text-white leading-tight">{product.name}</p>
                  {(product.ml || product.nic) && (
                    <p className="text-[10px] text-neutral-500">{[product.ml, product.nic].filter(Boolean).join(' · ')}</p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#b366ff] font-bold text-base">{product.price} ₽</span>
                    {product.oldPrice && (
                      <span className="text-neutral-600 text-xs line-through">{product.oldPrice} ₽</span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addToCart(product)}
                    className="mt-2 w-full bg-[#b366ff] hover:bg-[#9933ff] text-white font-semibold rounded-xl text-sm transition-all hover:shadow-[0_0_16px_#b366ff66]"
                  >
                    Купить
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Sticky cart bar (mobile) */}
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4"
        >
          <button
            onClick={() => setCartOpen(true)}
            className="w-full max-w-lg mx-auto flex items-center justify-between bg-[#b366ff] hover:bg-[#9933ff] text-white px-5 py-4 rounded-2xl shadow-[0_0_32px_#b366ff88] transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="bg-white/20 rounded-lg px-2 py-0.5 text-sm font-bold">{totalItems}</span>
              <span className="font-semibold">Корзина</span>
            </div>
            <span className="font-bold">{totalPrice} ₽</span>
          </button>
        </motion.div>
      )}

      {/* Cart drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#110020] border-l border-[#2a1040] z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-[#2a1040]">
                <h2 className="font-bold text-lg">Корзина</h2>
                <button onClick={() => setCartOpen(false)} className="text-neutral-400 hover:text-white">
                  <Icon name="X" size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.length === 0 ? (
                  <p className="text-neutral-500 text-center mt-8">Корзина пуста</p>
                ) : cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-[#1a0530] rounded-xl p-3">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-[#b366ff] text-sm">{item.price * item.qty} ₽ · {item.qty} шт.</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-neutral-600 hover:text-red-400">
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {cart.length > 0 && (
                <div className="p-4 border-t border-[#2a1040]">
                  <div className="flex justify-between mb-4">
                    <span className="text-neutral-400">Итого</span>
                    <span className="font-bold text-xl text-[#b366ff]">{totalPrice} ₽</span>
                  </div>
                  <Button className="w-full bg-[#b366ff] hover:bg-[#9933ff] text-white font-semibold py-6 rounded-xl text-base shadow-[0_0_24px_#b366ff66]">
                    Оформить заказ
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
