import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { getOptions } from './settings';

// https://locize.com/blog/next-app-dir-i18n/

// что такое ns ??
const initI18next = async (lang, ns) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    // .use(
    //   resourcesToBackend(
    //     (language, namespace) => import(`./locales/${language}/${namespace}.json`),
    //   ),
    // )
    .init(getOptions(lang, ns));
  return i18nInstance;
};

/*
  We're not using the i18next singleton here but creating a new instance on each useTranslation call,
  because during compilation everything seems to be executed in parallel.
  Having a separate instance will keep the translations consistent.

  спорное суждение каждый раз создавать новый инстанс
 */
export async function useTranslation(lang, ns, options = {}) {
  const i18nextInstance = await initI18next(lang, ns);
  return {
    t: i18nextInstance.getFixedT(lang, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}
