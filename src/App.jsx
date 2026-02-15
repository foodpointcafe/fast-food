import React, { useState } from 'react';
import './App.css';
import logoMain from '../pints/logoMain.jpg';
import logoIndex from '../pints/logoIndex.jpg';

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

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="delivery-banner">
          <div className="logo-halal-group">
            <div className="bull-logo">
              <img src={logoMain} alt="Food Point Logo" className="logo-image" />
            </div>
            <div className="logo-index-container">
              <img src={logoIndex} alt="Food Point Index" className="logo-index" />
            </div>
            <div className="halal-logo">
              <div className="arabic">حلال</div>
              <div className="halal-text">HALAL</div>
            </div>
          </div>

          <div className="delivery-text">
            <div className="delivery-title">ЛУЧШИЙ ФАСТФУД</div>
            <div className="delivery-subtitle">БЕСПЛАТНАЯ ДОСТАВКА ПО АРХЫЗУ</div>
            <div className="delivery-minimum">ОТ 700₽</div>
          </div>
        </div>
        
        <div className="top-bar">
          <div className="center-info">
            <div className="center-phone">8(903)-443-13-52</div>
            <div className="center-address">УЛ.ХУБИЕВА 1Д</div>
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
        <div className="footer-slogan">#СОЧНО, БЫСТРО, ВКУСНО</div>
      </div>

      {/* Navigation */}
      <nav className="nav">
        <button 
          className={activeCategory === 'burgers' ? 'active' : ''}
          onClick={() => setActiveCategory('burgers')}
        >
          БУРГЕРЫ
        </button>
        <button 
          className={activeCategory === 'shawarma' ? 'active' : ''}
          onClick={() => setActiveCategory('shawarma')}
        >
          ШАУРМА
        </button>
        <button 
          className={activeCategory === 'wraps' ? 'active' : ''}
          onClick={() => setActiveCategory('wraps')}
        >
          ОБЁРТКИ
        </button>
        <button 
          className={activeCategory === 'sets' ? 'active' : ''}
          onClick={() => setActiveCategory('sets')}
        >
          СЕТЫ И КОМБО
        </button>
      </nav>

      {/* Menu Grid */}
      <main className="menu-grid">
        {menuData[activeCategory].map((item, index) => (
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
