import React, { useState } from 'react';

interface SimpleFormProps {
  commonFeatures: string[];
}

export default function SimpleForm({ commonFeatures }: SimpleFormProps) {
  const [formData, setFormData] = useState({
    appName: '',
    description: '',
    features: '',
    name: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
                        const response = await fetch('http://localhost:3001/api/submit-idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(result.message);
        setFormData({
          appName: '',
          description: '',
          features: '',
          name: '',
          email: '',
          phone: ''
        });
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit. Please check your connection and try again.');
    }
  };

  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Tell Us About Your Dream App</h1>
            <p className="text-xl text-gray-300">
              The more details you provide, the better we can craft your perfect solution.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* App Name */}
              <div>
                <label htmlFor="appName" className="block text-lg font-semibold text-white mb-3">
                  What would you like to call your app?
                </label>
                <input
                  type="text"
                  id="appName"
                  name="appName"
                  value={formData.appName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-700 text-white placeholder-gray-400"
                  placeholder="e.g., My Personal Habit Tracker"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-lg font-semibold text-white mb-3">
                  Describe your app idea (up to 200 words)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-700 text-white placeholder-gray-400"
                  placeholder="Tell us what you want your app to do, who will use it, and what problem it solves..."
                  maxLength={1000}
                  required
                />
                <p className="text-sm text-gray-400 mt-2">{formData.description.length}/1000 characters</p>
              </div>

              {/* Features */}
              <div>
                <label htmlFor="features" className="block text-lg font-semibold text-white mb-3">
                  What features would you like?
                </label>
                <textarea
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-700 text-white placeholder-gray-400"
                  placeholder="Describe the features you want in your app (e.g., user login, push notifications, offline mode, social sharing, etc.)"
                  maxLength={500}
                  required
                />
                <p className="text-sm text-gray-400 mt-2">{formData.features.length}/500 characters</p>
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold text-white mb-3">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-700 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg font-semibold text-white mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-700 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-lg font-semibold text-white mb-3">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-700 text-white placeholder-gray-400"
                  placeholder="For quick follow-up questions"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-12 py-4 rounded-lg text-xl font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Submit My App Idea
                </button>
                <p className="text-sm text-gray-400 mt-4">
                  We'll review your submission and get back to you within 24 hours!
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
