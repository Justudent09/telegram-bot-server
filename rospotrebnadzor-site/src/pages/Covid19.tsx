import React, { useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  Users, 
  Activity, 
  Download, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail
} from 'lucide-react';

const Covid19: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const statistics = {
    totalCases: '1,247,891',
    recovered: '1,198,456',
    deaths: '38,247',
    active: '11,188'
  };

  const preventionMeasures = [
    {
      title: 'Вакцинация',
      description: 'Сделайте прививку от COVID-19 для защиты себя и окружающих',
      icon: Shield,
      details: [
        'Вакцинация доступна для всех граждан старше 18 лет',
        'Бесплатная вакцинация в поликлиниках по месту жительства',
        'Запись через портал Госуслуги или по телефону',
        'Документы: паспорт, СНИЛС, полис ОМС'
      ]
    },
    {
      title: 'Соблюдение дистанции',
      description: 'Поддерживайте расстояние не менее 1.5 метра от других людей',
      icon: Users,
      details: [
        'Избегайте скоплений людей',
        'Используйте бесконтактные способы приветствия',
        'Ограничьте посещение общественных мест',
        'Работайте удаленно, если это возможно'
      ]
    },
    {
      title: 'Использование масок',
      description: 'Носите маску в общественных местах и транспорте',
      icon: Activity,
      details: [
        'Маска должна плотно прилегать к лицу',
        'Меняйте маску каждые 2-3 часа',
        'Не трогайте маску руками во время ношения',
        'Правильно утилизируйте использованные маски'
      ]
    }
  ];

  const symptoms = [
    { name: 'Повышенная температура', severity: 'high' },
    { name: 'Сухой кашель', severity: 'high' },
    { name: 'Усталость', severity: 'medium' },
    { name: 'Потеря обоняния или вкуса', severity: 'high' },
    { name: 'Боль в горле', severity: 'medium' },
    { name: 'Головная боль', severity: 'medium' },
    { name: 'Одышка', severity: 'high' },
    { name: 'Боль в мышцах', severity: 'low' }
  ];

  const faqItems = [
    {
      question: 'Как записаться на вакцинацию?',
      answer: 'Записаться на вакцинацию можно через портал Госуслуги, мобильное приложение "Госуслуги" или по телефону горячей линии 8-800-2000-112. Также можно обратиться в поликлинику по месту жительства.'
    },
    {
      question: 'Какие вакцины доступны?',
      answer: 'В Чеченской Республике доступны следующие вакцины: "Спутник V", "Спутник Лайт", "КовиВак" и "ЭпиВакКорона". Все вакцины прошли необходимые клинические испытания и одобрены Минздравом России.'
    },
    {
      question: 'Нужно ли носить маску после вакцинации?',
      answer: 'Да, даже после вакцинации рекомендуется продолжать носить маску в общественных местах, так как вакцина не дает 100% защиты от заражения, но значительно снижает риск тяжелого течения болезни.'
    },
    {
      question: 'Что делать при появлении симптомов?',
      answer: 'При появлении симптомов COVID-19 необходимо остаться дома, вызвать врача на дом по телефону 103 или 8-800-2000-112, минимизировать контакты с другими людьми и следовать рекомендациям медицинских работников.'
    }
  ];

  const documents = [
    {
      title: 'Рекомендации по профилактике COVID-19',
      type: 'PDF',
      size: '2.3 МБ',
      date: '15.09.2024'
    },
    {
      title: 'Инструкция по вакцинации',
      type: 'PDF',
      size: '1.8 МБ',
      date: '10.09.2024'
    },
    {
      title: 'Памятка для организаций',
      type: 'DOCX',
      size: '1.2 МБ',
      date: '08.09.2024'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            COVID-19: Актуальная информация
          </h1>
          <p className="text-xl text-gray-600">
            Официальная информация о коронавирусной инфекции и мерах профилактики
          </p>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Статистика по Чеченской Республике
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {statistics.totalCases}
              </div>
              <div className="text-gray-600">Всего случаев</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {statistics.recovered}
              </div>
              <div className="text-gray-600">Выздоровело</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-600 mb-2">
                {statistics.deaths}
              </div>
              <div className="text-gray-600">Летальных исходов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {statistics.active}
              </div>
              <div className="text-gray-600">Активных случаев</div>
            </div>
          </div>
        </div>

        {/* Prevention Measures */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Меры профилактики
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {preventionMeasures.map((measure, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <measure.icon className="h-8 w-8 text-primary-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {measure.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {measure.description}
                </p>
                <ul className="space-y-2">
                  {measure.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-sm text-gray-700 flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Symptoms */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Симптомы COVID-19
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {symptoms.map((symptom, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-center ${getSeverityColor(symptom.severity)}`}
              >
                <div className="font-medium">{symptom.name}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              При появлении симптомов оставайтесь дома и вызовите врача
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <a
                href="tel:103"
                className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                Вызвать врача: 103
              </a>
              <a
                href="tel:88002000112"
                className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                Горячая линия: 8-800-2000-112
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Часто задаваемые вопросы
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleSection(`faq-${index}`)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{item.question}</span>
                  {expandedSections.has(`faq-${index}`) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedSections.has(`faq-${index}`) && (
                  <div className="px-6 pb-4 text-gray-700">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Официальные документы
          </h2>
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <Download className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{doc.title}</h3>
                    <p className="text-sm text-gray-500">
                      {doc.type} • {doc.size} • {doc.date}
                    </p>
                  </div>
                </div>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Скачать
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* External Resources */}
        <div className="bg-primary-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-primary-900 mb-6 text-center">
            Полезные ресурсы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="https://www.rospotrebnadzor.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <ExternalLink className="h-6 w-6 text-primary-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">Официальный сайт Роспотребнадзора</h3>
                <p className="text-sm text-gray-600">rospotrebnadzor.ru</p>
              </div>
            </a>
            <a
              href="https://www.gosuslugi.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <ExternalLink className="h-6 w-6 text-primary-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">Портал Госуслуги</h3>
                <p className="text-sm text-gray-600">gosuslugi.ru</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Covid19;