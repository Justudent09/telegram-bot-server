import React, { useState } from 'react';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  FileText,
  Newspaper,
  HelpCircle,
  Upload
} from 'lucide-react';

interface AdminItem {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
}

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('news');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminItem | null>(null);

  // Mock data
  const [news, setNews] = useState<AdminItem[]>([
    {
      id: 1,
      title: 'Новые санитарные требования',
      content: 'Содержимое новости...',
      category: 'Санитарные нормы',
      date: '2024-09-15',
      author: 'admin'
    }
  ]);

  const [documents, setDocuments] = useState<AdminItem[]>([
    {
      id: 1,
      title: 'Требования к общепиту',
      content: 'Описание документа...',
      category: 'Санитарные нормы',
      date: '2024-09-15',
      author: 'admin'
    }
  ]);

  const [faq, setFaq] = useState<AdminItem[]>([
    {
      id: 1,
      title: 'Как получить СЭЗ?',
      content: 'Ответ на вопрос...',
      category: 'Документы',
      date: '2024-09-15',
      author: 'admin'
    }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication check
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Неверные учетные данные');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const handleEdit = (item: AdminItem) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
    setEditingItem(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Вы уверены, что хотите удалить этот элемент?')) {
      // Delete logic here
      console.log('Deleting item:', id);
    }
  };

  const handleAddNew = () => {
    const newItem: AdminItem = {
      id: Date.now(),
      title: 'Новый элемент',
      content: '',
      category: 'Общее',
      date: new Date().toISOString().split('T')[0],
      author: 'admin'
    };
    
    setEditingItem(newItem);
    setIsEditing(true);
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'news': return news;
      case 'documents': return documents;
      case 'faq': return faq;
      default: return [];
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'news': return <Newspaper className="h-5 w-5" />;
      case 'documents': return <FileText className="h-5 w-5" />;
      case 'faq': return <HelpCircle className="h-5 w-5" />;
      default: return null;
    }
  };

  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'news': return 'Новости';
      case 'documents': return 'Документы';
      case 'faq': return 'FAQ';
      default: return '';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Административная панель
            </h1>
            <p className="text-gray-600 mt-2">
              Войдите в систему для управления контентом
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Имя пользователя
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Введите имя пользователя"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Введите пароль"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Войти
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              <strong>Тестовые данные:</strong><br />
              Логин: admin<br />
              Пароль: admin123
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Административная панель
              </h1>
              <p className="text-gray-600 mt-2">
                Управление контентом сайта
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['news', 'documents', 'faq'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {getTabIcon(tab)}
                  <span className="ml-2">{getTabTitle(tab)}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {getTabTitle(activeTab)}
              </h2>
              <button
                onClick={handleAddNew}
                className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Добавить
              </button>
            </div>

            {/* Items List */}
            <div className="space-y-4">
              {getCurrentData().map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {item.content}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Категория: {item.category}</span>
                        <span>Дата: {item.date}</span>
                        <span>Автор: {item.author}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                        title="Редактировать"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Удалить"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditing && editingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingItem.id === Date.now() ? 'Добавить новый элемент' : 'Редактировать элемент'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditingItem(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Заголовок
                    </label>
                    <input
                      type="text"
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Содержимое
                    </label>
                    <textarea
                      rows={6}
                      value={editingItem.content}
                      onChange={(e) => setEditingItem({...editingItem, content: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Категория
                    </label>
                    <select
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="Общее">Общее</option>
                      <option value="Санитарные нормы">Санитарные нормы</option>
                      <option value="COVID-19">COVID-19</option>
                      <option value="Документы">Документы</option>
                      <option value="Образование">Образование</option>
                    </select>
                  </div>

                  {activeTab === 'documents' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Файл
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Перетащите файл сюда или нажмите для выбора</p>
                        <input
                          type="file"
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 cursor-pointer"
                        >
                          Выбрать файл
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setEditingItem(null);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Отмена
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Сохранить
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;