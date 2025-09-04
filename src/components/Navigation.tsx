import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { userProfile } from '@/lib/mockData';
import { 
  Home, 
  Calendar, 
  Gift, 
  History, 
  User, 
  Menu, 
  X,
  Leaf,
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'history', label: 'History', icon: History },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="bg-gradient-primary text-primary-foreground shadow-eco sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8" />
              <span className="text-xl font-bold">EcoDrop</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant={currentPage === id ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => onPageChange(id)}
                  className="text-primary-foreground hover:bg-white/10 transition-smooth"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </Button>
              ))}
            </div>

            {/* Points Badge & Mobile Menu Toggle */}
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-white/20 text-primary-foreground">
                <Gift className="h-3 w-3 mr-1" />
                {userProfile.pointsBalance}
              </Badge>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMenu}
                className="md:hidden text-primary-foreground"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-sm">
            <div className="px-4 py-2 space-y-1">
              {navItems.map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant={currentPage === id ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    onPageChange(id);
                    setIsMenuOpen(false);
                  }}
                  className="w-full justify-start text-primary-foreground hover:bg-white/10"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};