import { Avatar, Dropdown, MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { LangProps } from '@/app/i18n/types';
import { useTranslation } from '@/app/i18n/useTranslation.server';

async function Profile({ params }: LangProps) {
  const t = await useTranslation(params.lang);

  const items: MenuProps['items'] = [
    {
      key: 'create-event',
      label: t((d) => d['create-event']),
    },
    {
      key: 'account',
      label: t((d) => d.account),
    },
    {
      key: 'logout',
      label: t((d) => d.logout),
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <Avatar shape="square" size="large" icon={<UserOutlined />} />
    </Dropdown>
  );
}
export default Profile;
