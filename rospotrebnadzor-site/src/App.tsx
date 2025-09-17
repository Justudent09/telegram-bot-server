import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import ContactForm from './pages/ContactForm';
import Covid19 from './pages/Covid19';
import FAQ from './pages/FAQ';
import Documents from './pages/Documents';
import News from './pages/News';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-form" element={<ContactForm />} />
          <Route path="/covid19" element={<Covid19 />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/news" element={<News />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;