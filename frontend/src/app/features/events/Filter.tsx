'use client';

import { Flex, Input, Form, DatePicker, AutoComplete, Select, Button } from 'antd';
import { useTranslation } from '@/app/shared/i18n/useTranslation.client';
import dayjs from 'dayjs';
import useChangeSearchParams from '@/app/shared/hooks/useChangeSearchParams';
import { FieldData } from '@/app/shared/types/Form';
import { useSearchParams } from 'next/navigation';
import { languages } from 'countries-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSliders,
  faVolleyballBall,
  faDice,
  faChampagneGlasses,
  faMasksTheater,
  faVideo,
  faRibbon,
} from '@fortawesome/free-solid-svg-icons';
import { Text } from '@/app/shared/ui/Typography';
import { CSSProperties } from 'react';

const FilterNames = {
  search: 'search',
  startDate: 'start-date',
  endDate: 'end-date',
  country: 'country',
  city: 'city',
  language: 'lang',
} as const;

const tagStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const iconStyle: CSSProperties = {
  fontSize: 24,
  marginBottom: 8,
  color: '#666',
};

// перенести это на сервер чтобы не тащить либу
const LANGUAGES_OPTIONS = Object.values(languages).map(({ name, native }) => ({
  value: name,
  label: `${native} (${name})`,
}));

// нет проверки что все ключи должны быть перечислены
type FilterValues = {
  [FilterNames.search]: string | null;
  [FilterNames.startDate]: dayjs.Dayjs | null;
  [FilterNames.endDate]: dayjs.Dayjs | null;
  [FilterNames.city]: string | null;
  [FilterNames.country]: string | null;
  [FilterNames.language]: string[] | null;
};

// добавить фильтры
// - выбор языка ??
// - выбор города
// - выбор категории (теги) - заменить везде иконки на fa-awesome и удалить antd/icons

// хорошо бы иконки рендерить на сервере, чтобы на клиент не передавать либу с иконками
// хотя может и пофиг если они потом подтянутся, на сервере же соберется первичный html

// fuse.js для поиска (но скорее всего такой глобальный поиск нужно на бэке, так как мы же не все на фронт подгрузим)
const Filter = () => {
  const t = useTranslation();
  const searchParams = useSearchParams();
  const setSearchParams = useChangeSearchParams();

  const onFilter = (_changedFields: FieldData[], allFields: FieldData[]) => {
    console.log(allFields);
    setSearchParams(
      allFields.reduce((acc, field) => {
        if (!field.value) return acc;

        // как то по другому класть дату
        // потому что отображается дополнительно день недели и т.д.
        return { ...acc, [field.name[0]]: field.value };
      }, {}),
    );
  };

  // смысла наверное нет в стейте хранить, если форма не контролируемая (по архитектуре анта)
  // https://github.com/ant-design/ant-design/issues/23898
  const filterValues: FilterValues = {
    [FilterNames.search]: searchParams.get(FilterNames.search),
    [FilterNames.startDate]: searchParams.get(FilterNames.startDate)
      ? dayjs(searchParams.get(FilterNames.startDate))
      : null,
    [FilterNames.endDate]: searchParams.get(FilterNames.endDate)
      ? dayjs(searchParams.get(FilterNames.endDate))
      : null,
    [FilterNames.city]: searchParams.get(FilterNames.city),
    [FilterNames.country]: searchParams.get(FilterNames.country),
    [FilterNames.language]: searchParams.get(FilterNames.language)
      ? searchParams.getAll(FilterNames.language)
      : [],
  };

  // label надо в переводы
  return (
    <Form layout="vertical" onFieldsChange={onFilter} initialValues={filterValues} style={{}}>
      <Flex
        gap="middle"
        style={{
          marginBottom: 12,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: 50,
          padding: '20px 50px',
        }}
      >
        <Form.Item name={FilterNames.search} label="Search">
          <Input.Search
            type="search"
            onSearch={() => {}}
            placeholder={t((d) => d.search)}
            style={{ width: 200 }}
            autoComplete="off"
          />
        </Form.Item>
        <div style={{ borderRight: '1px solid #ccc' }} />
        <Form.Item name={FilterNames.startDate} label="Start Date">
          {/*
            приходится так делать, потому что antd не форматирует значение по locale
            https://github.com/ant-design/ant-design/issues/23902
           */}
          <DatePicker format={filterValues[FilterNames.startDate]?.format('L')} />
        </Form.Item>
        <Form.Item name={FilterNames.endDate} label="End Date">
          {/*
            приходится так делать, потому что antd не форматирует значение по locale
            https://github.com/ant-design/ant-design/issues/23902
           */}
          <DatePicker format={filterValues[FilterNames.endDate]?.format('L')} />
        </Form.Item>
        <div style={{ borderRight: '1px solid #ccc' }} />
        <Form.Item name={FilterNames.country} label="Country">
          <AutoComplete style={{ width: 200 }} />
        </Form.Item>
        <Form.Item name={FilterNames.city} label="City">
          <AutoComplete style={{ width: 200 }} />
        </Form.Item>
        <div style={{ borderRight: '1px solid #ccc' }} />
        <Form.Item name={FilterNames.language} label="Language" style={{ width: 400 }}>
          <Select
            mode="multiple"
            optionFilterProp="label"
            options={LANGUAGES_OPTIONS}
            maxTagCount="responsive"
          />
        </Form.Item>
      </Flex>
      <Flex gap={32} style={{ marginLeft: 50 }}>
        <div style={tagStyle}>
          <FontAwesomeIcon icon={faVolleyballBall} style={iconStyle} />
          <Text>Sports</Text>
        </div>
        <div style={tagStyle}>
          <FontAwesomeIcon icon={faDice} style={iconStyle} />
          <Text>Board Games</Text>
        </div>
        <div style={tagStyle}>
          <FontAwesomeIcon icon={faChampagneGlasses} style={iconStyle} />
          <Text>Parties</Text>
        </div>
        <div style={tagStyle}>
          <FontAwesomeIcon icon={faMasksTheater} style={iconStyle} />
          <Text>Theater</Text>
        </div>
        <div style={tagStyle}>
          <FontAwesomeIcon icon={faVideo} style={iconStyle} />
          <Text>Movies</Text>
        </div>
        <div style={tagStyle}>
          <FontAwesomeIcon icon={faRibbon} style={iconStyle} />
          <Text>Social Issues</Text>
        </div>
        <div style={tagStyle}>
          <FontAwesomeIcon icon={faVolleyballBall} style={iconStyle} />
          <Text>Sport</Text>
        </div>
        <div style={tagStyle}>
          <FontAwesomeIcon icon={faVolleyballBall} style={iconStyle} />
          <Text>Sport</Text>
        </div>
        <div style={tagStyle}>
          <FontAwesomeIcon icon={faVolleyballBall} style={iconStyle} />
          <Text>Sport</Text>
        </div>
        <div style={tagStyle}>
          <FontAwesomeIcon icon={faVolleyballBall} style={iconStyle} />
          <Text>Sport</Text>
        </div>
        <Button icon={<FontAwesomeIcon icon={faSliders} />}>Filters</Button>
      </Flex>
    </Form>
  );
};

export default Filter;
