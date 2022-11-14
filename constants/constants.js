const ERRORS = {
  CARD_NOT_FOUND: { message: 'Карточка с указанным _id не найдена.', id: 404 },
  USER_NOT_FOUND: { message: 'Пользователь с указанным _id не найден.', id: 404 },
  INVALID_DATA_USER_CREATE: { message: 'Переданы некорректные данные при создании пользователя.', id: 400 },
  INVALID_DATA_USER_UPDATE: { message: 'Переданы некорректные данные при обновлении профиля.', id: 400 },
  INVALID_DATA_AVATAR_UPDATE: { message: 'Переданы некорректные данные при обновлении аватара.', id: 400 },
  INVALID_DATA_CARD_CREATE: { message: 'Переданы некорректные данные при создании карточки.', id: 400 },
  INVALID_DATA_LIKE: { message: 'Переданы некорректные данные для постановки/снятии лайка.', id: 400 },
  DEFAULT_ERROR: { message: 'Ошибка сервера.', id: 500 },
};

module.exports = ERRORS;
