import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
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
  Clock,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';

interface NavigationProps {
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

export const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Determine current page from URL if not provided
  const activePage = currentPage || location.pathname.replace('/', '') || 'home';

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Leaf, path: '/user' },
    { id: 'schedule', label: 'Schedule', icon: Calendar, path: '/user' },
    { id: 'rewards', label: 'Rewards', icon: Gift, path: '/user' },
    { id: 'history', label: 'History', icon: Clock, path: '/user' },
    { id: 'profile', label: 'Profile', icon: User, path: '/user' }
  ];

  const handleNavigation = (item: any) => {
    if (onPageChange) {
      onPageChange(item.id);
    } else {
      navigate(item.path);
    }
  };

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
              {navigationItems.map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant={activePage === id ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => handleNavigation({ id, path: '/user' })}
                  className={`transition-smooth ${
                    activePage === id 
                      ? 'bg-white/20 text-primary-foreground font-semibold' 
                      : 'text-primary-foreground hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </Button>
              ))}
            </div>

            {/* User Info & Mobile Menu Toggle */}
            <div className="flex items-center space-x-3">
              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="text-primary-foreground hover:bg-white/10"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>

              {currentUser && (
                <>
                  <Badge variant="secondary" className="bg-white/20 text-primary-foreground">
                    <Gift className="h-3 w-3 mr-1" />
                    {userProfile.pointsBalance}
                  </Badge>
                  <div className="hidden md:flex items-center space-x-2">
                    <span className="text-sm text-primary-foreground">
                      {currentUser.displayName || currentUser.email}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="text-primary-foreground hover:bg-white/10"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
              
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
              {navigationItems.map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant={activePage === id ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    handleNavigation({ id, path: '/user' });
                    setIsMenuOpen(false);
                  }}
                  className={`w-full justify-start transition-smooth ${
                    activePage === id 
                      ? 'bg-white/20 text-primary-foreground font-semibold' 
                      : 'text-primary-foreground hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </Button>
              ))}
              
              {/* Dark Mode Toggle for Mobile */}
              <div className="pt-4 border-t border-white/20">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    toggleTheme();
                    setIsMenuOpen(false);
                  }}
                  className="w-full justify-start text-primary-foreground hover:bg-white/10"
                >
                  {theme === 'light' ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </Button>
              </div>

              {/* User info and logout for mobile */}
              {currentUser && (
                <div className="pt-2 border-t border-white/20">
                  <div className="px-3 py-2 text-sm text-primary-foreground/80">
                    {currentUser.displayName || currentUser.email}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-start text-primary-foreground hover:bg-white/10"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

    </>
  );
};