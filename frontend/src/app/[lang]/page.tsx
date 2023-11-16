import LocaleSwitcher from '@/app/[lang]/components/LocaleSwitcher';
import { useTranslation } from '@/app/i18n/useTranslation.server';
import { LangProps } from '@/app/i18n/types';
import styles from './page.module.css';
import Counter from './components/Counter';

export default async function Home({ params: { lang } }: LangProps) {
  // надо сбилдить и посмотреть как он сохраняет словари (надо проверить что он не тащит лишних словарей)
  const t = await useTranslation(lang);

  return (
    <main className={styles.main}>
      <LocaleSwitcher />
      <p>Current locale: {lang}</p>
      <p>This text is rendered on the server: {t((d) => d['server-component'].welcome)}</p>
      <Counter />
    </main>
  );
}
