import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    teamSize: '',
    projectType: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // Redirect to dashboard or confirmation page
  };

  return (
    <div>
      <Navbar />
      <div className="container-custom py-16">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Get Started with DevCollab</h1>
          
          <div className="mb-8">
            <div className="flex items-center">
              {[1, 2, 3].map((item) => (
                <React.Fragment key={item}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= item ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {item}
                  </div>
                  {item < 3 && (
                    <div className={`h-1 flex-1 ${step > item ? 'bg-primary' : 'bg-gray-200'}`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Create Your Account</h2>
                <div>
                  <label className="block text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full btn-primary mt-4"
                >
                  Continue
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Tell Us About Your Team</h2>
                <div>
                  <label className="block text-gray-700 mb-1">Team Size</label>
                  <select
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    <option value="">Select team size</option>
                    <option value="1-5">1-5 members</option>
                    <option value="6-10">6-10 members</option>
                    <option value="11-25">11-25 members</option>
                    <option value="26-50">26-50 members</option>
                    <option value="50+">50+ members</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Project Type</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    <option value="">Select project type</option>
                    <option value="software">Software Development</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App Development</option>
                    <option value="design">Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-1/2 btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-1/2 btn-primary"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Ready to Go!</h2>
                <p className="text-gray-600 mb-6">
                  You're all set to start using DevCollab. Click the button below to create your account and get started.
                </p>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-1/2 btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 btn-primary"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-8 text-center text-gray-600">
            <p>
              Already have an account? <Link to="/" className="text-primary hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OnboardingPage;
