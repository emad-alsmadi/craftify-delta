'use client';

import { motion } from 'framer-motion';
import { Sparkles, FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-12'
        >
          <div className='inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-extrabold text-indigo-700 mb-4'>
            <Sparkles className='h-4 w-4' />
            Legal
          </div>
          <h1 className='text-4xl font-extrabold text-gray-900 mb-4'>
            Terms of Service
          </h1>
          <p className='text-lg text-gray-600'>Last updated: January 1, 2024</p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white rounded-2xl border border-gray-200 p-8 space-y-8'
        >
          <section>
            <h2 className='text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <FileText className='h-6 w-6 text-fuchsia-600' />
              1. Acceptance of Terms
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              By accessing and using Craftify, you accept and agree to be bound
              by the terms and provision of this agreement. If you do not agree
              to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              2. User Accounts
            </h2>
            <p className='text-gray-600 leading-relaxed mb-4'>
              You are responsible for maintaining the confidentiality of your
              account and password. You agree to accept responsibility for all
              activities that occur under your account or password.
            </p>
            <p className='text-gray-600 leading-relaxed'>
              Craftify reserves the right to refuse access to the website to any
              user at any time for any reason.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              3. License to Use
            </h2>
            <p className='text-gray-600 leading-relaxed mb-4'>
              Craftify grants you a personal, non-exclusive, non-transferable
              license to use the templates and resources available on this
              platform for personal and commercial purposes.
            </p>
            <p className='text-gray-600 leading-relaxed'>
              You may not resell, redistribute, or sublicense the templates
              as-is. You may use them in client projects and derivative works.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              4. Payment Terms
            </h2>
            <p className='text-gray-600 leading-relaxed mb-4'>
              All purchases are final and non-refundable, except in cases where
              the template is significantly different from its description or
              has technical issues that cannot be resolved.
            </p>
            <p className='text-gray-600 leading-relaxed'>
              Prices for our products are subject to change without notice. We
              reserve the right at any time to modify or discontinue the Service
              without notice.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              5. Intellectual Property
            </h2>
            <p className='text-gray-600 leading-relaxed mb-4'>
              All content on Craftify, including text, graphics, logos, images,
              and software, is the property of Craftify or its content suppliers
              and is protected by international copyright laws.
            </p>
            <p className='text-gray-600 leading-relaxed'>
              Creators retain ownership of their templates and grant Craftify a
              license to distribute and sell their work on the platform.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              6. User Conduct
            </h2>
            <p className='text-gray-600 leading-relaxed mb-4'>
              You agree not to use the service for any unlawful purpose, or to
              solicit others to perform or participate in any unlawful acts.
            </p>
            <p className='text-gray-600 leading-relaxed'>
              You may not upload, post, or otherwise transmit any content that
              is infringing, libelous, defamatory, obscene, or otherwise
              objectionable.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              7. Limitation of Liability
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              In no event shall Craftify be liable for any indirect, incidental,
              special, consequential, or punitive damages arising out of or
              related to your use of the service.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              8. Changes to Terms
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              Craftify reserves the right to modify these terms at any time.
              Your continued use of the service following any such modification
              constitutes your acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              9. Contact Information
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              If you have any questions about these Terms of Service, please
              contact us at support@craftify.com
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
