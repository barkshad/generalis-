import React from 'react';

const Specials: React.FC<{ content: string }> = ({ content }) => {
  if (!content || content.trim() === '') {
    return null;
  }

  return (
    <section id="specials" className="bg-primary/10 py-16 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl text-center">Today's Specials</h2>
        <p className="mt-2 text-gray-700 text-center">Freshly prepared just for you. Available for dine-in or delivery!</p>
        <div className="mt-8 p-8 border-2 border-dashed border-primary/50 rounded-lg bg-white shadow-xl text-charcoal leading-relaxed">
           {content.split('\n').map((line, index) => (
             <p 
                key={index} 
                className="my-1"
                dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-charcoal/90">$1</strong>') || '&nbsp;'}}
             />
           ))}
        </div>
      </div>
    </section>
  );
};

export default Specials;
