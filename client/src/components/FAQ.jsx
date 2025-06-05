import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What is DevCollab?',
      answer: 'DevCollab is a comprehensive project management platform designed specifically for development teams. It combines kanban boards, sprint planning, and detailed analytics to streamline your workflow and boost productivity.'
    },
    {
      question: 'How does DevCollab compare to other project management tools?',
      answer: 'Unlike generic project management tools, DevCollab is built specifically for development teams with features tailored to software development workflows. It offers a more intuitive interface, better integration with development tools, and specialized features for agile methodologies.'
    },
    {
      question: 'Is DevCollab suitable for small teams?',
      answer: 'Absolutely! DevCollab is designed to scale with your team. Whether you\'re a startup with just a few developers or a large enterprise with multiple teams, our platform adapts to your needs and grows with you.'
    },
    {
      question: 'What key features does DevCollab offer?',
      answer: 'DevCollab offers intuitive kanban boards, powerful sprint planning tools, comprehensive reporting and analytics, team collaboration features, integration with popular development tools, and customizable workflows to fit your team\'s specific needs.'
    },
    {
      question: 'Can DevCollab handle multiple projects simultaneously?',
      answer: 'Yes, DevCollab is designed to manage multiple projects simultaneously. You can easily switch between projects, assign team members to different projects, and get a holistic view of all your ongoing work.'
    },
    {
      question: 'Is there a learning curve for new users?',
      answer: 'DevCollab is designed with user experience in mind. The interface is intuitive and easy to navigate, even for new users. We also provide comprehensive documentation, tutorials, and customer support to help your team get up to speed quickly.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border-b border-gray-200 pb-4">
              <button
                className="flex justify-between items-center w-full text-left font-semibold text-lg py-2"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className="text-primary">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="mt-2 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
