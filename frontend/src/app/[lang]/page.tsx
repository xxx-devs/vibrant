import { LangProps } from '@/app/i18n/types';
import { Layout, Content as AntContent, Header as AntdHeader, Footer } from '@/app/lib/antd/Layout';
import React from 'react';
import Content from '@/app/[lang]/components/Content';
import Header from './components/Header';
import styles from './page.module.css';

export default function Home({ params }: LangProps) {
  return (
    <Layout>
      <AntdHeader className={styles.header}>
        <Header params={params} />
      </AntdHeader>
      <AntContent className={styles.content}>
        <Content params={params} />
      </AntContent>
      <Footer>@Vibrant</Footer>
    </Layout>
  );
}
