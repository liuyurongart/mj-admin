import { ProConfigProvider } from '@ant-design/pro-components';
import { Outlet } from '@umijs/max';

export default function Layout() {
  return (
    <ProConfigProvider valueTypeMap={{}}>
      <Outlet />
    </ProConfigProvider>
  );
}
