import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

i18n.translations = {
  en: {
    tours: {
      food: 'Food tour',
      metropol: 'Metropol tour',
      cultural: 'Cultural tour',
      water: 'Water tour',
      joy: 'Joy tour'
    },
    headers: {
      main: 'Main',
      activity: 'Activities of Moscow'
    },
    search: 'Search',
    bottomBar: {
      main: 'Main',
      services: 'Services',
      chat: 'Chat'
    },
    helloMessage: 'Hello! How can I help you?',
    loadMore: 'Load more'
  },
  'ru-RU': {
    tours: {
      food: 'Гастро тур',
      metropol: 'Метрополь тур',
      cultural: 'Светский тур',
      water: 'Водный тур',
      joy: 'Развлекательный'
    },
    headers: {
      main: 'Главная',
      activity: 'Активности в Москве'
    },
    search: 'Поиск',
    bottomBar: {
      main: 'Главная',
      services: 'Услуги',
      chat: 'Чат'
    },
    helloMessage: 'Здравствуйте! Чем я могу вам помочь?',
    loadMore: 'Загрузить больше'
  }
}

i18n.locale = Localization.locale

export { i18n }
