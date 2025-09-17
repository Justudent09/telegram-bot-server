import React from 'react';
import { MapPin, Phone, Mail, Clock, Car, Bus } from 'lucide-react';

const Contact: React.FC = () => {
  const contactInfo = {
    address: '364038, Чеченская Республика, г. Грозный, ул. Урицкого 2/а',
    phones: {
      hotline: '+7(8712) 29-41-87',
      general: '+7(8712) 29-41-89'
    },
    email: 'grozny@rospotrebnadzor95.ru',
    workingHours: {
      weekdays: 'Понедельник - Пятница: 9:00 - 18:00',
      saturday: 'Суббота: 9:00 - 14:00',
      sunday: 'Воскресенье: Выходной'
    }
  };

  const transportInfo = [
    {
      type: 'Автобус',
      routes: ['№ 15, 23, 45', 'Остановка "Урицкого"'],
      icon: Bus
    },
    {
      type: 'Автомобиль',
      routes: ['Парковка на территории', 'Въезд с ул. Урицкого'],
      icon: Car
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Где мы находимся?
          </h1>
          <p className="text-xl text-gray-600">
            Контактная информация и схема проезда
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Адрес
                  </h3>
                  <p className="text-gray-700">
                    {contactInfo.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Phones */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Телефоны
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-gray-700">Горячая линия:</span>
                      <a 
                        href={`tel:${contactInfo.phones.hotline}`}
                        className="ml-2 text-primary-600 hover:text-primary-700 font-semibold"
                      >
                        {contactInfo.phones.hotline}
                      </a>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Общий отдел:</span>
                      <a 
                        href={`tel:${contactInfo.phones.general}`}
                        className="ml-2 text-primary-600 hover:text-primary-700 font-semibold"
                      >
                        {contactInfo.phones.general}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Электронная почта
                  </h3>
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Режим работы
                  </h3>
                  <div className="space-y-1 text-gray-700">
                    <p>{contactInfo.workingHours.weekdays}</p>
                    <p>{contactInfo.workingHours.saturday}</p>
                    <p className="text-red-600">{contactInfo.workingHours.sunday}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transport */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Как добраться
              </h3>
              <div className="space-y-4">
                {transportInfo.map((transport, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <transport.icon className="h-5 w-5 text-primary-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">{transport.type}</h4>
                      <div className="text-sm text-gray-600">
                        {transport.routes.map((route, routeIndex) => (
                          <p key={routeIndex}>{route}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Схема проезда
              </h3>
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-primary-600 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Интерактивная карта</p>
                  <p className="text-sm text-gray-500">
                    Здесь будет встроена карта Yandex Maps
                  </p>
                  <div className="mt-4 p-4 bg-primary-50 rounded-lg">
                    <p className="text-sm text-primary-800">
                      <strong>Координаты:</strong><br />
                      43.3152° N, 45.6941° E
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Быстрые действия
              </h3>
              <div className="space-y-3">
                <a
                  href={`tel:${contactInfo.phones.hotline}`}
                  className="flex items-center justify-center w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Позвонить на горячую линию
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center justify-center w-full border border-primary-600 text-primary-600 py-3 px-4 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Написать на email
                </a>
                <a
                  href="https://yandex.ru/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  Открыть в Яндекс.Картах
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;