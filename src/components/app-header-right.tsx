import { TOKEN } from '@/constants/token';
import { randomColor } from '@/utils';
import { CaretDownOutlined, LogoutOutlined } from '@ant-design/icons';
import { useModel, useNavigate } from '@umijs/max';
import { App, Avatar, Button, Dropdown, MenuProps, Space, Typography } from 'antd';
import { FC, useMemo } from 'react';

const AvatarDropdown: FC = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { initialState } = useModel('@@initialState');

  const { name } = initialState?.userInfo ?? {};

  const logoutHandler = async () => {
    TOKEN.remove();
    await message.success('操作成功');
    navigate('/login', { replace: true });
  };

  const menuClickHandler: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      logoutHandler();
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
    },
  ];

  const avatarColor = useMemo(() => randomColor(), []);

  return (
    <Dropdown menu={{ items, onClick: menuClickHandler }} trigger={['click']}>
      <Button type="text">
        <Space>
          <Avatar size="small" alt="avatar" style={{ background: avatarColor }}>
            {name?.substring(0, 1)}
          </Avatar>
          <div className="max-w-200px">
            <Typography.Text ellipsis>{name}</Typography.Text>
          </div>
          <CaretDownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

const AppHeaderRight: FC = () => {
  return (
    <Space size="middle">
      <AvatarDropdown />
    </Space>
  );
};

export { AppHeaderRight };
