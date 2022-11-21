const ERRORS = {
  PAGE_NOT_FOUND: { message: 'Запрашиваемый ресурс не найден', code: 404 },
  CARD_NOT_FOUND: { message: 'Карточка с указанным _id не найдена.', code: 404 },
  USER_NOT_FOUND: { message: 'Пользователь с указанным _id не найден.', code: 404 },
  INVALID_DATA: { message: 'Переданы некорректные данные.', code: 400 },
  INVALID_DATA_USER_CREATE: { message: 'Переданы некорректные данные при создании пользователя.', code: 400 },
  INVALID_DATA_USER_UPDATE: { message: 'Переданы некорректные данные при обновлении профиля.', code: 400 },
  INVALID_DATA_AVATAR_UPDATE: { message: 'Переданы некорректные данные при обновлении аватара.', code: 400 },
  INVALID_DATA_CARD_CREATE: { message: 'Переданы некорректные данные при создании карточки.', code: 400 },
  INVALID_DATA_LIKE: { message: 'Переданы некорректные данные для постановки/снятии лайка.', code: 400 },
  DEFAULT_ERROR: { message: 'Ошибка сервера.', code: 500 },
  UNAUTHORIZED: { message: 'Переданные данные неверны.', code: 401 },
  AUTH_ERROR: { message: 'Необходима авторизация.', code: 401 },
};

module.exports = ERRORS;
