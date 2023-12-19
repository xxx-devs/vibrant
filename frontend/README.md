This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Feature Sliced Design

### Layers
[Link](https://feature-sliced.design/ru/docs/reference/layers)

#### Shared
Изолированные модули, компоненты и абстракции, отдельные от специфики проекта или бизнеса. Внимание: не следует использовать этот слой как свалку утилит!

Этот слой, в отличие от других, состоит не из слайсов, а непосредственно из сегментов.

Примеры содержимого:
UI-библиотека
API-клиент
Код, работающий с API браузера

#### Entities
Понятия из реального мира, которые вместе образуют суть проекта. Как правило, это термины, которые бизнес использует для описания продукта.

Каждый слайс этого слоя содержит статические элементы пользовательского интерфейса, хранилища данных и операции CRUD (создание-чтение-изменение-удаление).

#### Features
**Действия, которые пользователь может совершать в приложении для взаимодействия с бизнес-сущностями**, чтоб достичь ценного для себя результата. Сюда также входят действия, которые приложение выполняет от имени пользователя, чтобы создать для него ценность.

Слайс на этом слое может содержать интерактивные элементы пользовательского интерфейса, внутреннее состояние и запросы к API, которые позволяют выполнять действия, создающие ценность.

#### Widgets
Самодостаточные блоки пользовательского интерфейса возникли из композиции единиц более низкого уровня, таких как сущности и функции.

Этот слой предоставляет возможность заполнить слоты, оставленные в интерфейсе сущностей, другими сущностями и интерактивными элементами из фич. Поэтому обычно на этом слое не размещается бизнес-логика, вместо этого она хранится в фичах. Каждый слайс на этом слое содержит готовые к использованию компоненты пользовательского интерфейса и иногда не-бизнес-логику, например, жесты, взаимодействие с клавиатурой и т.д.

Иногда удобнее разместить бизнес-логику на этом слое. Зачастую, это происходит тогда, когда виджет имеет довольно много интерактивности (например, интерактивные таблицы) и бизнес-логика в нём не переиспользуется.


#### Pages
Полноценные страницы для страничных приложений (например, веб-сайтов) или экраны/активности для экранных приложений (например, мобильных приложений).

По своей композиционной природе этот слой похож на Widgets, хоть и в большем масштабе. Каждый слайс на этом слое содержит компоненты пользовательского интерфейса, готовые к подключению к роутеру, а также может содержать логику получения данных и обработки ошибок.

#### App (Lib в нашем проекте)
Всё, что касается всего приложения, как в техническом смысле (например, провайдеры контекста), так и в бизнес-смысле (например, аналитика).

Этот слой обычно не содержит слайсов, как и Shared, вместо этого он содержит непосредственно сегменты.

Примеры содержимого:
* Стили
* Роутер
* Хранилища данных и прочие провайдеры контекста
* Инициализация аналитики

### Slices and Segments
[Link](https://feature-sliced.design/ru/docs/reference/slices-segments)

Слои Shared и App не содержат слайсов. Это связано с тем, что Shared не должен содержать никакой бизнес-логики, следовательно, не имеет значения для продукта, а App должен содержать только код, относящийся ко всему приложению, поэтому в разбиении нет необходимости.
