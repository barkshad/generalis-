import React from 'react';

interface MenuItem {
  name: string;
  price: string;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

const MenuCategoryCard: React.FC<{ category: MenuCategory }> = ({ category }) => (
  <div className="p-4 border rounded-lg bg-white shadow-sm">
    <h3 className="font-heading text-lg">{category.title}</h3>
    <ul className="mt-2 text-sm text-gray-700">
      {category.items.map((item) => (
        <li key={item.name} className="flex justify-between py-1 border-b border-gray-100 last:border-b-0">
          <span>{item.name}</span>
          <span className="font-medium text-charcoal">{item.price}</span>
        </li>
      ))}
    </ul>
  </div>
);

const FullMenuCard: React.FC<{ category: MenuCategory }> = ({ category }) => (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
        <h4 className="font-heading text-lg">{category.title}</h4>
        <div className="mt-2 text-sm text-gray-700 space-y-1">
          {category.items.map(item => (
            <div key={item.name} className="flex justify-between">
              <span>{item.name}</span>
              <span>{item.price}</span>
            </div>
          ))}
        </div>
    </div>
);


const Menu: React.FC<{ content: { overview: MenuCategory[]; fullMenu: MenuCategory[] } }> = ({ content }) => {
  return (
    <section id="menu" className="bg-gray-50 max-w-6xl mx-auto px-6 py-20 scroll-mt-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl">Menu Overview</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">Our kitchen opens daily at 10am. From BBQ to seafood platters, artisan pizzas to signature cocktails — served with coastal charm. Order for pickup or reserve a table for an evening out.</p>
          <div className="mt-6 flex gap-3">
            <a href="#fullmenu" className="px-4 py-2 tracking-widest uppercase text-sm font-semibold border rounded-md hover:bg-gray-100 transition-colors">View Full Menu</a>
            <a href="https://wa.me/254723836288?text=Hi%2C%20I%20want%20to%20order%20via%20WhatsApp" target="_blank" rel="noopener noreferrer" className="px-4 py-2 tracking-widest uppercase text-sm font-semibold border rounded-md hover:bg-gray-100 transition-colors">Order via WhatsApp</a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {content.overview.map((category) => (
            <MenuCategoryCard key={category.title} category={category} />
          ))}
        </div>
      </div>

      <div id="fullmenu" className="mt-20 border-t pt-10 scroll-mt-20">
        <h3 className="font-heading text-2xl md:text-3xl">Full Menu</h3>
        <div className="mt-4 grid md:grid-cols-3 gap-6">
          {content.fullMenu.map((category) => (
             <FullMenuCard key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;