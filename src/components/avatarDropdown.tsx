import { TOKEN } from '@/constants/token';
import { LogoutOutlined } from '@ant-design/icons';
import { useModel, useNavigate } from '@umijs/max';
import { App, Button, Dropdown, Image, MenuProps, Space, Typography } from 'antd';

export const AvatarDropdown: React.FC = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { initialState } = useModel('@@initialState');

  const name = initialState?.userInfo;

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

  return (
    <Dropdown menu={{ items, onClick: menuClickHandler }} trigger={['click']}>
      <Button type="text">
        <Space>
          <Image src="http://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" width={26} />
          <div className="max-w-200px">
            <Typography.Text ellipsis>{name}</Typography.Text>
          </div>
        </Space>
      </Button>
    </Dropdown>
  );
};
