import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import servicesData from './data/services.json';
import testimonialsData from './data/testimonials.json';
import advantagesData from './data/advantages.json';

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');

  // Carrega dados dos arquivos JSON
  const services = servicesData.services;
  const testimonials = testimonialsData.testimonials;
  const advantages = advantagesData.advantages;

  const handleWhatsAppClick = (serviceName) => {
    const message = `Olá, PETLUXE! Gostaria de agendar: ${serviceName}`;
    const url = `https://wa.me/5521990634671?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'testimonials', 'advantages', 'promo', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const ContactForm = () => {
    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    const handleSubmit = (e) => {
      e.preventDefault();
      setStatus({ loading: true, success: false, error: null });

      const SERVICE_ID = 'gwwu rayc qsjl ssuo';
      const TEMPLATE_ID = 'template_1x6a3ly';
      const PUBLIC_KEY = 'IzDATYWynnYz2KMh2';

      emailjs
        .sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
        .then(() => {
          setStatus({ loading: false, success: true, error: null });
          e.target.reset();
        })
        .catch((err) => {
          console.error('Erro ao enviar e-mail:', err);
          setStatus({ loading: false, success: false, error: 'Não foi possível enviar sua mensagem. Tente novamente.' });
        });
    };

    if (status.success) {
      return (
        <div className="text-center py-8">
          <p className="text-xl text-[#0d1b2a] font-medium">Mensagem enviada com sucesso! Responderemos em breve.</p>
          <button
            onClick={() => setStatus({ loading: false, success: false, error: null })}
            className="mt-4 text-[#0d1b2a] underline"
          >
            Enviar outra mensagem
          </button>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        <div>
          <label htmlFor="name" className="block text-gray-700 mb-2">Seu Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d1b2a] focus:outline-none"
            placeholder="Ex: Ana Silva"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 mb-2">Seu E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d1b2a] focus:outline-none"
            placeholder="exemplo@email.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-700 mb-2">Mensagem</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d1b2a] focus:outline-none"
            placeholder="Conte-nos como podemos ajudar..."
          ></textarea>
        </div>

        {status.error && <p className="text-red-600 text-sm">{status.error}</p>}

        <button
          type="submit"
          disabled={status.loading}
          className="w-full bg-[#0d1b2a] hover:bg-[#1b263b] text-white py-3 px-6 rounded-lg font-medium transition duration-300 shadow hover:shadow-md"
        >
          {status.loading ? 'Enviando...' : 'Enviar Mensagem'}
        </button>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-[#f9fbfd] font-sans text-gray-800">
      {/* Navbar Fixo */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 transition-all duration-300 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-center gap-8 md:gap-12 text-sm md:text-base">
          <button 
            onClick={() => scrollToSection('services')}
            className={`font-medium transition hover:text-[#0d1b2a] ${activeSection === 'services' ? 'text-[#0d1b2a] border-b-2 border-[#0d1b2a] pb-1' : 'text-gray-600'}`}
          >
            Serviços
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')}
            className={`font-medium transition hover:text-[#0d1b2a] ${activeSection === 'testimonials' ? 'text-[#0d1b2a] border-b-2 border-[#0d1b2a] pb-1' : 'text-gray-600'}`}
          >
            Depoimentos
          </button>
          <button 
            onClick={() => scrollToSection('advantages')}
            className={`font-medium transition hover:text-[#0d1b2a] ${activeSection === 'advantages' ? 'text-[#0d1b2a] border-b-2 border-[#0d1b2a] pb-1' : 'text-gray-600'}`}
          >
            Vantagens
          </button>
          <button 
            onClick={() => scrollToSection('promo')}
            className={`font-medium transition hover:text-[#0d1b2a] ${activeSection === 'promo' ? 'text-[#0d1b2a] border-b-2 border-[#0d1b2a] pb-1' : 'text-gray-600'}`}
          >
            Promoção
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className={`font-medium transition hover:text-[#0d1b2a] ${activeSection === 'contact' ? 'text-[#0d1b2a] border-b-2 border-[#0d1b2a] pb-1' : 'text-gray-600'}`}
          >
            Contato
          </button>
        </div>
      </nav>

{/* Hero Section */}
<section
  id="hero"
  className="h-screen bg-cover bg-center bg-fixed flex items-center justify-center text-center relative pt-20"
  style={{ backgroundImage: "url('/banner-banho.webp')" }}
>
  {/* Sobreposição escura */}
  <div className="absolute inset-0 bg-[#0d1b2a] bg-opacity-85"></div>

  {/* Conteúdo */}
  <div className="relative z-10 px-6 max-w-4xl">
    <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight text-white">
      PETLUXE
    </h1>
    <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto opacity-95 text-white">
      Banho, tosa & muito carinho. Seu pet merece o melhor tratamento — com conforto e amor.
    </p>
    <button
      onClick={() => scrollToSection('services')}
      className="bg-[#0d1b2a] text-white font-medium py-4 px-10 rounded-full transition duration-300 shadow hover:shadow-lg hover:bg-[#1b263b]"
    >
      Ver Serviços
    </button>
  </div>
</section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-light text-center mb-4">
            Nossos <span className="font-medium text-[#0d1b2a]">Serviços</span>
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Cada serviço é feito com carinho, produtos de qualidade e atenção aos detalhes do seu pet.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-[#f9fbfd] rounded-2xl shadow-sm overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-md group border border-gray-200"
              >
                <div className="h-56 overflow-hidden bg-white flex items-center justify-center">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-lg mb-2 text-[#0d1b2a]">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  <p className="font-bold text-lg mb-4 text-[#0d1b2a]">{service.price}</p>
                  <button
                    onClick={() => handleWhatsAppClick(service.name)}
                    className="w-full bg-[#0d1b2a] hover:bg-[#1b263b] text-white py-3 px-4 rounded-lg font-medium transition duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Agendar via WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="testimonials" className="py-24 bg-[#f9fbfd]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-light text-center mb-4">
            O que nossos <span className="font-medium text-[#0d1b2a]">clientes (e pets!) dizem</span>
          </h2>
          <p className="text-center text-gray-600 mb-16">Quem já confiou, ama — e volta sempre!</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow transition duration-300 text-center border border-gray-200">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-[#0d1b2a]"
                />
                <h4 className="font-medium mb-2 text-[#0d1b2a]">{testimonial.name}</h4>
                <p className="text-gray-600 italic">“{testimonial.text}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vantagens */}
      <section id="advantages" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-4">
            Por que escolher o <span className="font-medium text-[#0d1b2a]">PETLUXE?</span>
          </h2>
          <p className="text-gray-600 mb-16">Tudo pensado para o bem-estar do seu pet e sua tranquilidade.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {advantages.map((adv, index) => (
              <div key={index} className="group bg-[#f9fbfd] rounded-2xl p-8 shadow-sm hover:shadow transition-all duration-500 border border-gray-200">
                <div className="text-5xl mb-4 inline-block">{adv.icon}</div>
                <h3 className="text-xl font-medium mb-3 text-[#0d1b2a]">{adv.title}</h3>
                <p className="text-gray-600">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promoção Relâmpago */}
      <section id="promo" className="py-24 bg-[#0d1b2a] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            🐾 PROMOÇÃO ESPECIAL PET 🐾
          </h2>
          <p className="text-xl mb-8">
            Esta semana: <span className="font-bold text-2xl">Pacote Spa Pet por R$ 120!</span>
          </p>
          <p className="mb-8 opacity-90">
            Economize R$ 30 — banho + tosa + hidratação + perfume + acessório.
          </p>
          <p className="mb-10 text-sm opacity-80">
            ⏰ Só até sexta! Vagas limitadas — garanta o mimo do seu pet!
          </p>
          <button
            onClick={() => scrollToSection('services')}
            className="bg-white text-[#0d1b2a] font-medium py-4 px-10 rounded-full hover:bg-gray-100 transform hover:scale-105 transition duration-300 shadow border border-gray-200 hover:shadow-lg"
          >
            Agendar Promoção
          </button>
        </div>
      </section>

      {/* Contato por E-mail */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-4">
            Fale <span className="font-medium text-[#0d1b2a]">Conosco</span>
          </h2>
          <p className="text-gray-600 mb-10">
            Envie sua mensagem e responderemos o mais rápido possível!
          </p>

          <div className="bg-[#f9fbfd] rounded-2xl p-8 shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d1b2a] text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-light mb-2">PETLUXE</h3>
          <p className="mb-6 opacity-90">Banho, tosa & muito carinho — porque seu pet é da família.</p>
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="hover:text-gray-300 transition">Instagram</a>
            <a href="#" className="hover:text-gray-300 transition">Facebook</a>
            <a href="https://wa.me/5521990634671" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">WhatsApp</a>
          </div>

          <div className="border-t border-gray-700 pt-6 mt-8">
            <p className="text-xs opacity-70 mb-2">
              ✨ Modelo de site criado por <strong>Saul Developer</strong> — parte do Catálogo de Sites Prontos.
            </p>
            <a
              href="https://seucatalogo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:underline text-sm font-medium"
            >
              → Ver mais modelos no catálogo
            </a>
          </div>

          <p className="text-sm opacity-70 mt-6">
            © {new Date().getFullYear()} PETLUXE. Todos os direitos reservados.
          </p>
          <p className="text-xs mt-2 opacity-60">
            Feito com ❤️ para quem ama seus pets como a gente.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-8 text-gray-400 hover:text-white text-sm transition"
          >
            ↑ Voltar ao topo
          </button>
        </div>
      </footer>

      {/* Botão Flutuante do WhatsApp */}
      <a
        href="https://wa.me/5521990634671"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50"
        aria-label="Falar no WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
};

export default App;