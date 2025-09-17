import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Главная', href: '/' },
    { name: 'Где мы находимся?', href: '/contact' },
    { name: 'Написать нам', href: '/contact-form' },
    { name: 'COVID-19', href: '/covid19' },
    { name: 'Вопросы и ответы', href: '/faq' },
    { name: 'Документы', href: '/documents' },
    { name: 'Новости', href: '/news' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/RosLogo.svg" 
                alt="Роспотребнадзор" 
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-primary-600 focus:outline-none focus:text-primary-600"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Contact Bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm space-y-1 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone size={16} />
                <span>Горячая линия: +7(8712) 29-41-87</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail size={16} />
                <span>grozny@rospotrebnadzor95.ru</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin size={16} />
              <span>г. Грозный, ул. Урицкого 2/а</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Управление Роспотребнадзора</h3>
              <p className="text-gray-300 text-sm">
                по Чеченской Республике
              </p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>г. Грозный, ул. Урицкого 2/а</p>
                <p>Тел: +7(8712) 29-41-87</p>
                <p>Email: grozny@rospotrebnadzor95.ru</p>
              </div>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Полезные ссылки</h4>
              <div className="space-y-2 text-sm">
                <Link to="/covid19" className="text-gray-300 hover:text-white block">
                  COVID-19
                </Link>
                <Link to="/documents" className="text-gray-300 hover:text-white block">
                  Документы
                </Link>
                <Link to="/faq" className="text-gray-300 hover:text-white block">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
            <p>&copy; 2024 Управление Роспотребнадзора по Чеченской Республике. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;