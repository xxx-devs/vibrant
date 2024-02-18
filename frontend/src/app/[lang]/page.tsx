import { LangProps } from '@/app/shared/i18n/types';
import {
  Layout,
  Content as AntContent,
  Header as AntdHeader,
  Footer,
} from '@/app/shared/ui/Layout';
import React from 'react';
import { Header } from '@/app/widgets/layout';
import { EventsCarousel } from '@/app/widgets/event';
import { EventsFilter } from '@/app/features';
import { eventModel } from '../entities/events';
import styles from './styles.module.css';

export default async function Home({ params }: LangProps) {
  return (
    <Layout>
      <AntdHeader className={styles.header}>
        <Header params={params} />
      </AntdHeader>
      <AntContent className={styles.content}>
        <EventsFilter />
        <EventsCarousel getEvents={eventModel.getData} params={params} />
        <EventsCarousel getEvents={eventModel.getData} params={params} />
      </AntContent>
      <Footer>@Vibrant</Footer>
    </Layout>
  );
}
