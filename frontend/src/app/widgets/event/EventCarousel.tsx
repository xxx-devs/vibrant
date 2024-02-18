import React from 'react';
import { useTranslation } from '@/app/shared/i18n/useTranslation.server';
import { LangProps } from '@/app/shared/i18n/types';
import { Event } from '@/app/shared/types/Event';
import { EventCard, EventsCarousel } from '../../entities/events';

const CARD_WIDTH = 350;

interface EventsCarouselProps {
  getEvents: () => { totalEventsCount: number; events: Event[] };
}

const EventsCarouselWidget = async ({ params, getEvents }: LangProps & EventsCarouselProps) => {
  const t = await useTranslation(params.lang);
  const eventsData = getEvents();

  return (
    <section>
      <EventsCarousel
        title={t((d) => d.common.today)}
        eventWidth={CARD_WIDTH}
        totalEventsCount={eventsData.totalEventsCount}
        events={eventsData.events.map((event) => (
          <EventCard key={event.id} event={event} width={CARD_WIDTH} />
        ))}
      />
    </section>
  );
};

export default EventsCarouselWidget;
