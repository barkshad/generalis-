
import React from 'react';

const Events: React.FC = () => {
  return (
    <section id="events" className="bg-white py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl">Events & Happy Hour</h2>
        <p className="mt-3 text-gray-700">Good food. Great music. Even better memories.</p>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <h4 className="font-heading text-lg">Happy Hour</h4>
            <p className="mt-2 text-sm text-gray-600">Weekdays 3pm — 6pm. Select cocktails & beers at special prices.</p>
          </div>
          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <h4 className="font-heading text-lg">Live DJ Nights</h4>
            <p className="mt-2 text-sm text-gray-600">Fridays & Saturdays — DJ from 8pm. No cover charge before 9pm.</p>
          </div>
          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <h4 className="font-heading text-lg">Weekend BBQ Bash</h4>
            <p className="mt-2 text-sm text-gray-600">Saturdays from 6pm — family-friendly, music & grill specials.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;