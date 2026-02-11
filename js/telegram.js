// Отправка данных в Telegram
window.sendToTelegram = function(data, onSuccess, onError) {
  const config = window.telegramConfig || {};
  
  if (!config.botToken || !config.chatId) {
    console.error('Telegram config not found');
    if (onError) onError('Конфигурация Telegram не настроена');
    return;
  }

  // Форматируем сообщение
  let message = '📋 *Новая заявка на аренду*\n\n';
  
  // Основные поля
  message += `*Имя:* ${data.name || 'Не указано'}\n`;
  message += `*Телефон:* ${data.phone || 'Не указан'}\n`;
  
  // Дополнительные поля
  if (data.apartmentTitle) {
    message += `*Квартира:* ${data.apartmentTitle}\n`;
  }
  
  if (data.rentPeriod) {
    message += `*Срок аренды:* ${data.rentPeriod}\n`;
  }
  
  if (data.totalPrice) {
    message += `*Сумма:* ${data.totalPrice} ₽\n`;
  }
  
  if (data.source) {
    message += `*Источник:* ${data.source}\n`;
  }
  
  message += `\n📅 *Время:* ${new Date().toLocaleString('ru-RU')}`;
  
  // Кодируем сообщение для URL
  const encodedMessage = encodeURIComponent(message);
  const url = `${config.apiUrl}${config.botToken}/sendMessage`;
  
  // Отправляем запрос
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: config.chatId,
      text: message,
      parse_mode: 'Markdown'
    })
  })
  .then(response => response.json())
  .then(result => {
    if (result.ok) {
      console.log('Сообщение отправлено в Telegram');
      if (onSuccess) onSuccess();
    } else {
      console.error('Ошибка Telegram:', result);
      if (onError) onError(result.description || 'Ошибка отправки');
    }
  })
  .catch(error => {
    console.error('Ошибка сети:', error);
    if (onError) onError('Ошибка сети при отправке');
  });
};