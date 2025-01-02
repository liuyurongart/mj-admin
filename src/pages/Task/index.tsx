import { getTaskListByPage } from '@/api/task';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import { useColumns } from './useColumns';

export default function UserList() {
  const actionRef = useRef<ActionType>(null);

  const columns = useColumns({});

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async ({ current, ...params }) => {
          const { success, result } = await getTaskListByPage({
            pageIndex: current,
            sorts: [{ sortname: 'submitTime', sortorder: 'DESC' }],
            ...params,
          });
          return { data: result?.list, success, total: result?.total };
        }}
      />
    </PageContainer>
  );
}
