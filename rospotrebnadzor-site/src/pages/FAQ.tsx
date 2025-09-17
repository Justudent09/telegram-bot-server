import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, FileText, Shield, Building, Users } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: 'Как получить санитарно-эпидемиологическое заключение?',
      answer: 'Для получения СЭЗ необходимо подать заявление в Управление Роспотребнадзора с приложением необходимых документов. Срок рассмотрения - 30 рабочих дней. Документы можно подать лично, по почте или через портал Госуслуги.',
      category: 'Санитарные нормы',
      tags: ['СЭЗ', 'документы', 'заключение']
    },
    {
      id: 2,
      question: 'Какие требования к организации общественного питания?',
      answer: 'Организации общественного питания должны соблюдать санитарно-эпидемиологические требования, включая правильное хранение продуктов, соблюдение температурного режима, наличие необходимого оборудования и регулярные медицинские осмотры персонала.',
      category: 'Санитарные нормы',
      tags: ['общепит', 'питание', 'требования']
    },
    {
      id: 3,
      question: 'Как оформить жалобу на нарушение санитарных норм?',
      answer: 'Жалобу можно подать через форму обратной связи на сайте, по телефону горячей линии +7(8712) 29-41-87, письменно по адресу управления или через портал Госуслуги. В жалобе укажите адрес нарушения, описание проблемы и ваши контактные данные.',
      category: 'Жалобы и обращения',
      tags: ['жалоба', 'нарушение', 'обращение']
    },
    {
      id: 4,
      question: 'Какие документы нужны для открытия медицинского учреждения?',
      answer: 'Для открытия медицинского учреждения необходимо получить лицензию на медицинскую деятельность, санитарно-эпидемиологическое заключение, заключение о соответствии санитарным нормам помещений и оборудования. Полный перечень документов можно получить в отделе лицензирования.',
      category: 'Лицензирование',
      tags: ['медицина', 'лицензия', 'учреждение']
    },
    {
      id: 5,
      question: 'Как проверить качество питьевой воды?',
      answer: 'Для проверки качества питьевой воды необходимо обратиться в аккредитованную лабораторию. Управление Роспотребнадзора может провести внеплановую проверку по жалобе граждан. Также можно самостоятельно отобрать пробу и направить в лабораторию для анализа.',
      category: 'Контроль качества',
      tags: ['вода', 'качество', 'проверка']
    },
    {
      id: 6,
      question: 'Какие требования к детским садам и школам?',
      answer: 'Детские сады и школы должны соблюдать санитарно-эпидемиологические требования к условиям и организации обучения, включая требования к помещениям, мебели, освещению, вентиляции, водоснабжению и канализации, а также к организации питания детей.',
      category: 'Образование',
      tags: ['дети', 'школа', 'сад', 'требования']
    },
    {
      id: 7,
      question: 'Как получить справку о санитарном состоянии помещения?',
      answer: 'Справку о санитарном состоянии помещения можно получить, обратившись в Управление Роспотребнадзора с заявлением. Необходимо предоставить документы на помещение и оплатить госпошлину. Срок выдачи справки - 10 рабочих дней.',
      category: 'Документы',
      tags: ['справка', 'помещение', 'состояние']
    },
    {
      id: 8,
      question: 'Какие меры профилактики COVID-19 в организациях?',
      answer: 'В организациях необходимо обеспечить соблюдение масочного режима, социальной дистанции, регулярную дезинфекцию помещений, измерение температуры сотрудников, проветривание помещений и другие меры, предусмотренные санитарными правилами.',
      category: 'COVID-19',
      tags: ['ковид', 'профилактика', 'организация']
    },
    {
      id: 9,
      question: 'Как оформить декларацию о соответствии продукции?',
      answer: 'Декларацию о соответствии продукции можно оформить в аккредитованном органе по сертификации. Необходимо предоставить техническую документацию, результаты испытаний продукции и другие документы, подтверждающие соответствие требованиям безопасности.',
      category: 'Сертификация',
      tags: ['декларация', 'продукция', 'соответствие']
    },
    {
      id: 10,
      question: 'Какие требования к утилизации медицинских отходов?',
      answer: 'Медицинские отходы должны собираться, транспортироваться и утилизироваться в соответствии с санитарными правилами. Необходимо использовать специальную тару, обеспечить безопасную транспортировку и утилизацию в специализированных организациях.',
      category: 'Экология',
      tags: ['отходы', 'медицина', 'утилизация']
    }
  ];

  const categories = [
    { id: 'all', name: 'Все категории', icon: HelpCircle },
    { id: 'Санитарные нормы', name: 'Санитарные нормы', icon: Shield },
    { id: 'Жалобы и обращения', name: 'Жалобы и обращения', icon: FileText },
    { id: 'Лицензирование', name: 'Лицензирование', icon: Building },
    { id: 'Контроль качества', name: 'Контроль качества', icon: Users },
    { id: 'Образование', name: 'Образование', icon: Users },
    { id: 'Документы', name: 'Документы', icon: FileText },
    { id: 'COVID-19', name: 'COVID-19', icon: Shield },
    { id: 'Сертификация', name: 'Сертификация', icon: Building },
    { id: 'Экология', name: 'Экология', icon: Users }
  ];

  const filteredFAQs = useMemo(() => {
    return faqData.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const toggleItem = (itemId: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Вопросы и ответы
          </h1>
          <p className="text-xl text-gray-600">
            Найдите ответы на часто задаваемые вопросы
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск по вопросам, ответам или тегам..."
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
                  <option key={category.id} value={category.id}>
                    {category.name}
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
            Найдено вопросов: {filteredFAQs.length} из {faqData.length}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Категории</h2>
          <div className="flex flex-wrap gap-2">
            {categories.slice(1).map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Вопросы не найдены
              </h3>
              <p className="text-gray-600">
                Попробуйте изменить поисковый запрос или выбрать другую категорию
              </p>
            </div>
          ) : (
            filteredFAQs.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {item.question}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded">
                        {item.category}
                      </span>
                      <div className="flex space-x-1">
                        {item.tags.map(tag => (
                          <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {expandedItems.has(item.id) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0 ml-4" />
                  )}
                </button>
                {expandedItems.has(item.id) && (
                  <div className="px-6 pb-4 text-gray-700 border-t border-gray-100">
                    <div className="pt-4">
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-primary-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Не нашли ответ на свой вопрос?
          </h2>
          <p className="text-lg mb-6 text-primary-100">
            Обратитесь к нам напрямую через форму обратной связи или по телефону
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact-form"
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Написать нам
            </a>
            <a
              href="tel:+78712294187"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Позвонить: +7(8712) 29-41-87
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;