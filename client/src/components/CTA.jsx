import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Workflow?</h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto">
          Join thousands of teams already using DevCollab to streamline their projects and boost productivity.
        </p>
        <Link to="/onboarding" className="bg-white text-primary font-semibold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors text-lg">
          Start For Free
        </Link>
      </div>
    </section>
  );
};

export default CTA;
