import React from 'react';

import KeylanceFooterContainer from '../../components/KeylanceFooterContainer';
import Navbar from '../../components/Navbar';

const faqs = [
  {
    id: 1,
    question: 'Why should I use a password manager?',
    answer:
      'A password manager helps you store and manage your passwords securely. It generates strong, unique passwords for each account and auto-fills login forms, making it easy to maintain good password hygiene and reduce the risk of data breaches.',
  },
  {
    id: 2,
    question: 'How secure is the password manager?',
    answer:
      'Our password manager uses state-of-the-art encryption methods to protect your data. Your master password is never stored on our servers, which means only you can access your passwords. We also offer additional security features like two-factor authentication.',
  },
  {
    id: 3,
    question: 'What if I forget my master password?',
    answer:
      'Your master password is the key to unlocking your password manager. If you forget it, we cannot retrieve it for you. We recommend using a password recovery method, like a secure email or a printed recovery code, to ensure you can regain access to your account.',
  },
  {
    id: 4,
    question: 'Can I share passwords with others?',
    answer:
      'Yes, our password manager allows you to securely share passwords with other users. You can control their access levels and revoke permissions at any time, ensuring sensitive information remains protected.',
  },
  {
    id: 5,
    question: 'Does the password manager support two-factor authentication?',
    answer:
      'Yes, our password manager supports two-factor authentication (2FA) to add an extra layer of security to your account. You can enable 2FA using popular methods like authenticator apps, SMS codes, or hardware tokens.',
  },
  {
    id: 6,
    question: 'Can I import my existing passwords?',
    answer:
      'Yes, our password manager allows you to import passwords from other password managers, web browsers, or CSV files. The import process is straightforward, ensuring a seamless transition to our platform.',
  },
  {
    id: 7,
    question: 'Is the password manager available on multiple devices?',
    answer:
      'Yes, our password manager is available on various devices and platforms, including Windows, macOS, Android, iOS, and web browsers. You can sync your passwords across devices, making it easy to access them wherever you are.',
  },
  {
    id: 8,
    question: 'How do I update my passwords regularly?',
    answer:
      'Our password manager offers an easy way to update passwords through its built-in password generator. You can set reminders to update your passwords regularly and use the generator to create strong, unique passwords for each account.',
  },
  {
    id: 9,
    question: 'What types of data can I store in the password manager?',
    answer:
      'In addition to passwords, our password manager allows you to store other sensitive information like credit card details, secure notes, and personal identification numbers. You can also add custom fields to store specific data types.',
  },
  {
    id: 10,
    question: 'How much does the password manager cost?',
    answer:
      'Our password manager offers both free and premium plans. The free plan provides basic features, while the premium plan includes advanced features like password sharing, priority support, and additional storage. Check our pricing page for more details.',
  },
];

const FaqPage = () => {
  return (
    <div className='flex h-screen w-screen flex-col items-stretch justify-start' id='main'>
      <Navbar />
      <div className='bg-white'>
        <div className='mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900'>
              Frequently asked questions
            </h2>
            <p className='mt-6 text-base leading-7 text-gray-600'>
              Have a different question and can’t find the answer you’re looking for? Reach out to
              our support team by{' '}
              <a href='#' className='font-semibold text-indigo-600 hover:text-indigo-500'>
                sending us an email
              </a>{' '}
              and we’ll get back to you as soon as we can.
            </p>
          </div>
          <div className='mt-20'>
            <dl className='space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10'>
              {faqs.map((faq) => (
                <div key={faq.id}>
                  <dt className='text-base font-semibold leading-7 text-gray-900'>
                    {faq.question}
                  </dt>
                  <dd className='mt-2 text-base leading-7 text-gray-600'>{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <KeylanceFooterContainer />
    </div>
  );
};

export default FaqPage;
