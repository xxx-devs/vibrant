'use client';

import React, { useMemo, useRef } from 'react';
import { Button, Col, Flex, Row } from 'antd';
import { Title } from '@/app/lib/antd/Typography';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from '@/app/[lang]/page.module.css';
import Card from '@/app/lib/antd/Card';
import { useTranslation } from '@/app/i18n/useTranslation.client';
import { DEFAULT_EVENTS_COUNT } from '@/app/[lang]/constants';

interface EventsCarouselProps {
  events: React.ReactElement[];
  eventWidth: number;
  title: string;
  totalEventsCount: number;
}

const EventsCarousel = ({ events, title, eventWidth, totalEventsCount }: EventsCarouselProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const t = useTranslation();

  const onClickRight = () => {
    if (rowRef.current) {
      const { scrollLeft } = rowRef.current;
      const nextScrollCard = Math.floor(scrollLeft / eventWidth) + 1;

      rowRef.current.scrollLeft = nextScrollCard * eventWidth;
    }
  };

  const onClickLeft = () => {
    if (rowRef.current) {
      const { scrollLeft } = rowRef.current;
      const prevScrollCard = Math.ceil(scrollLeft / eventWidth) - 1;

      rowRef.current.scrollLeft = prevScrollCard * eventWidth;
    }
  };

  const rowChildren = useMemo(() => {
    const result = [...events];

    if (totalEventsCount > events.length) {
      // не нравится что тут Card используется
      // так как то, как отображается событие хранится в EventCard, и если там поменяется то и тут надо вносить изменение
      // это своего рода дублирование
      result.push(
        <Card className={styles.event__card} hoverable>
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
    <section>
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
      <Row gutter={16} justify="start" wrap={false} className={styles.events__row} ref={rowRef}>
        {rowChildren.map((child, index) => (
          <Col key={index} style={{ minWidth: eventWidth }}>
            {child}
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default EventsCarousel;
