import React from 'react';

const Contact: React.FC<{ content: { address: string; phone: string }, rules: string[] }> = ({ content, rules }) => {
  const telLink = `tel:${content.phone.replace(/\s/g, '')}`;
  const whatsappLink = `https://wa.me/${content.phone.replace(/\s/g, '').replace('+', '')}?text=Hi%20Generali's%20Bar%20-%20I'd%20like%20to%20book%20a%20table`;
  
  return (
    <section id="contact" className="bg-white max-w-6xl mx-auto px-6 py-20 scroll-mt-20">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl">Contact & Location</h2>
          <p className="mt-3 text-gray-700">{content.address}</p>
          <p className="mt-2 text-gray-700">Phone/WhatsApp: <a href={telLink} className="font-semibold text-charcoal hover:text-primary transition-colors">{content.phone}</a></p>
          <div className="mt-4 flex gap-3">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="px-4 py-2 tracking-widest uppercase text-sm font-semibold border rounded-md hover:bg-gray-100 transition-colors">Book a table</a>
            <a href="#gallery" className="px-4 py-2 tracking-widest uppercase text-sm font-semibold border rounded-md hover:bg-gray-100 transition-colors">See Photos</a>
          </div>
          <div className="mt-6">
            <h4 className="font-heading text-lg">Hours</h4>
            <p className="text-gray-700 text-sm mt-1">Daily: 10:00am — 11:00pm<br/>Happy Hour (Weekdays): 3:00pm — 6:00pm</p>
          </div>
          <div className="mt-8 pt-6 border-t">
            <h4 className="font-heading text-lg">Dress Code & House Rules</h4>
            <ul className="mt-3 text-gray-700 text-sm space-y-2 list-disc list-inside">
              {rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <iframe className="w-full h-full" frameBorder="0" referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.980045554153!2d39.84711381530263!3d-3.633887044023249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x183f3ee3e8983949%3A0x6b4a2b25ae64b18c!2sKilifi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1628884245132!5m2!1sen!2sus"
              allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;