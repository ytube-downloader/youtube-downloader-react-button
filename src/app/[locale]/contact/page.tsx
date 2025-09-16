import { useTranslations } from 'next-intl';

const ContactPage = () => {
  const t = useTranslations();

  return (
    <main className='px-5 lg:px-0 min-h-screen py-20'>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-heading_main dark:text-dark_heading_main mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-base_one dark:text-dark_base_one">
            Get in touch with our team for support and inquiries
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-dark_heading rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-heading_main dark:text-dark_heading_main mb-6">
              Send us a message
            </h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-heading_main dark:text-dark_heading_main mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-body dark:bg-dark_body text-heading_main dark:text-dark_heading_main focus:outline-none focus:ring-2 focus:ring-purple_main"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-heading_main dark:text-dark_heading_main mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-body dark:bg-dark_body text-heading_main dark:text-dark_heading_main focus:outline-none focus:ring-2 focus:ring-purple_main"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-heading_main dark:text-dark_heading_main mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-body dark:bg-dark_body text-heading_main dark:text-dark_heading_main focus:outline-none focus:ring-2 focus:ring-purple_main resize-none"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-purple_main text-white font-semibold py-3 px-6 rounded-xl hover:bg-opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple_main focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-dark_heading rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-heading_main dark:text-dark_heading_main mb-6">
                Get in touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple_main bg-opacity-10 rounded-xl flex items-center justify-center">
                    <span className="text-purple_main text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-heading_main dark:text-dark_heading_main">
                      Email
                    </h3>
                    <p className="text-base_one dark:text-dark_base_one">
                      support@yoursite.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple_main bg-opacity-10 rounded-xl flex items-center justify-center">
                    <span className="text-purple_main text-xl">⏰</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-heading_main dark:text-dark_heading_main">
                      Response Time
                    </h3>
                    <p className="text-base_one dark:text-dark_base_one">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark_heading rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-heading_main dark:text-dark_heading_main mb-6">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <details className="group">
                  <summary className="font-semibold text-heading_main dark:text-dark_heading_main cursor-pointer list-none flex items-center justify-between">
                    <span>How do I download videos?</span>
                    <span className="group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-base_one dark:text-dark_base_one mt-2 text-sm">
                    Simply paste the YouTube URL, choose your format, and click download.
                  </p>
                </details>
                
                <details className="group">
                  <summary className="font-semibold text-heading_main dark:text-dark_heading_main cursor-pointer list-none flex items-center justify-between">
                    <span>Is the service free?</span>
                    <span className="group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-base_one dark:text-dark_base_one mt-2 text-sm">
                    Yes, our YouTube video downloader is completely free to use.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;