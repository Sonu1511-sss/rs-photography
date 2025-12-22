import SEO from '../components/SEO';

const FAQ = () => {
  const faqs = [
    {
      q: 'Which areas do you serve?',
      a: 'We are based in Balaghat and Katangi (Kattangi), Madhya Pradesh, and travel across nearby cities and states for weddings.',
    },
    {
      q: 'How can I book RS Photography for my wedding?',
      a: 'You can fill the contact form on our website or call/WhatsApp us. We will discuss your dates, requirements and share a customized quote.',
    },
    {
      q: 'Do you offer pre-wedding and engagement shoots?',
      a: 'Yes, we offer dedicated pre-wedding and engagement photography and cinematography packages.',
    },
    {
      q: 'How many edited photos will we receive?',
      a: 'This depends on the package, but typically you receive a large selection of fully edited high‑resolution images that cover your full event.',
    },
  ];

  return (
    <>
      <SEO
        title="FAQ - RS Photography"
        description="Frequently asked questions about RS Photography wedding photography services."
        keywords="rs photography faq, wedding photography questions"
      />
      <div className="pt-20 min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-elegant font-bold mb-8 text-center">
            Frequently Asked Questions
          </h1>
          <div className="space-y-6">
            {faqs.map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg p-4 md:p-5 bg-gray-50"
              >
                <h2 className="text-lg md:text-xl font-semibold mb-2">
                  {item.q}
                </h2>
                <p className="text-gray-700 text-sm md:text-base">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;

