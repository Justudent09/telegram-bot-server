import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Mail, 
  Shield, 
  FileText, 
  HelpCircle, 
  Newspaper,
  Phone,
  AlertTriangle,
  Users,
  CheckCircle
} from 'lucide-react';

const Home: React.FC = () => {
  const quickLinks = [
    {
      title: 'Где мы находимся?',
      description: 'Адрес, телефоны и схема проезда',
      icon: MapPin,
      href: '/contact',
      color: 'bg-blue-500'
    },
    {
      title: 'Написать нам',
      description: 'Форма обратной связи',
      icon: Mail,
      href: '/contact-form',
      color: 'bg-green-500'
    },
    {
      title: 'COVID-19',
      description: 'Актуальная информация о пандемии',
      icon: Shield,
      href: '/covid19',
      color: 'bg-red-500'
    },
    {
      title: 'Документы',
      description: 'Официальные документы и постановления',
      icon: FileText,
      href: '/documents',
      color: 'bg-purple-500'
    },
    {
      title: 'Вопросы и ответы',
      description: 'Часто задаваемые вопросы',
      icon: HelpCircle,
      href: '/faq',
      color: 'bg-yellow-500'
    },
    {
      title: 'Новости',
      description: 'Последние новости и события',
      icon: Newspaper,
      href: '/news',
      color: 'bg-indigo-500'
    }
  ];

  const latestNews = [
    {
      id: 1,
      title: 'Новые санитарные требования к общественному питанию',
      date: '15.09.2024',
      excerpt: 'Введены обновленные санитарно-эпидемиологические требования к организации общественного питания...',
      category: 'Санитарные нормы'
    },
    {
      id: 2,
      title: 'Профилактика COVID-19 в осенний период',
      date: '12.09.2024',
      excerpt: 'Рекомендации по профилактике коронавирусной инфекции в период сезонного подъема заболеваемости...',
      category: 'COVID-19'
    },
    {
      id: 3,
      title: 'Проверка качества питьевой воды в школах',
      date: '10.09.2024',
      excerpt: 'Результаты проверки качества питьевой воды в образовательных учреждениях республики...',
      category: 'Контроль качества'
    }
  ];

  const stats = [
    { label: 'Проведено проверок', value: '1,247', icon: CheckCircle },
    { label: 'Выдано предписаний', value: '89', icon: AlertTriangle },
    { label: 'Охват населения', value: '1.5М', icon: Users },
    { label: 'Горячих линий', value: '24/7', icon: Phone }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Управление Роспотребнадзора
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              по Чеченской Республике
            </p>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-primary-200">
              Обеспечиваем санитарно-эпидемиологическое благополучие населения 
              и защиту прав потребителей в Чеченской Республике
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Быстрый доступ к услугам
            </h2>
            <p className="text-lg text-gray-600">
              Выберите нужный раздел для получения информации или услуг
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 group"
              >
                <div className="flex items-center mb-4">
                  <div className={`${link.color} p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    <link.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {link.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Последние новости
            </h2>
            <Link
              to="/news"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
            >
              Все новости
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((news) => (
              <div key={news.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-primary-600 font-medium">
                      {news.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {news.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {news.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Нужна помощь или консультация?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Свяжитесь с нами любым удобным способом
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact-form"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Написать нам
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Найти нас
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;