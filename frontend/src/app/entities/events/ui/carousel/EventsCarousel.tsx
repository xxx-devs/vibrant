'use client';

import React, { useMemo, useRef } from 'react';
import { Button, Flex } from 'antd';
import { Title } from '@/app/shared/ui/Typography';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useTranslation } from '@/app/shared/i18n/useTranslation.client';
import Carousel from '@/app/shared/ui/carousel/Carousel';
import { DEFAULT_EVENTS_COUNT } from '@/app/[lang]/constants';
import Card from '@/app/shared/ui/Card';
import styles from './styles.module.css';

interface EventsCarouselProps {
  events: React.ReactElement[];
  eventWidth: number;
  title: string;
  totalEventsCount: number;
}

const EventsCarousel = ({ events, title, eventWidth, totalEventsCount }: EventsCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const t = useTranslation();

  const onClickRight = () => {
    if (carouselRef.current) {
      const { scrollLeft } = carouselRef.current;
      const nextScrollCard = Math.floor(scrollLeft / eventWidth) + 1;

      carouselRef.current.scrollLeft = nextScrollCard * eventWidth;
    }
  };

  const onClickLeft = () => {
    if (carouselRef.current) {
      const { scrollLeft } = carouselRef.current;
      const prevScrollCard = Math.ceil(scrollLeft / eventWidth) - 1;

      carouselRef.current.scrollLeft = prevScrollCard * eventWidth;
    }
  };

  const rowChildren = useMemo(() => {
    const result = [...events];

    if (totalEventsCount > events.length) {
      // не нравится что тут Card используется
      // так как то, как отображается событие хранится в EventCard, и если там поменяется то и тут надо вносить изменение
      // это своего рода дублирование
      result.push(
        <Card key="show-more" className={styles.event__card} hoverable>
          <Button type="link">{t((d) => d['events-carousel']['show-more'])}</Button>
        </Card>,
      );
    }

    if (DEFAULT_EVENTS_COUNT > totalEventsCount) {
      result.push(
        <Card className={styles.event__card} hoverable>
          <Button type="link">{t((d) => d['create-event'])}</Button>
        </Card>,
      );
    }

    return result;
  }, [events, totalEventsCount]);

  return (
    <div>
      <Flex justify="space-between" align="flex-end" className={styles.carousel__header}>
        <Title>{title}</Title>
        <Flex gap="middle">
          <Button type="link">
            <span style={{ textDecoration: 'underline' }}>
              {t((d) => d['events-carousel']['show-all'], { count: totalEventsCount })}
            </span>
          </Button>
          <Flex gap="small">
            <Button onClick={onClickLeft}>
              <LeftOutlined />
            </Button>
            <Button onClick={onClickRight}>
              <RightOutlined />
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Carousel ref={carouselRef} elementWidth={eventWidth}>
        {rowChildren}
      </Carousel>
    </div>
  );
};

export default EventsCarousel;
