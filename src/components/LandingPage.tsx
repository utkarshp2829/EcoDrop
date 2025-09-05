import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { useTheme } from '@/contexts/ThemeContext';
import backgroundImage from '@/assets/background.png';
import {
  Leaf,
  Recycle,
  Gift,
  Calendar,
  Heart,
  Award,
  User,
  X,
  Menu,
  ExternalLink,
  Sun,
  Moon
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const handleAuthSuccess = () => {
    setShowAuth(false);
    onGetStarted();
  };

  const features = [
    {
      icon: Calendar,
      title: 'Smart Waste Scheduling',
      description: 'Schedule your recycling drop-offs with our intelligent system that optimizes timing and location for maximum convenience.',
      emoji: '♻️'
    },
    {
      icon: Heart,
      title: 'Eco-Friendly Impact',
      description: 'Track your environmental impact and see how your recycling efforts contribute to a healthier planet.',
      emoji: '🌱'
    },
    {
      icon: Award,
      title: 'Earn Valuable Rewards',
      description: 'Get rewarded for your eco-conscious actions with points, discounts, and exclusive offers from partner brands.',
      emoji: '🎁'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 via-green-100 to-green-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-green-200/50 dark:border-slate-600/50"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Moon className="h-5 w-5 text-slate-700 dark:text-slate-300" />
        ) : (
          <Sun className="h-5 w-5 text-slate-700 dark:text-slate-300" />
        )}
      </button>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with better visibility */}
        <div
          className="absolute inset-0 hero-background"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />

        {/* Seamless gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-green-50/60 to-green-200/80 dark:from-slate-900/80 dark:via-slate-800/70 dark:to-slate-900/90 transition-colors duration-300" />
        
        {/* Subtle radial overlay for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-green-100/20 to-green-200/40 dark:via-slate-700/10 dark:to-slate-800/20 transition-colors duration-300" />

        {/* Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
          <div className="animate-fade-in">
            {/* Logo with smaller, aesthetic styling */}
            <div className="mb-6 animate-float">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="text-green-600 dark:text-green-400 bg-gradient-to-r from-green-500 to-green-700 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent">Eco</span>
                <span className="text-gray-800 dark:text-slate-100">Drop</span>
              </h1>
            </div>

            {/* Main Headline with smaller, aesthetic typography */}
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-slate-100 mb-4 leading-tight transition-colors duration-300">
              Transform Waste into
              <span className="block text-green-600 dark:text-green-400 mt-1 bg-gradient-to-r from-green-500 to-green-700 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent animate-glow">
                Rewards
              </span>
            </h2>

            {/* Subheadline with smaller, aesthetic text */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
              Recycle smarter, earn rewards, and make a positive impact with EcoDrop.
            </p>

            {/* Aesthetic CTA Button */}
            <Button
              onClick={() => setShowAuth(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 text-white text-base px-6 py-3 rounded-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 border border-green-400/20"
            >
              <Leaf className="h-4 w-4 mr-2" />
              Start Recycling Today
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-green-200 via-green-100 to-green-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-slate-100 mb-3 transition-colors duration-300">
              Why Choose EcoDrop?
            </h3>
            <p className="text-base md:text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto transition-colors duration-300">
              Experience the future of recycling with our innovative platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/15 dark:hover:shadow-green-500/25 border border-green-200/40 dark:border-slate-600/40 shadow-md"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-4xl mb-4">{feature.emoji}</div>
                <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 dark:from-green-400/20 dark:to-green-500/20 p-2 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-slate-100 mb-3 transition-colors duration-300">{feature.title}</h4>
                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed transition-colors duration-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-green-50 via-green-200 to-green-300 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-slate-100 mb-4 transition-colors duration-300">
            Ready to Make a Difference?
          </h3>
          <p className="text-base md:text-lg text-gray-700 dark:text-slate-300 mb-6 max-w-2xl mx-auto transition-colors duration-300">
            Join thousands of environmentally conscious individuals making a positive impact.
            Start your eco-journey today!
          </p>

          <Button
            onClick={() => setShowAuth(true)}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 text-white text-base px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 border border-green-400/20"
          >
            <Recycle className="h-4 w-4 mr-2" />
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-green-300 via-green-400 to-green-500 dark:from-slate-800 dark:via-slate-700 dark:to-slate-900 py-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Logo */}
            <div className="md:col-span-2">
              <h4 className="text-xl font-bold text-white mb-3">
                <span className="text-green-100 dark:text-green-300">Eco</span>
                <span className="text-white">Drop</span>
              </h4>
              <p className="text-green-50 dark:text-slate-300 text-sm mb-4 max-w-md transition-colors duration-300">
                Transforming waste into rewards through innovative recycling solutions.
                Join us in creating a sustainable future.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-white font-semibold mb-3 text-sm">Quick Links</h5>
              <ul className="space-y-1">
                <li><a href="#" className="text-green-100 dark:text-slate-300 hover:text-white transition-colors text-sm">About</a></li>
                <li><a href="#" className="text-green-100 dark:text-slate-300 hover:text-white transition-colors text-sm">Contact</a></li>
                <li><a href="#" className="text-green-100 dark:text-slate-300 hover:text-white transition-colors text-sm">Privacy</a></li>
                <li><a href="#" className="text-green-100 dark:text-slate-300 hover:text-white transition-colors text-sm">Terms</a></li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h5 className="text-white font-semibold mb-3 text-sm">Connect</h5>
              <div className="flex space-x-3">
                <a href="#" className="text-green-100 dark:text-slate-300 hover:text-white transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-green-400 dark:border-slate-600 mt-6 pt-6 text-center transition-colors duration-300">
            <p className="text-green-100 dark:text-slate-300 text-sm transition-colors duration-300">
              © 2024 EcoDrop. All rights reserved. Making the world greener, one drop at a time.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm transition-colors duration-300">
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl transition-colors duration-300">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAuth(false)}
              className="absolute -top-12 right-0 text-white hover:bg-white/20 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
            {isLogin ? (
              <LoginForm
                onSwitchToSignup={() => setIsLogin(false)}
                onSuccess={handleAuthSuccess}
              />
            ) : (
              <SignupForm
                onSwitchToLogin={() => setIsLogin(true)}
                onSuccess={handleAuthSuccess}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};