'use client';

import { useMe } from '@/hooks/auth/authQuery';
import { useUserLicenses } from '@/hooks/licenses/licensesQuery';
import { motion } from 'framer-motion';
import {
  Shield,
  Calendar,
  CheckCircle,
  AlertCircle,
  Copy,
  Download,
  ExternalLink,
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function LicensesPage() {
  const meQuery = useMe();
  const user = meQuery.data?.user || null;
  const { toast } = useToast();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const licensesQuery = useUserLicenses(user?._id || '');
  const licenses = licensesQuery.data || [];
  const loading = licensesQuery.isLoading;

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    toast('تم نسخ مفتاح الترخيص بنجاح');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!user) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center'>
        <div className='text-center'>
          <Shield className='h-16 w-16 text-emerald-600 mx-auto mb-4' />
          <h2 className='text-2xl font-bold text-emerald-900 mb-2'>
            يرجى تسجيل الدخول
          </h2>
          <p className='text-emerald-700'>
            يجب تسجيل الدخول لعرض تراخيصك
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-12'
        >
          <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg mb-6'>
            <Shield className='h-10 w-10 text-white' />
          </div>
          <h1 className='text-4xl font-extrabold text-emerald-900 mb-3'>
            تراخيصي
          </h1>
          <p className='text-lg text-emerald-700'>
            إدارة وعرض جميع تراخيصك المشتراة
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'
        >
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200 shadow-sm'>
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-emerald-100 rounded-xl'>
                <Shield className='h-6 w-6 text-emerald-600' />
              </div>
              <div>
                <p className='text-sm font-semibold text-emerald-600'>إجمالي التراخيص</p>
                <p className='text-2xl font-bold text-emerald-900'>{licenses.length}</p>
              </div>
            </div>
          </div>
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-sm'>
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-green-100 rounded-xl'>
                <CheckCircle className='h-6 w-6 text-green-600' />
              </div>
              <div>
                <p className='text-sm font-semibold text-green-600'>نشطة</p>
                <p className='text-2xl font-bold text-green-900'>
                  {licenses.filter((l) => !isExpired(l.expiryDate)).length}
                </p>
              </div>
            </div>
          </div>
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200 shadow-sm'>
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-amber-100 rounded-xl'>
                <AlertCircle className='h-6 w-6 text-amber-600' />
              </div>
              <div>
                <p className='text-sm font-semibold text-amber-600'>منتهية</p>
                <p className='text-2xl font-bold text-amber-900'>
                  {licenses.filter((l) => isExpired(l.expiryDate)).length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Licenses List */}
        {loading ? (
          <div className='text-center py-12'>
            <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent' />
            <p className='mt-4 text-emerald-700'>جاري التحميل...</p>
          </div>
        ) : licenses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-center py-16'
          >
            <div className='inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-100 mb-6'>
              <Shield className='h-12 w-12 text-emerald-400' />
            </div>
            <h3 className='text-xl font-bold text-emerald-900 mb-2'>
              لا توجد تراخيص
            </h3>
            <p className='text-emerald-700 mb-6'>
              لم تقم بشراء أي تراخيص بعد
            </p>
            <a
              href='/templates'
              className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl'
            >
              <ExternalLink className='h-5 w-5' />
              تصفح القوالب
            </a>
          </motion.div>
        ) : (
          <div className='space-y-6'>
            {licenses.map((license, index) => {
              const expired = isExpired(license.expiryDate);
              return (
                <motion.div
                  key={license._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white/90 backdrop-blur-sm rounded-2xl border-2 shadow-sm overflow-hidden ${expired ? 'border-amber-300 opacity-75' : 'border-emerald-200'}`}
                >
                  {/* License Header */}
                  <div className={expired ? 'p-6 bg-amber-50' : 'p-6 bg-gradient-to-r from-emerald-50 to-green-50'}>
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                      <div className='flex items-center gap-4'>
                        <div className={`p-3 rounded-xl ${expired ? 'bg-amber-200' : 'bg-gradient-to-br from-emerald-500 to-green-600'}`}>
                          <Shield className={`h-6 w-6 ${expired ? 'text-amber-700' : 'text-white'}`} />
                        </div>
                        <div>
                          <h3 className='text-xl font-bold text-emerald-900'>
                            {license.templateId?.title || 'قالب غير معروف'}
                          </h3>
                          <p className='text-sm text-emerald-700'>
                            {license.licenseTypeId?.name || 'ترخيص قياسي'}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        {expired ? (
                          <span className='inline-flex items-center gap-1 px-3 py-1 bg-amber-200 text-amber-800 text-sm font-semibold rounded-lg'>
                            <AlertCircle className='h-4 w-4' />
                            منتهي
                          </span>
                        ) : (
                          <span className='inline-flex items-center gap-1 px-3 py-1 bg-green-200 text-green-800 text-sm font-semibold rounded-lg'>
                            <CheckCircle className='h-4 w-4' />
                            نشط
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* License Details */}
                  <div className='p-6 space-y-4'>
                    {/* License Key */}
                    <div>
                      <label className='block text-sm font-semibold text-emerald-700 mb-2'>
                        مفتاح الترخيص
                      </label>
                      <div className='flex gap-2'>
                        <div className='flex-1 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl font-mono text-sm text-emerald-900'>
                          {license.licenseKey}
                        </div>
                        <button
                          onClick={() => copyToClipboard(license.licenseKey)}
                          className={`px-4 py-3 rounded-xl font-semibold transition-all ${copiedKey === license.licenseKey ? 'bg-green-500 text-white' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}
                        >
                          <Copy className='h-5 w-5' />
                        </button>
                      </div>
                    </div>

                    {/* Expiry Date */}
                    <div className='flex items-center gap-4'>
                      <div className='flex items-center gap-2 text-emerald-700'>
                        <Calendar className='h-5 w-5' />
                        <span className='text-sm font-semibold'>
                          تاريخ الانتهاء:
                        </span>
                      </div>
                      <span className={`font-semibold ${expired ? 'text-amber-600' : 'text-emerald-900'}`}>
                        {formatDate(license.expiryDate)}
                      </span>
                    </div>

                    {/* Features */}
                    {license.licenseTypeId?.features && license.licenseTypeId.features.length > 0 && (
                      <div>
                        <label className='block text-sm font-semibold text-emerald-700 mb-2'>
                          المميزات
                        </label>
                        <ul className='space-y-2'>
                          {license.licenseTypeId.features.map((feature: string, idx: number) => (
                            <li key={idx} className='flex items-center gap-2 text-sm text-emerald-800'>
                              <CheckCircle className='h-4 w-4 text-emerald-500 shrink-0' />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Restrictions */}
                    {license.licenseTypeId?.restrictions && license.licenseTypeId.restrictions.length > 0 && (
                      <div>
                        <label className='block text-sm font-semibold text-emerald-700 mb-2'>
                          القيود
                        </label>
                        <ul className='space-y-2'>
                          {license.licenseTypeId.restrictions.map((restriction: string, idx: number) => (
                            <li key={idx} className='flex items-center gap-2 text-sm text-amber-800'>
                              <AlertCircle className='h-4 w-4 text-amber-500 shrink-0' />
                              {restriction}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Support Duration */}
                    {license.licenseTypeId?.supportDuration && (
                      <div className='flex items-center gap-2 text-sm text-emerald-700'>
                        <span className='font-semibold'>مدة الدعم:</span>
                        <span>{license.licenseTypeId.supportDuration} أشهر</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className='px-6 pb-6'>
                    <a
                      href={`/templates/${license.templateId?._id}`}
                      className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl'
                    >
                      <Download className='h-5 w-5' />
                      تحميل القالب
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
