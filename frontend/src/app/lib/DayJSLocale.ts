'use client';

import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import { LangProps } from '@/app/shared/i18n/types';

import localizedFormat from 'dayjs/plugin/localizedFormat';

// https://github.com/ant-design/ant-design/issues/45931
const DayJSLocale = ({ params }: LangProps) => {
  dayjs.locale(params.lang);
  dayjs.extend(localizedFormat);

  return null;
};

export default DayJSLocale;
