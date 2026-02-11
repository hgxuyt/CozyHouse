(function() {
  'use strict';

  var params = new URLSearchParams(window.location.search);
  var id = params.get('id') || '1';
  var data = null;
  var list = window.APARTMENTS_DATA;

  if (list && list.length) {
    for (var i = 0; i < list.length; i++) {
      if (String(list[i].id) === String(id)) {
        data = list[i];
        break;
      }
    }
  }

  if (!data) {
    var fallback = {
      id: 1,
      title: 'Студия в центре, вид на парк',
      meta: 'Москва, Арбат · до 2 гостей · Посуточно',
      price: 'от 3 500 ₽',
      priceUnit: '/ ночь',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=675&fit=crop',
      description: 'Уютная студия с панорамным видом на парк. Полностью оборудованная кухня, современная мебель, кондиционер и быстрый Wi‑Fi.',
      amenities: ['Wi‑Fi', 'Кондиционер', 'Кухня', 'Стиральная машина', 'Телевизор', 'Утюг']
    };
    data = fallback;
  }

  var titleEl = document.getElementById('apartment-title');
  var metaEl = document.getElementById('apartment-meta');
  var priceEl = document.getElementById('apartment-price');
  var imageEl = document.getElementById('apartment-image');
  var descEl = document.getElementById('apartment-description');
  var amenitiesEl = document.getElementById('apartment-amenities');

  var metaStr = (data.cityName || '') ? (data.cityName + ', ' + data.meta) : data.meta;
  if (data.type) metaStr += ' · ' + (data.type === 'daily' ? 'Посуточно' : 'Длительно');

  if (titleEl) titleEl.textContent = data.title;
  if (metaEl) metaEl.textContent = metaStr;
  if (priceEl) priceEl.innerHTML = data.price + ' <span>' + data.priceUnit + '</span>';
  if (imageEl) {
    imageEl.src = data.image;
    imageEl.alt = data.title;
  }
  if (descEl) descEl.innerHTML = '<p>' + (data.description || '') + '</p>';
  if (amenitiesEl && data.amenities && data.amenities.length) {
    amenitiesEl.innerHTML = data.amenities.map(function(a) {
      return '<span class="amenity">' + a + '</span>';
    }).join('');
  }

  document.title = data.title + ' — Уютный Дом';

  var sidebar = document.querySelector('.apartment-sidebar');
  if (sidebar) {
    var btnCall = sidebar.querySelector('a[href^="tel:"]');
    if (btnCall) btnCall.setAttribute('href', 'tel:88005553535');
  }
})();
