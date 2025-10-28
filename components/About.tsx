import React from 'react';

const About: React.FC<{ content: string }> = ({ content }) => {
  return (
    <section id="about" className="bg-gray-50 py-16 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-heading text-3xl md:text-4xl">Welcome to Generali's</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">{content}</p>
      </div>
    </section>
  );
};

export default About;
