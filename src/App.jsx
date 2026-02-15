import React, { useState, useMemo } from 'react';
import './App.css';
import logoMain from '../pints/logoMain.jpeg';
import logoIndex from '../pints/logoIndex.jpg';
import logoMainWinter from '../pints/logoMainWinter.jpeg';
import logoIndexWinter from '../pints/logoindexWinter.jpg';

// Переводы
const translations = {
  ru: {
    deliveryTitle: 'ЛУЧШИЙ ФАСТФУД',
    deliverySubtitle: 'БЕСПЛАТНАЯ ДОСТАВКА ПО АРХЫЗУ',
    deliveryMinimum: 'ОТ 700₽',
    slogan: '#СОЧНО, БЫСТРО, ВКУСНО',
    burgers: 'БУРГЕРЫ',
    shawarma: 'ШАУРМА',
    wraps: 'ОБЁРТКИ',
    sets: 'СЕТЫ И КОМБО',
  },
  en: {
    deliveryTitle: 'BEST FAST FOOD',
    deliverySubtitle: 'FREE DELIVERY IN ARKHYZ',
    deliveryMinimum: 'FROM 700₽',
    slogan: '#JUICY, FAST, DELICIOUS',
    burgers: 'BURGERS',
    shawarma: 'SHAWARMA',
    wraps: 'WRAPS',
    sets: 'SETS & COMBO',
  }
};

// Описания меню на английском
const menuDescriptions = {
  en: {
    burgers: [
      { name: 'AMADEY', description: 'Brioche bun, white sauce, red sauce, signature sauce, jalapeño, tomato, breaded chicken, cheddar' },
      { name: 'TOP', description: 'Brioche bun, white sauce, signature sauce, teriyaki chicken, iceberg, cheddar cheese' },
      { name: 'SOULFUL', description: 'Brioche bun, white sauce, signature sauce, tomato, chicken egg, cheddar, iceberg' },
      { name: 'PATRICIAN', description: 'Sesame bun, signature beef, onion, tomato, egg, ham, iceberg lettuce, cheddar cheese' },
      { name: 'SIGNATURE', description: 'Brioche bun, signature BBQ beef, grill sauce, cheddar cheese, lettuce leaf' },
    ],
    shawarma: [
      { name: 'SIGNATURE', description: 'Cheese lavash, fries, BBQ beef, vegetables, signature and white sauce' },
      { name: 'ORIGINAL', description: 'Lavash, white sauce, chicken, iceberg, tomato, cucumber, onion' },
      { name: 'GYRO IN LAVASH', description: 'Lavash, chicken, tomato, cucumber, onion, white sauce, fries' },
      { name: 'CHEESE MOUNTAINS', description: 'Cheese lavash, chicken, tomato, white sauce, signature sauce, mozzarella, Adyghe cheese, local cheese' },
      { name: 'DONAR MALSI', description: 'Round lavash, chicken, vegetables, signature white Malsi sauce' },
      { name: 'CAPTAIN AMERICA', description: 'Lavash, tomato, chicken, fries, signature sauce, white sauce' },
      { name: 'DONAR BEEF', description: 'Round lavash, BBQ beef, signature sauce, white sauce, vegetables' },
    ],
    wraps: [
      { name: 'CHICKEN-SHOT', description: 'Tortilla, chicken, iceberg, tomato, cucumber, cheddar cheese, signature sauce' },
      { name: 'BEEF-SHOT', description: 'Tortilla, BBQ beef, iceberg, tomato, cucumber, cheddar cheese, signature sauce' },
      { name: 'ABU-DHABI', description: 'Wheat bun, breaded chicken, white sauce, lettuce leaf, cheddar cheese, vegetables' },
      { name: 'BIG-ALADDIN', description: 'Wheat bun, red sauce, signature sauce, mozzarella, BBQ beef, vegetables' },
      { name: 'SKIPASTI', description: 'Pita, tomato, cucumber, chicken, mozzarella, cheddar, white sauce, signature sauce' },
      { name: 'SIGNATURE SKIPASTI', description: 'Pita, tomato, cucumber, mozzarella, cheddar, signature beef' },
      { name: 'TASHE', description: 'Flatbread, chicken, fries, iceberg, tomato, cucumber, signature sauce, white sauce' },
      { name: 'SIGNATURE TASHE', description: 'Flatbread, signature beef, fries, tomato, cucumber, onion, white sauce, signature sauce' },
    ],
    sets: [
      { name: 'TRIO', description: 'Any three shawarmas, 3 fries' },
      { name: 'ELITE', description: 'Patrician burgers, 2 fries, cheese sticks' },
      { name: 'THREE TASHE', description: 'Three tashe, 3 fries, 3 cheese sauces' },
      { name: 'CROWD SET', description: '4 skipasti, 4 top burgers, 4 fries' },
      { name: 'SUPER-COMBO', description: 'Cola, fries + any shawarma, gyro or burger' },
    ]
  }
};

// Данные меню из PDF
const menuData = {
  burgers: [
    {
      name: 'АМАДЭЙ',
      price: 350,
      description: 'Булочка бриошь, белый соус, красный соус, фирменный соус, халапеньо, помидор, курица в кляре, чеддер'
    },
    {
      name: 'ТОПОВЫЙ',
      price: 399,
      description: 'Булочка бриошь, белый соус, фирменный соус, курица терияки, айзберг, сыр чеддер'
    },
    {
      name: 'ДУШЕВНЫЙ',
      price: 400,
      description: 'Булочка бриошь, белый соус, фирменный соус, помидор, курица яйцо, чеддер, айзберг'
    },
    {
      name: 'ПАТРИЦИАНСКИЙ',
      price: 450,
      description: 'Кунжутная булочка, фирменная говядина, лук, помидор, яйцо, ветчина, салат айзберг, сыр чеддер'
    },
    {
      name: 'ФИРМЕННЫЙ',
      price: 350,
      description: 'Булочка бриошь, фирменная говядина барбекю, соус гриль, сыр чеддер, лист салата'
    }
  ],
  shawarma: [
    {
      name: 'ФИРМЕННАЯ',
      price: 400,
      description: 'Сырный лаваш, картошка фри, говядина барбекю, овощи, соус фирменный и белый'
    },
    {
      name: 'ОРИГИНАЛЬНАЯ',
      price: 350,
      description: 'Лаваш, белый соус, курица, айзберг, помидор, огурец, лук'
    },
    {
      name: 'ГИРО В ЛАВАШЕ',
      price: 399,
      description: 'Лаваш, курица, помидор, огурец, лук, белый соус, картошка фри'
    },
    {
      name: 'СЫРНЫЕ ГОРЫ',
      price: 499,
      description: 'Сырный лаваш, курица, помидор, белый соус, фирменный соус, сыр моцарела, сыр адыгейский, сыр местный'
    },
    {
      name: 'ДОНАР МАЛСИ',
      price: 499,
      description: 'Лаваш круглый, курица, овощи, фирменный белый соус малси'
    },
    {
      name: 'КАПИТАН АМЕРИКА',
      price: 450,
      description: 'Лаваш, помидор, курица, картошка фри, соус фирменный, соус белый'
    },
    {
      name: 'ДОНАР ГОВЯДИНА',
      price: 399,
      description: 'Лаваш круглый, говядина барбекю, фирменный соус, белый соус, овощи'
    }
  ],
  wraps: [
    {
      name: 'ЧИКЕН-ШОТ',
      price: 399,
      description: 'Тортилья, курица, айзберг, помидор, огурец, сыр чеддер, фирменный соус'
    },
    {
      name: 'БИФ-ШОТ',
      price: 399,
      description: 'Тортилья, говядина-барбекью, айзберг, помидор, огурец, сыр чеддер, фирменный соус'
    },
    {
      name: 'АБУ-ДАБИ',
      price: 400,
      description: 'Булка пшеничная, курица в панировке, соус белый, лист салата, сыр чеддер, овощи'
    },
    {
      name: 'BIG-АЛЛАДИН',
      price: 499,
      description: 'Пшеничная булка, соус красный, соус фирменный, моцарела, говядина барбекью, овощи'
    },
    {
      name: 'СКИПАСТИ',
      price: 350,
      description: 'Пита, помидор, огурец, курица, моцарелла, чеддер, белый соус, фирменный соус'
    },
    {
      name: 'СКИПАСТИ ФИРМЕННЫЙ',
      price: 450,
      description: 'Пита, помидор, огурец, моцарелла, чеддер, фирменная говядина'
    },
    {
      name: 'ТАШЕ',
      price: 350,
      description: 'Лепешка, курица, картошка фри, айзберг, помидор, огурец, фирменный соус, белый соус'
    },
    {
      name: 'ФИРМЕННЫЙ ТАШЕ',
      price: 399,
      description: 'Лепешка, фирменная говядина, картошка фри, помидор, огурец, лук, белый соус, фирменный соус'
    }
  ],
  sets: [
    {
      name: 'ТРИО',
      price: 1450,
      description: 'Три любые шаурмы, 3 фри'
    },
    {
      name: 'ЭЛИТА',
      price: 1500,
      description: 'Патрицианские бургеры, 2 фри, сырные палочки'
    },
    {
      name: 'ТРИ ТАШЕ',
      price: 1450,
      description: 'Три таше, 3 фри, 3 сырных соуса'
    },
    {
      name: 'СЕТ НА ТОЛПУ',
      price: 3300,
      description: '4 скипасти, 4 топовых, 4 картошки фри'
    },
    {
      name: 'СУПЕР-КОМБО',
      price: 650,
      description: 'Кола, картошка фри + любая шаурма, гиро или бургер'
    }
  ]
};

function App() {
  const [activeCategory, setActiveCategory] = useState('burgers');
  const [isWinterMode, setIsWinterMode] = useState(false);
  const [language, setLanguage] = useState('ru');

  const t = translations[language];

  // Выбор логотипов в зависимости от режима
  const currentLogoMain = isWinterMode ? logoMainWinter : logoMain;
  const currentLogoIndex = isWinterMode ? logoIndexWinter : logoIndex;

  // Получить данные меню с учетом языка
  const getMenuItems = (category) => {
    const items = menuData[category];
    if (language === 'en' && menuDescriptions.en[category]) {
      return items.map((item, index) => ({
        ...item,
        name: menuDescriptions.en[category][index]?.name || item.name,
        description: menuDescriptions.en[category][index]?.description || item.description,
      }));
    }
    return items;
  };

  // Снежинки для зимнего режима - используем useMemo чтобы не пересоздавать
  const snowflakeData = useMemo(() => 
    [...Array(50)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 10}s`,
      animationDuration: `${8 + Math.random() * 12}s`,
      opacity: 0.3 + Math.random() * 0.5,
      fontSize: `${8 + Math.random() * 12}px`,
    })), []
  );

  return (
    <div className={`app ${isWinterMode ? 'winter-mode' : ''}`}>
      {isWinterMode && (
        <div className="snowflakes" aria-hidden="true">
          {snowflakeData.map((flake) => (
            <div 
              key={flake.id} 
              className="snowflake"
              style={{
                left: flake.left,
                animationDelay: flake.animationDelay,
                animationDuration: flake.animationDuration,
                opacity: flake.opacity,
                fontSize: flake.fontSize,
              }}
            >
              ❄
            </div>
          ))}
        </div>
      )}
      
      {/* Settings Buttons */}
      <div className="settings-buttons">
        <button 
          className={`settings-btn winter-btn ${isWinterMode ? 'active' : ''}`}
          onClick={() => setIsWinterMode(!isWinterMode)}
          title={language === 'ru' ? 'Зимний режим' : 'Winter mode'}
        >
          ❄
        </button>
        <button 
          className="settings-btn lang-btn"
          onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
        >
          {language === 'ru' ? 'EN' : 'RU'}
        </button>
      </div>

      {/* Header */}
      <header className="header">
        <div className="delivery-banner">
          <div className="logo-halal-group">
            <div className="bull-logo">
              <img src={currentLogoMain} alt="Food Point Logo" className="logo-image" />
            </div>
            <div className="logo-index-container">
              <img src={currentLogoIndex} alt="Food Point Index" className="logo-index" />
            </div>
            <div className="halal-logo">
              <div className="arabic">حلال</div>
              <div className="halal-text">HALAL</div>
            </div>
          </div>

          <div className="delivery-text">
            <div className="delivery-title">{t.deliveryTitle}</div>
            <div className="delivery-subtitle">{t.deliverySubtitle}</div>
            <div className="delivery-minimum">{t.deliveryMinimum}</div>
          </div>
        </div>
        
        <div className="top-bar">
          <div className="center-info">
            <div className="center-phone">8(903)-443-13-52</div>
            <div className="center-address">{language === 'ru' ? 'УЛ.ХУБИЕВА 1Д' : 'KHUBIEVA ST. 1D'}</div>
            <div className="center-hours">11:00 - 22:00</div>
          </div>
        </div>
      </header>

      {/* Center Section with Stars and Slogan */}
      <div className="center-section">
        <div className="stars">
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
        <div className="footer-slogan">{t.slogan}</div>
      </div>

      {/* Navigation */}
      <nav className="nav">
        <button 
          className={activeCategory === 'burgers' ? 'active' : ''}
          onClick={() => setActiveCategory('burgers')}
        >
          {t.burgers}
        </button>
        <button 
          className={activeCategory === 'shawarma' ? 'active' : ''}
          onClick={() => setActiveCategory('shawarma')}
        >
          {t.shawarma}
        </button>
        <button 
          className={activeCategory === 'wraps' ? 'active' : ''}
          onClick={() => setActiveCategory('wraps')}
        >
          {t.wraps}
        </button>
        <button 
          className={activeCategory === 'sets' ? 'active' : ''}
          onClick={() => setActiveCategory('sets')}
        >
          {t.sets}
        </button>
      </nav>

      {/* Menu Grid */}
      <main className="menu-grid">
        {getMenuItems(activeCategory).map((item, index) => (
          <div key={index} className="menu-item">
            <div className="menu-item-header">
              <h3 className="menu-item-name">{item.name}</h3>
              <div className="price-tag">{item.price}₽</div>
            </div>
            <p className="menu-item-description">{item.description}</p>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="footer">
      </footer>
    </div>
  );
}

export default App;
