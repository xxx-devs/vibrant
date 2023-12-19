import { LocaleSwitcher, ProfileMenu } from '@/app/features';
import { LangProps } from '@/app/shared/i18n/types';
import { Button, Flex } from 'antd';
import { Title } from '@/app/shared/ui/Typography';
import { useTranslation } from '@/app/shared/i18n/useTranslation.server';
import styles from './styles.module.css';

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
        <ProfileMenu params={params} />
      </Flex>
    </>
  );
};

export default Header;
