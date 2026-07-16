'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is Craftify?',
        a: 'Craftify is a premium templates marketplace where creators can buy and sell high-quality website templates, UI kits, and design resources.',
      },
      {
        q: 'How do I purchase a template?',
        a: 'Simply browse our templates, click on the one you like, and click the "Add to Cart" button. You can then proceed to checkout and complete your purchase securely.',
      },
      {
        q: 'Can I use templates for commercial projects?',
        a: 'Yes! All templates on Craftify come with a commercial license that allows you to use them for client projects and commercial purposes.',
      },
    ],
  },
  {
    category: 'Licensing',
    questions: [
      {
        q: 'What license do I get with my purchase?',
        a: 'Each template comes with a standard commercial license that allows you to use the template in unlimited personal and commercial projects.',
      },
      {
        q: 'Can I resell the templates?',
        a: 'No, you cannot resell or redistribute the templates as-is. However, you can use them in client projects.',
      },
      {
        q: 'Do I need to attribute the creator?',
        a: "No attribution is required, though it's always appreciated if you mention the creator in your project credits.",
      },
    ],
  },
  {
    category: 'Payments & Refunds',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise purchases.',
      },
      {
        q: 'What is your refund policy?',
        a: "We offer a 14-day refund policy if the template doesn't work as described or has technical issues that cannot be resolved.",
      },
      {
        q: 'Are my payments secure?',
        a: 'Yes, all payments are processed through Stripe, which is PCI DSS compliant and uses industry-standard encryption.',
      },
    ],
  },
  {
    category: 'Support',
    questions: [
      {
        q: 'How do I get support for a template?',
        a: 'Each template has a support section where you can contact the creator directly. Premium members also get priority support.',
      },
      {
        q: 'Do you offer custom development services?',
        a: "We don't offer custom development directly, but many of our creators are available for freelance work through their profiles.",
      },
      {
        q: 'How do I report a bug or issue?',
        a: "You can report bugs through the template's support page or by contacting our support team directly.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<string | null>('General');
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
    setOpenQuestion(null);
  };

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-12'
        >
          <div className='inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-3 py-1 text-xs font-extrabold text-fuchsia-700 mb-4'>
            <Sparkles className='h-4 w-4' />
            Help Center
          </div>
          <h1 className='text-4xl font-extrabold text-gray-900 mb-4'>
            Frequently Asked Questions
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Find answers to common questions about Craftify, licensing,
            payments, and support
          </p>
        </motion.div>

        {/* FAQ Content */}
        <div className='grid lg:grid-cols-[300px_1fr] gap-8'>
          {/* Categories Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className='hidden lg:block'
          >
            <div className='bg-white rounded-2xl border border-gray-200 p-4 sticky top-24'>
              <h3 className='font-bold text-gray-900 mb-4 flex items-center gap-2'>
                <HelpCircle className='h-5 w-5 text-fuchsia-600' />
                Categories
              </h3>
              <nav className='space-y-1'>
                {faqs.map((faq) => (
                  <button
                    key={faq.category}
                    onClick={() => toggleCategory(faq.category)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      openCategory === faq.category
                        ? 'bg-fuchsia-50 text-fuchsia-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {faq.category}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Questions */}
          <div className='space-y-6'>
            {faqs.map((faq) => (
              <motion.div
                key={faq.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='bg-white rounded-2xl border border-gray-200 overflow-hidden'
              >
                {/* Mobile Category Header */}
                <button
                  onClick={() => toggleCategory(faq.category)}
                  className='lg:hidden w-full px-6 py-4 flex items-center justify-between border-b border-gray-200'
                >
                  <span className='font-bold text-gray-900'>
                    {faq.category}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      openCategory === faq.category ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Desktop Category Header */}
                <div className='hidden lg:block px-6 py-4 border-b border-gray-200 bg-gray-50'>
                  <h3 className='font-bold text-gray-900'>{faq.category}</h3>
                </div>

                {/* Questions */}
                <AnimatePresence>
                  {(openCategory === faq.category || !openCategory) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className='overflow-hidden'
                    >
                      {faq.questions.map((item, index) => (
                        <div
                          key={index}
                          className='border-b border-gray-200 last:border-b-0'
                        >
                          <button
                            onClick={() => toggleQuestion(index)}
                            className='w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors'
                          >
                            <span className='font-semibold text-gray-900 pr-4'>
                              {item.q}
                            </span>
                            <ChevronDown
                              className={`h-5 w-5 text-gray-500 transition-transform shrink-0 ${
                                openQuestion === index ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {openQuestion === index && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className='overflow-hidden'
                              >
                                <div className='px-6 pb-4 pt-2 text-gray-600'>
                                  {item.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='mt-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 rounded-2xl p-8 text-center text-white'
        >
          <h2 className='text-2xl font-extrabold mb-2'>
            Still have questions?
          </h2>
          <p className='text-white/90 mb-6'>
            Our support team is here to help you
          </p>
          <button className='inline-flex items-center gap-2 bg-white text-fuchsia-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors'>
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
}
