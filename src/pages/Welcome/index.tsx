import { PageContainer } from '@ant-design/pro-components';
import { Image } from 'antd';
import React from 'react';

const Welcome: React.FC = () => {
  return (
    <PageContainer title={false}>
      <div className="grid place-items-center">
        <h1 className="my-10 text-blue-500">👋 欢迎回来，admin</h1>
        <Image src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" height={500} />
      </div>
    </PageContainer>
  );
};

export default Welcome;
