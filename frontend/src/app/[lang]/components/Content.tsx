import EventsCarousel from '@/app/[lang]/components/EventsCarousel';
import { Event } from '@/app/types/Event';
import { useTranslation } from '@/app/i18n/useTranslation.server';
import { LangProps } from '@/app/i18n/types';
import { DEFAULT_EVENTS_COUNT } from '@/app/[lang]/constants';
import EventCard from './EventCard';

const CARD_WIDTH = 350;

function getEventsData(): { totalEventsCount: number; events: Event[] } {
  return {
    totalEventsCount: 14,
    events: new Array(DEFAULT_EVENTS_COUNT).fill(0).map((_, index) => ({
      id: index,
      title: `Card title ${index}`,
      description: 'This is the description',
      avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel',
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab fuga molestias nisi officia\n' +
        '        quod. Accusamus alias beatae earum facere illo inventore officiis optio',
    })),
  };
}

const Content = async ({ params }: LangProps) => {
  const eventsData = getEventsData();
  const t = await useTranslation(params.lang);

  return (
    <>
      <EventsCarousel
        title={t((d) => d.common.today)}
        eventWidth={CARD_WIDTH}
        totalEventsCount={eventsData.totalEventsCount}
        events={eventsData.events.map((event) => (
          <EventCard key={event.id} event={event} width={CARD_WIDTH} />
        ))}
      />
      <EventsCarousel
        title={t((d) => d.common.tomorrow)}
        eventWidth={CARD_WIDTH}
        totalEventsCount={eventsData.totalEventsCount}
        events={eventsData.events.map((event) => (
          <EventCard key={event.id} event={event} width={CARD_WIDTH} />
        ))}
      />
    </>
  );
};

export default Content;
