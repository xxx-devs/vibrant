export const fallbackLanguage = 'en';
// поправить с dictionaries
// languages или locales ??
export const languages = [fallbackLanguage, 'de'];
// что такое NS ??
export const defaultNS = 'translation';
// куки надо подумать
export const cookieName = 'preferredlocale';

// тип возвращаемый задать так как он передается в i18next
export function getOptions(lang = fallbackLanguage, ns = defaultNS) {
  return {
    // debug: true,
    supportedLanguages: languages,
    fallbackLanguage,
    lng: lang,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}

// мне не очень нравится что переводы дублируют роутинг и название страниц
