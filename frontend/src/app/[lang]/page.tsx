import { LangProps } from '@/app/i18n/types';
import { useTranslation } from '@/app/i18n/useTranslation.server';
import { DatePicker } from 'antd';
import styles from './page.module.css';
import Counter from './components/Counter';
import LocaleSwitcher from './components/LocaleSwitcher';

// надо сделать обертку куда положить эти импорты, и сделать его клиентским
// можно замерить как он подгружает, в теории он должен изначально вернуть серверный компонент без локалей
// а потом встроить клиентский с выставленными локалями

export default async function Home({ params: { lang } }: LangProps) {
  // надо сбилдить и посмотреть как он сохраняет словари (надо проверить что он не тащит лишних словарей)
  const t = await useTranslation(lang);

  return (
    <main className={styles.main}>
      <LocaleSwitcher />
      <p>Current locale: {lang}</p>
      <p>This text is rendered on the server: {t((d) => d['server-component'].welcome)}</p>
      <Counter />
      <DatePicker />
    </main>
  );
}
