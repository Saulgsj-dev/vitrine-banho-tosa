// src/components/AnimatedSection.jsx
import React, { useRef } from 'react';
import useOnScreen from '../hooks/useOnScreen';

const AnimatedSection = ({ children, className = '', animation = 'fade-up', delay = 0 }) => {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);

  // Definir classes com base no tipo de animação
  let animationClasses = 'transition-all duration-700 ease-out ';

  switch (animation) {
    case 'fade-up':
      animationClasses += isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-10';
      break;

    case 'fade-left':
      animationClasses += isVisible
        ? 'opacity-100 translate-x-0'
        : 'opacity-0 -translate-x-10';
      break;

    case 'fade-right':
      animationClasses += isVisible
        ? 'opacity-100 translate-x-0'
        : 'opacity-0 translate-x-10';
      break;

    case 'float':
      animationClasses += isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-6';
      if (isVisible) {
        animationClasses += ' animate-float';
      }
      break;

    case 'pop':
      animationClasses += isVisible
        ? 'opacity-100 scale-100'
        : 'opacity-0 scale-90';
      break;

    case 'glow':
      animationClasses += isVisible
        ? 'opacity-100'
        : 'opacity-0';
      if (isVisible) {
        animationClasses += ' animate-glow';
      }
      break;

    default:
      animationClasses += isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-10';
  }

  return (
    <div
      ref={ref}
      className={`${animationClasses} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;