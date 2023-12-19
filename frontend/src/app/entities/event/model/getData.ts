import { Event } from '@/app/shared/types/Event';
import { DEFAULT_EVENTS_COUNT } from '@/app/[lang]/constants';

export function getData(): { totalEventsCount: number; events: Event[] } {
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
