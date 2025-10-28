import React, { useState, useEffect, useRef } from 'react';

interface TeamMember {
  image: string;
  name: string;
  role: string;
  bio: string;
}

const Team: React.FC<{ members: TeamMember[] }> = ({ members }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  if (!members || members.length === 0) {
      return null;
  }

  return (
    <section 
      ref={sectionRef}
      id="team" 
      className={`bg-white py-20 scroll-mt-20 transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl text-center">Meet the Team</h2>
        <p className="mt-3 text-gray-700 text-center">The passion behind every plate and glass.</p>
        <div className="mt-10 grid md:grid-cols-2 gap-10 items-center">
          {members.map((member, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full object-cover shadow-md flex-shrink-0" />
              <div>
                <h3 className="font-heading text-xl">{member.name}</h3>
                <p className="text-primary font-semibold text-sm uppercase tracking-wider">{member.role}</p>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
