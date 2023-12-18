import LocaleSwitcher from '@/app/[lang]/components/LocaleSwitcher';
import Profile from '@/app/[lang]/components/Profile';
import { LangProps } from '@/app/i18n/types';
import { Button, Flex } from 'antd';
import { Title } from '@/app/lib/antd/Typography';
import { useTranslation } from '@/app/i18n/useTranslation.server';
import styles from '../page.module.css';

const Header = async ({ params }: LangProps) => {
  const t = await useTranslation(params.lang);

  return (
    <>
      <Title className={styles.title}>VIBRANT</Title>
      <Flex gap="middle" align="center">
        <Button ghost size="large" type="primary" rootClassName={styles['button-create']}>
          {t((d) => d['create-event'])}
        </Button>
        <LocaleSwitcher />
        <Profile params={params} />
      </Flex>
    </>
  );
};

export default Header;
