import React, { useState, useCallback } from 'react';
import SimpleForm from './SimpleForm';
import { Menu, X, Code, Zap, Users, Check, ArrowRight, Smartphone, PieChart, CheckSquare, CreditCard, Star, Mail, Phone, MapPin } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [formData, setFormData] = useState({
    appName: '',
    description: '',
    features: [] as string[],
    name: '',
    email: '',
    phone: ''
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleFeatureChange = useCallback((feature: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      features: checked 
        ? [...prev.features, feature]
        : prev.features.filter(f => f !== feature)
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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
          features: [] as string[],
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
  }, [formData]);

  const exampleApps = [
    {
      icon: <CheckSquare className="w-8 h-8 text-blue-600" />,
      name: "Habit Tracker Pro",
      description: "Beautiful, minimalist habit tracking with streaks, rewards, and personal insights.",
      features: ["Daily tracking", "Streak counters", "Progress visualization", "Custom rewards"]
    },
    {
      icon: <PieChart className="w-8 h-8 text-green-600" />,
      name: "Personal Budget Tool",
      description: "Simple expense tracking and budget management tailored to your financial goals.",
      features: ["Expense categories", "Budget alerts", "Monthly reports", "Goal tracking"]
    },
    {
      icon: <Smartphone className="w-8 h-8 text-purple-600" />,
      name: "Niche Task Manager",
      description: "Project management built specifically for creative professionals and freelancers.",
      features: ["Client projects", "Time tracking", "Invoice integration", "Portfolio showcase"]
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      name: "Community Hub",
      description: "Custom social platform for small communities with member management and events.",
      features: ["Member profiles", "Event planning", "Discussion boards", "Admin controls"]
    },
    {
      icon: <Star className="w-8 h-8 text-red-600" />,
      name: "Review Collector",
      description: "Streamlined customer feedback collection with analytics and review management.",
      features: ["Review forms", "Analytics dashboard", "Response templates", "Integration tools"]
    }
  ];

  const commonFeatures = [
    'User Authentication',
    'Push Notifications',
    'Offline Mode',
    'Social Media Sharing'
  ];

  const Navigation = () => (
    <nav className="bg-gray-900 shadow-lg fixed w-full top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigateTo('home')}>
            <Code className="w-8 h-8 text-blue-600 mr-2" />
            <span className="font-bold text-xl text-white">Vibe Coding Studio</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => navigateTo('home')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-blue-400 bg-blue-900' : 'text-gray-300 hover:text-blue-400'}`}>
                Home
              </button>
              <button onClick={() => navigateTo('examples')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'examples' ? 'text-blue-400 bg-blue-900' : 'text-gray-300 hover:text-blue-400'}`}>
                Examples
              </button>
              {/* <button onClick={() => navigateTo('pricing')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'pricing' ? 'text-blue-400 bg-blue-900' : 'text-gray-300 hover:text-blue-400'}`}>
                Pricing
              </button> */}
              <button onClick={() => navigateTo('submit')} className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                Submit Your Idea
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-300 hover:text-blue-400">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
                  <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => navigateTo('home')} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-800 rounded-md w-full text-left">
                Home
              </button>
              <button onClick={() => navigateTo('examples')} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-800 rounded-md w-full text-left">
                Examples
              </button>
              <button onClick={() => navigateTo('pricing')} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-800 rounded-md w-full text-left">
                Pricing
              </button>
              <button onClick={() => navigateTo('submit')} className="block px-3 py-2 text-base font-medium bg-blue-500 text-white hover:bg-blue-600 rounded-md w-full text-left">
                Submit Your Idea
              </button>
            </div>
          </div>
      )}
    </nav>
  );

  const HomePage = () => (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your Dream App,<br />
              <span className="text-blue-400">Built Just for You</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Skip the generic solutions. Get a custom app designed around your unique needs, 
              crafted with care, and delivered in just 5-7 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => navigateTo('submit')}
                className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button 
                onClick={() => navigateTo('examples')}
                className="text-blue-400 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors border-2 border-blue-400"
              >
                View Examples
              </button>
            </div>
            {/* <div className="mt-8 text-sm text-gray-500">
              <span className="bg-amber-500 text-black px-3 py-1 rounded-full font-medium">
                🎉 Founding Member Special: $49 (Limited Time)
              </span>
            </div> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Custom Over Generic?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We believe your app should fit your workflow, not the other way around.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors">
              <Zap className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast Delivery</h3>
              <p className="text-gray-300">
                Get your custom app in 5-7 days, not months. We focus on your core needs first.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Built Around You</h3>
              <p className="text-gray-300">
                Every feature is tailored to your specific workflow and preferences.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors">
              <Code className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">No Technical Hassle</h3>
              <p className="text-gray-300">
                Just describe your idea. We handle all the technical complexity for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our founding members and get your custom app for just $49.
          </p>
          <button 
            onClick={() => navigateTo('submit')}
            className="bg-amber-500 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Submit Your Idea Now
          </button>
        </div>
      </section>
    </div>
  );

  const ExamplesPage = () => (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Example Apps We've Built</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Each app is uniquely crafted for our clients' specific needs. Here's what we can create for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exampleApps.map((app, index) => (
              <div key={index} className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  {app.icon}
                  <h3 className="text-xl font-semibold text-white ml-3">{app.name}</h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">{app.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-white">Key Features:</h4>
                  <ul className="space-y-1">
                    {app.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-300">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-300 mb-6">Don't see exactly what you need? That's the point!</p>
            <button 
              onClick={() => navigateTo('submit')}
              className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Tell Us Your Unique Idea
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const PricingPage = () => (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-300">
              No hidden fees, no surprises. Just great apps at a fair price.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Founding Member Deal */}
            <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl p-8 text-black relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="bg-black text-amber-400 px-3 py-1 rounded-full text-sm font-bold">LIMITED TIME</span>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Founding Member</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-lg line-through opacity-70 ml-2">$99</span>
                </div>
                <p className="text-sm opacity-80 mt-1">First 20 customers only</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3 flex-shrink-0" />
                  Custom app with 1-2 core features
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3 flex-shrink-0" />
                  5-7 day delivery
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3 flex-shrink-0" />
                  Mobile responsive design
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3 flex-shrink-0" />
                  1 free revision within 7 days
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3 flex-shrink-0" />
                  Basic setup instructions
                </li>
              </ul>
              
              <button 
                onClick={() => navigateTo('submit')}
                className="w-full bg-black text-amber-400 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
              >
                Claim Your Spot
              </button>
            </div>

            {/* Standard Pricing */}
            <div className="bg-gray-800 rounded-xl p-8 border-2 border-gray-600">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Standard Custom App</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">$99</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Regular pricing</p>
              </div>
              
              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  Custom app with 1-2 core features
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  5-7 day delivery
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  Mobile responsive design
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  1 free revision within 7 days
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  Basic setup instructions
                </li>
              </ul>
              
              <button 
                onClick={() => navigateTo('submit')}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gray-800 rounded-xl p-6 inline-block border border-gray-700">
              <h4 className="font-semibold text-white mb-2">Need something more complex?</h4>
              <p className="text-gray-300 mb-4">Apps with 3+ features or advanced integrations</p>
              <button 
                onClick={() => navigateTo('submit')}
                className="text-blue-400 font-medium hover:text-blue-300"
              >
                Request a Custom Quote
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const SubmitPage = () => <SimpleForm commonFeatures={commonFeatures} />;

  const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-2" style={{marginLeft: '40px'}}>
            <div className="flex items-center mb-4">
              <Code className="w-8 h-8 text-blue-400 mr-2" />
              <span className="font-bold text-xl">Vibe Coding Studio</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Crafting personalized apps that fit your unique needs. 
            </p> 
            <p className="text-gray-300 mb-4 leading-relaxed"> 
              Skip the generic solutions and get something truly yours.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2" />
                sharadgumber855@gmail.com
              </div>
            </div>
          </div>
          

          
          <div style={{marginLeft: '40px'}}>
            <h4 className="font-semibold mb-4">Process</h4>
            <ul className="space-y-2 text-gray-300">
              <li>1. Submit your idea</li>
              <li>2. We confirm scope</li>
              <li>3. Pay & we build</li>
              <li>4. Get your personalized software ready</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Vibe Coding Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'examples' && <ExamplesPage />}
      {currentPage === 'pricing' && <PricingPage />}
      {currentPage === 'submit' && <SubmitPage />}
      
      <Footer />
    </div>
  );
}

export default App;