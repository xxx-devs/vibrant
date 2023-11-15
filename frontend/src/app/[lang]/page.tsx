import LocaleSwitcher from '@/app/[lang]/components/LocaleSwitcher';
import { Locale } from '@/app/i18n/config';
import styles from './page.module.css';
import Counter from './components/Counter';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  // как он серверному компоненту передает новые пропсы ?
  // надо сбилдить и посмотреть как он сохраняет словари (надо проверить что он не тащит лишних словарей)
  return (
    <main className={styles.main}>
      <LocaleSwitcher />
      <p>Current locale: {lang}</p>
      {/* <p>This text is rendered on the server: {dictionary['server-component'].welcome}</p> */}
      <Counter />
    </main>
  );
}
