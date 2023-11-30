import { LangProps } from '@/app/i18n/types';
import { Content } from '@/app/lib/antd/Layout';
import Header from '@/app/[lang]/components/Header';

export default function Home({ params }: LangProps) {
  return (
    <main>
      <Header params={params} />
      <Content>123</Content>
    </main>
  );
}
