import React, { FC } from 'react';
import Image from 'next/image';
import Card, { Meta } from '@/app/shared/ui/Card';
import { Avatar } from 'antd';
import { Event } from '@/app/shared/types/Event';
import styles from './styles.module.css';

interface EventCardProps {
  event: Event;
  width: number;
}

const EventCard: FC<EventCardProps> = (props) => {
  const { event, width } = props;

  return (
    // каждая карточка должна быть линкой
    <Card
      className={styles.event__card}
      hoverable
      cover={<Image width={width} height={200} alt="example" src={event.cover} />}
    >
      <Meta
        avatar={<Avatar src={event.avatar} />}
        title={event.title}
        description={event.description}
      />
      <div>{event.content}</div>
    </Card>
  );
};

export default EventCard;
