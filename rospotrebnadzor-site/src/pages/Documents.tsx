import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  FileText, 
  FilePdf, 
  FileWord, 
  Calendar,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Document {
  id: number;
  title: string;
  type: 'PDF' | 'DOCX' | 'DOC' | 'XLSX';
  size: string;
  date: string;
  category: string;
  description: string;
  downloadUrl: string;
}

const Documents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const documents: Document[] = [
    {
      id: 1,
      title: 'Санитарно-эпидемиологические требования к организации общественного питания',
      type: 'PDF',
      size: '2.3 МБ',
      date: '2024-09-15',
      category: 'Санитарные нормы',
      description: 'Требования к организации общественного питания, включая правила хранения продуктов, приготовления пищи и обслуживания посетителей.',
      downloadUrl: '/documents/sanitary-requirements-catering.pdf'
    },
    {
      id: 2,
      title: 'Рекомендации по профилактике COVID-19 в организациях',
      type: 'PDF',
      size: '1.8 МБ',
      date: '2024-09-12',
      category: 'COVID-19',
      description: 'Меры профилактики коронавирусной инфекции для организаций различных типов деятельности.',
      downloadUrl: '/documents/covid-prevention-organizations.pdf'
    },
    {
      id: 3,
      title: 'Форма заявления на получение санитарно-эпидемиологического заключения',
      type: 'DOCX',
      size: '0.5 МБ',
      date: '2024-09-10',
      category: 'Формы документов',
      description: 'Бланк заявления для получения СЭЗ с инструкцией по заполнению.',
      downloadUrl: '/documents/sez-application-form.docx'
    },
    {
      id: 4,
      title: 'Отчет о санитарно-эпидемиологической обстановке за 2024 год',
      type: 'PDF',
      size: '5.2 МБ',
      date: '2024-09-08',
      category: 'Отчеты',
      description: 'Анализ санитарно-эпидемиологической обстановки в Чеченской Республике за первое полугодие 2024 года.',
      downloadUrl: '/documents/sanitary-report-2024.pdf'
    },
    {
      id: 5,
      title: 'Требования к детским образовательным учреждениям',
      type: 'PDF',
      size: '3.1 МБ',
      date: '2024-09-05',
      category: 'Образование',
      description: 'Санитарно-эпидемиологические требования к условиям и организации обучения в образовательных учреждениях.',
      downloadUrl: '/documents/educational-institutions-requirements.pdf'
    },
    {
      id: 6,
      title: 'Инструкция по проведению дезинфекционных мероприятий',
      type: 'DOCX',
      size: '1.2 МБ',
      date: '2024-09-03',
      category: 'Дезинфекция',
      description: 'Методические рекомендации по организации и проведению дезинфекционных мероприятий.',
      downloadUrl: '/documents/disinfection-instructions.docx'
    },
    {
      id: 7,
      title: 'Правила утилизации медицинских отходов',
      type: 'PDF',
      size: '2.7 МБ',
      date: '2024-08-30',
      category: 'Экология',
      description: 'Требования к сбору, транспортировке и утилизации медицинских отходов.',
      downloadUrl: '/documents/medical-waste-disposal.pdf'
    },
    {
      id: 8,
      title: 'Шаблон журнала учета дезинфекционных мероприятий',
      type: 'XLSX',
      size: '0.3 МБ',
      date: '2024-08-28',
      category: 'Формы документов',
      description: 'Электронная форма журнала для ведения учета дезинфекционных мероприятий.',
      downloadUrl: '/documents/disinfection-log-template.xlsx'
    }
  ];

  const categories = [
    'all',
    'Санитарные нормы',
    'COVID-19',
    'Формы документов',
    'Отчеты',
    'Образование',
    'Дезинфекция',
    'Экология'
  ];

  const types = [
    { value: 'all', label: 'Все типы' },
    { value: 'PDF', label: 'PDF' },
    { value: 'DOCX', label: 'DOCX' },
    { value: 'DOC', label: 'DOC' },
    { value: 'XLSX', label: 'XLSX' }
  ];

  const sortOptions = [
    { value: 'date', label: 'По дате' },
    { value: 'title', label: 'По названию' },
    { value: 'size', label: 'По размеру' },
    { value: 'category', label: 'По категории' }
  ];

  const filteredDocuments = useMemo(() => {
    let filtered = documents.filter(doc => {
      const matchesSearch = searchTerm === '' || 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === 'all' || doc.type === selectedType;
      const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
      
      return matchesSearch && matchesType && matchesCategory;
    });

    // Sort documents
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'size':
          const sizeA = parseFloat(a.size);
          const sizeB = parseFloat(b.size);
          comparison = sizeA - sizeB;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [searchTerm, selectedType, selectedCategory, sortBy, sortOrder]);

  const toggleItem = (itemId: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FilePdf className="h-6 w-6 text-red-600" />;
      case 'DOCX':
      case 'DOC':
        return <FileWord className="h-6 w-6 text-blue-600" />;
      case 'XLSX':
        return <FileText className="h-6 w-6 text-green-600" />;
      default:
        return <FileText className="h-6 w-6 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedCategory('all');
    setSortBy('date');
    setSortOrder('desc');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Документы
          </h1>
          <p className="text-xl text-gray-600">
            Официальные документы, формы и методические материалы
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск по названию, описанию или категории..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {types.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
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

            {/* Sort */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title={sortOrder === 'asc' ? 'По возрастанию' : 'По убыванию'}
              >
                {sortOrder === 'asc' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Results and Clear */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Найдено документов: {filteredDocuments.length} из {documents.length}
            </div>
            {(searchTerm || selectedType !== 'all' || selectedCategory !== 'all') && (
              <button
                onClick={clearFilters}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Очистить фильтры
              </button>
            )}
          </div>
        </div>

        {/* Documents List */}
        <div className="space-y-4">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Документы не найдены
              </h3>
              <p className="text-gray-600">
                Попробуйте изменить параметры поиска или фильтры
              </p>
            </div>
          ) : (
            filteredDocuments.map(doc => (
              <div key={doc.id} className="bg-white rounded-lg shadow-md">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0">
                        {getFileIcon(doc.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {doc.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                          <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded">
                            {doc.category}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(doc.date)}
                          </span>
                          <span>{doc.type}</span>
                          <span>{doc.size}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                          {doc.description}
                        </p>
                        {expandedItems.has(doc.id) && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Дополнительная информация:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• Документ актуален на {formatDate(doc.date)}</li>
                              <li>• Размер файла: {doc.size}</li>
                              <li>• Формат: {doc.type}</li>
                              <li>• Категория: {doc.category}</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => toggleItem(doc.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title={expandedItems.has(doc.id) ? 'Скрыть детали' : 'Показать детали'}
                      >
                        {expandedItems.has(doc.id) ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                      <a
                        href={doc.downloadUrl}
                        download
                        className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Скачать
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-primary-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Нужен документ, которого нет в списке?
          </h2>
          <p className="text-lg mb-6 text-primary-100">
            Обратитесь к нам, и мы поможем найти нужный документ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact-form"
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Написать нам
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Контакты
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;