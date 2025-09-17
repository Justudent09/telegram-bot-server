import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  User, 
  Tag, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Eye
} from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  imageUrl: string;
  views: number;
  isImportant: boolean;
}

const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const newsData: NewsItem[] = [
    {
      id: 1,
      title: 'Новые санитарные требования к организации общественного питания',
      excerpt: 'Введены обновленные санитарно-эпидемиологические требования к организации общественного питания, включая новые правила хранения продуктов и приготовления пищи.',
      content: 'Полный текст новости о новых санитарных требованиях...',
      author: 'И.И. Иванов',
      date: '2024-09-15',
      category: 'Санитарные нормы',
      tags: ['общепит', 'требования', 'санитария'],
      imageUrl: '/images/news/catering-requirements.jpg',
      views: 1247,
      isImportant: true
    },
    {
      id: 2,
      title: 'Профилактика COVID-19 в осенний период',
      excerpt: 'Рекомендации по профилактике коронавирусной инфекции в период сезонного подъема заболеваемости. Особое внимание уделено вакцинации и соблюдению мер безопасности.',
      content: 'Полный текст новости о профилактике COVID-19...',
      author: 'А.А. Петров',
      date: '2024-09-12',
      category: 'COVID-19',
      tags: ['ковид', 'профилактика', 'вакцинация'],
      imageUrl: '/images/news/covid-prevention.jpg',
      views: 892,
      isImportant: true
    },
    {
      id: 3,
      title: 'Проверка качества питьевой воды в школах',
      excerpt: 'Результаты проверки качества питьевой воды в образовательных учреждениях республики. Выявлены нарушения в 3 школах, приняты меры по их устранению.',
      content: 'Полный текст новости о проверке воды...',
      author: 'С.С. Сидоров',
      date: '2024-09-10',
      category: 'Контроль качества',
      tags: ['вода', 'школы', 'качество'],
      imageUrl: '/images/news/water-quality.jpg',
      views: 654,
      isImportant: false
    },
    {
      id: 4,
      title: 'Семинар для предпринимателей по санитарным нормам',
      excerpt: 'Проведен обучающий семинар для предпринимателей по соблюдению санитарно-эпидемиологических требований. Участие приняли более 100 представителей бизнеса.',
      content: 'Полный текст новости о семинаре...',
      author: 'М.М. Козлов',
      date: '2024-09-08',
      category: 'Образование',
      tags: ['семинар', 'предприниматели', 'обучение'],
      imageUrl: '/images/news/seminar.jpg',
      views: 423,
      isImportant: false
    },
    {
      id: 5,
      title: 'Новые правила утилизации медицинских отходов',
      excerpt: 'Введены обновленные правила сбора, транспортировки и утилизации медицинских отходов. Изменения коснулись требований к упаковке и маркировке.',
      content: 'Полный текст новости о правилах утилизации...',
      author: 'Н.Н. Новиков',
      date: '2024-09-05',
      category: 'Экология',
      tags: ['отходы', 'медицина', 'утилизация'],
      imageUrl: '/images/news/medical-waste.jpg',
      views: 567,
      isImportant: false
    },
    {
      id: 6,
      title: 'Результаты проверки детских садов',
      excerpt: 'Завершена плановая проверка детских дошкольных учреждений. Проверено 45 детских садов, выявлены нарушения в 8 учреждениях.',
      content: 'Полный текст новости о проверке детских садов...',
      author: 'О.О. Орлова',
      date: '2024-09-03',
      category: 'Образование',
      tags: ['детсады', 'проверка', 'дети'],
      imageUrl: '/images/news/kindergarten-check.jpg',
      views: 789,
      isImportant: false
    },
    {
      id: 7,
      title: 'Горячая линия по вопросам вакцинации',
      excerpt: 'Открыта горячая линия для консультаций по вопросам вакцинации против COVID-19. Специалисты готовы ответить на все вопросы граждан.',
      content: 'Полный текст новости о горячей линии...',
      author: 'В.В. Волков',
      date: '2024-09-01',
      category: 'COVID-19',
      tags: ['горячая линия', 'вакцинация', 'консультации'],
      imageUrl: '/images/news/hotline.jpg',
      views: 1123,
      isImportant: true
    },
    {
      id: 8,
      title: 'Совместная проверка с прокуратурой',
      excerpt: 'Проведена совместная проверка с прокуратурой Чеченской Республики по соблюдению санитарных норм в торговых центрах.',
      content: 'Полный текст новости о совместной проверке...',
      author: 'П.П. Павлов',
      date: '2024-08-28',
      category: 'Контроль качества',
      tags: ['прокуратура', 'торговые центры', 'проверка'],
      imageUrl: '/images/news/joint-inspection.jpg',
      views: 445,
      isImportant: false
    }
  ];

  const categories = [
    'all',
    'Санитарные нормы',
    'COVID-19',
    'Контроль качества',
    'Образование',
    'Экология'
  ];

  const filteredNews = useMemo(() => {
    return newsData.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Новости
          </h1>
          <p className="text-xl text-gray-600">
            Актуальные новости и события Управления Роспотребнадзора
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск по новостям..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Все категории' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={clearFilters}
                className="px-4 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Очистить
              </button>
            )}
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Найдено новостей: {filteredNews.length} из {newsData.length}
          </div>
        </div>

        {/* Important News */}
        {currentPage === 1 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Важные новости</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {newsData.filter(item => item.isImportant).map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-r from-primary-600 to-primary-800 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-4xl font-bold mb-2">📰</div>
                        <div className="text-sm opacity-90">Изображение новости</div>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Важно
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(item.date)}
                      <User className="h-4 w-4 ml-4 mr-1" />
                      {item.author}
                      <Eye className="h-4 w-4 ml-4 mr-1" />
                      {item.views}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                        {item.category}
                      </span>
                      <Link
                        to={`/news/${item.id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Читать далее →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular News */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {currentPage === 1 ? 'Все новости' : `Страница ${currentPage}`}
          </h2>
          
          {currentNews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Новости не найдены
              </h3>
              <p className="text-gray-600">
                Попробуйте изменить параметры поиска или фильтры
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentNews.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="h-40 bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-3xl font-bold mb-2">📰</div>
                        <div className="text-sm opacity-90">Изображение новости</div>
                      </div>
                    </div>
                    {item.isImportant && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Важно
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(item.date)}
                      <Eye className="h-3 w-3 ml-3 mr-1" />
                      {item.views}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs">
                        {item.category}
                      </span>
                      <Link
                        to={`/news/${item.id}`}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        Читать →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Предыдущая
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-2 border rounded-lg ${
                  page === currentPage
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Следующая
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 bg-primary-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Подпишитесь на новости
          </h2>
          <p className="text-lg mb-6 text-primary-100">
            Получайте актуальные новости и обновления на ваш email
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Подписаться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;