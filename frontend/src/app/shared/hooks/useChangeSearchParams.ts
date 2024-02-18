'use client';

import { usePathname, useRouter } from 'next/navigation';

/*
  - каждый раз очищается SearchParams при вызове этой функции
  почему каждый раз лучше очищать? иначе надо передавать значения каждый раз с null или undefined чтобы они очистились
  будут ли ситуации, когда нам надо сохранить searchParams с предыдущих действий, не в рамках например только фильтрации?
 */

export default function useChangeSearchParams<T = Record<string, string | number | boolean>>() {
  const router = useRouter();
  const pathname = usePathname();

  function setSearchParams(params: Partial<T>) {
    const urlSearchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => urlSearchParams.append(key, String(item)));
        return;
      }
      urlSearchParams.set(key, String(value));
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  }

  return setSearchParams;
}
