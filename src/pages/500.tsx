import { Link } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const Error: React.FC = () => (
  <Result
    title="500"
    status="500"
    subTitle="Sorry, something went wrong."
    extra={
      <Link to="/">
        <Button type="primary">Back Home</Button>
      </Link>
    }
  />
);

export default Error;
