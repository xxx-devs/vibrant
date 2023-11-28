import LocaleSwitcher from '@/app/[lang]/components/LocaleSwitcher';
import { Header as AntdHeader } from '@/app/lib/antd/Layout';
import Profile from '@/app/[lang]/components/Profile';
import { LangProps } from '@/app/i18n/types';
import { Button, Flex } from 'antd';
import { Title } from '@/app/lib/antd/Typography';
import { useTranslation } from '@/app/i18n/useTranslation.server';
import styles from '../page.module.css';

// can't redeclare backgroundColor in CSS modules. TODO redeclare in antd theme
const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'transparent',
  // boxShadow: 'rgba(0,0,0,0.1) 0 2px 4px',
  boxShadow: 'rgba(0,0,0,0.08) 0 1px 1px',
};

const titleStyle: React.CSSProperties = {
  marginBottom: 0,
  letterSpacing: 8,

  backgroundColor: 'rgb(34,193,195)',
  backgroundImage: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',

  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const Header = async ({ params }: LangProps) => {
  const t = await useTranslation(params.lang);

  return (
    <AntdHeader style={headerStyle}>
      <Title style={titleStyle}>VIBRANT</Title>
      <Flex gap="middle" align="center">
        <Button ghost size="large" type="primary" rootClassName={styles['button-create']}>
          {t((d) => d['create-event'])}
        </Button>
        <LocaleSwitcher />
        <Profile params={params} />
      </Flex>
    </AntdHeader>
  );
};

export default Header;
