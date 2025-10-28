
import React from 'react';

const Rules: React.FC = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-heading text-2xl md:text-3xl">Dress Code & House Rules</h2>
        <ul className="mt-4 text-gray-700 space-y-2 list-disc list-inside">
          <li>Smart casual recommended. No swimwear or flip-flops after 6pm.</li>
          <li>We reserve the right of admission.</li>
          <li>Please respect staff and other guests — loud or abusive behaviour will not be tolerated.</li>
        </ul>
      </div>
    </section>
  );
};

export default Rules;
