import { Link } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NotFound: React.FC = () => (
  <Result
    title="404"
    status="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Link to="/">
        <Button type="primary">Back Home</Button>
      </Link>
    }
  />
);

export default NotFound;
