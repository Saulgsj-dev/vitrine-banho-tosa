// src/App.jsx
import React, { useState, useEffect } from 'react';

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const services = [
    { id: 1, name: "Banho Premium", price: "R$ 65,00", image: "/1.png", description: "Shampoo premium, condicionador, perfume e hidratação facial." },
    { id: 2, name: "Tosa Higiênica", price: "R$ 55,00", image: "/2.png", description: "Limpeza de áreas sensíveis, corte de unhas e higienização auricular." },
    { id: 3, name: "Tosa Filhote", price: "R$ 75,00", image: "/3.png", description: "Corte suave e carinhoso para os primeiros cuidados do seu pet." },
    { id: 4, name: "Tosa Raça", price: "R$ 85,00", image: "/4.png", description: "Estilo específico para raças: Poodle, Shih Tzu, Lhasa, etc." },
    { id: 5, name: "Hidratação Capilar", price: "R$ 40,00", image: "/5.png", description: "Máscara reconstrutora para pelos ressecados ou danificados." },
    { id: 6, name: "Escovação Completa", price: "R$ 35,00", image: "/6.png", description: "Desembaraço, remoção de pelos mortos e brilho intenso." },
    { id: 7, name: "Pacote Spa Pet", price: "R$ 150,00", image: "/7.png", description: "Banho + tosa + hidratação + perfume + laço ou gravatinha." },
    { id: 8, name: "Day Care (4h)", price: "R$ 90,00", image: "/8.png", description: "Seu pet brinca, socializa e se diverte enquanto você resolve seu dia." },
  ];

  const testimonials = [
    { name: "Juliana & Bob", avatar: "https://randomuser.me/api/portraits/women/36.jpg", text: "Meu Bob saiu cheiroso, penteadinho e feliz! Atendimento impecável!" },
    { name: "Ricardo & Mel", avatar: "https://randomuser.me/api/portraits/men/41.jpg", text: "Mel odeia banho, mas aqui ela fica calma. Profissionais incríveis!" },
    { name: "Patrícia & Thor", avatar: "https://randomuser.me/api/portraits/women/62.jpg", text: "Thor é grandão e agitado, mas eles dominam com carinho e segurança. Recomendo!" },
  ];

  const advantages = [
    { icon: "🛁", title: "Produtos Premium", desc: "Usamos shampoos hipoalergênicos e livres de químicos agressivos." },
    { icon: "⏱️", title: "Agendamento Online", desc: "Marque pelo WhatsApp ou site. Horários flexíveis e lembrete por SMS." },
    { icon: "❤️", title: "Ambiente Calmo", desc: "Sem estresse! Música suave, petiscos e muito carinho para seu pet." },
  ];

  const handleWhatsAppClick = (serviceName) => {
    const message = `Olá, PETLUXE! Gostaria de agendar: ${serviceName}`;
    const url = `https://wa.me/55SEUNUMERO?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Detecta seção ativa ao rolar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'testimonials', 'advantages', 'promo'];
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

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* Navbar Fixo */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-center gap-8 md:gap-12 text-sm md:text-base">
          <button 
            onClick={() => scrollToSection('services')}
            className={`font-medium transition hover:text-gray-600 ${activeSection === 'services' ? 'text-gray-900 border-b-2 border-gray-900 pb-1' : 'text-gray-500'}`}
          >
            Serviços
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')}
            className={`font-medium transition hover:text-gray-600 ${activeSection === 'testimonials' ? 'text-gray-900 border-b-2 border-gray-900 pb-1' : 'text-gray-500'}`}
          >
            Depoimentos
          </button>
          <button 
            onClick={() => scrollToSection('advantages')}
            className={`font-medium transition hover:text-gray-600 ${activeSection === 'advantages' ? 'text-gray-900 border-b-2 border-gray-900 pb-1' : 'text-gray-500'}`}
          >
            Vantagens
          </button>
          <button 
            onClick={() => scrollToSection('promo')}
            className={`font-medium transition hover:text-gray-600 ${activeSection === 'promo' ? 'text-gray-900 border-b-2 border-gray-900 pb-1' : 'text-gray-500'}`}
          >
            Promoção
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="h-screen bg-cover bg-center bg-fixed flex items-center justify-center text-center text-white relative pt-20"
        style={{ backgroundImage: "url('/banner-banho.webp')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">PETLUXE</h1>
          <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto opacity-90">
            Banho, tosa & muito carinho. Seu pet merece o melhor tratamento — com conforto e amor.
          </p>
          <button 
            onClick={() => scrollToSection('services')}
            className="bg-white text-gray-900 font-medium py-4 px-10 rounded-full transition duration-300 shadow hover:shadow-lg hover:bg-gray-100"
          >
            Ver Serviços
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-light text-center mb-4">Nossos <span className="font-medium">Serviços</span></h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Cada serviço é feito com carinho, produtos de qualidade e atenção aos detalhes do seu pet.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                className="bg-gray-50 rounded-2xl shadow-sm overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-md group border border-gray-200"
              >
                <div className="h-56 overflow-hidden bg-white flex items-center justify-center">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-lg mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  <p className="font-bold text-lg mb-4">{service.price}</p>
                  <button
                    onClick={() => handleWhatsAppClick(service.name)}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-lg font-medium transition duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow"
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
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-light text-center mb-4">O que nossos <span className="font-medium">clientes (e pets!) dizem</span></h2>
          <p className="text-center text-gray-600 mb-16">Quem já confiou, ama — e volta sempre!</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow transition duration-300 text-center border border-gray-200">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-gray-300"
                />
                <h4 className="font-medium mb-2">{testimonial.name}</h4>
                <p className="text-gray-600 italic">“{testimonial.text}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vantagens */}
      <section id="advantages" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-4">Por que escolher o <span className="font-medium">PETLUXE?</span></h2>
          <p className="text-gray-600 mb-16">Tudo pensado para o bem-estar do seu pet e sua tranquilidade.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {advantages.map((adv, index) => (
              <div key={index} className="group bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow transition-all duration-500 border border-gray-200">
                <div className="text-5xl mb-4 inline-block">
                  {adv.icon}
                </div>
                <h3 className="text-xl font-medium mb-3">{adv.title}</h3>
                <p className="text-gray-600">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promoção Relâmpago */}
      <section id="promo" className="py-24 bg-gray-900 text-white text-center">
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
            className="bg-white text-gray-900 font-medium py-4 px-10 rounded-full hover:bg-gray-100 transform hover:scale-105 transition duration-300 shadow border border-gray-200 hover:shadow-lg"
          >
            Agendar Promoção
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-light mb-2">PETLUXE</h3>
          <p className="mb-6 opacity-80">Banho, tosa & muito carinho — porque seu pet é da família.</p>
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="hover:text-gray-300 transition">Instagram</a>
            <a href="#" className="hover:text-gray-300 transition">Facebook</a>
            <a href="#" className="hover:text-gray-300 transition">WhatsApp</a>
          </div>

          <div className="border-t border-gray-700 pt-6 mt-8">
            <p className="text-xs opacity-60 mb-2">
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

          <p className="text-sm opacity-60 mt-6">
            © {new Date().getFullYear()} PETLUXE. Todos os direitos reservados.
          </p>
          <p className="text-xs mt-2 opacity-50">
            Feito com ❤️ para quem ama seus pets como a gente.
          </p>

          {/* Botão de voltar ao topo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-8 text-gray-400 hover:text-white text-sm transition"
          >
            ↑ Voltar ao topo
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;