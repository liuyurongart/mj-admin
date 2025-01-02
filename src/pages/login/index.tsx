import { TOKEN } from '@/constants/token';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import { useModel, useNavigate, useRequest } from '@umijs/max';
import { App, Button, Form } from 'antd';
import { flushSync } from 'react-dom';

const mockData = {
  name: 'admin',
  password: '123456',
};

export default function Login() {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { initialState, setInitialState } = useModel('@@initialState');

  const { loading, run: handleFinish } = useRequest(
    async ({ name, password }) => {
      if (name === mockData.name && password === mockData.password) {
        TOKEN.set(name);
        await message.success('登录成功', 1);
        flushSync(() => {
          setInitialState({ ...initialState, userInfo: name });
        });
        navigate('/', { replace: true });
        return;
      } else {
        message.error('用户名或密码错误');
      }
    },
    { manual: true },
  );

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-tr from-indigo-500 to-indigo-200 p-4">
      <Form onFinish={handleFinish} className="w-full max-w-md bg-white/35 rounded-2xl shadow-xl p-8 md:p-12">
        <h1 className="text-center mb-6">
          <span>{process.env.APP_NAME}</span>
          <br />
          <small className="text-center font-normal text-sm">欢迎使用后台管理系统</small>
        </h1>
        <ProFormText
          name="name"
          rules={[{ required: true }]}
          placeholder={`用户名: ${mockData.name}`}
          fieldProps={{ size: 'large', prefix: <UserOutlined />, showCount: false }}
        />
        <ProFormText.Password
          name="password"
          rules={[{ required: true }]}
          placeholder={`密 码: ${mockData.password}`}
          fieldProps={{ size: 'large', prefix: <LockOutlined />, maxLength: 16, showCount: false }}
        />
        <Button type="primary" htmlType="submit" block size="large" className="mt-4" loading={loading}>
          登录
        </Button>
      </Form>
    </div>
  );
}
