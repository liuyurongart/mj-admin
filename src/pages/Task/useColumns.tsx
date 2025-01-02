import { getTaskTypeList } from '@/api/task';
import { OpenTrigger } from '@/components/openTrigger';
import { TASK_STATUS } from '@/constants/task';
import { ProColumns } from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { Tag } from 'antd';
import Read from './read';

interface UseColumnsProps {}

export function useColumns(props: UseColumnsProps) {
  const {} = props;

  const access = useAccess();

  const columns: ProColumns[] = [
    {
      title: 'ID',
      fixed: 'left',
      dataIndex: 'taskId',
      render(dom, entity, index, action, schema) {
        return (
          <OpenTrigger trigger={<a>{dom}</a>}>
            <Read record={entity} />
          </OpenTrigger>
        );
      },
    },
    {
      title: '用户ID',
      dataIndex: ['user', 'userId'],
      formItemProps: { name: 'userId' },
    },
    {
      title: '用户',
      search: false,
      dataIndex: ['user', 'name'],
    },
    {
      title: '类型',
      dataIndex: ['taskType', 'name'],
      fieldProps: { fieldNames: { label: 'name', value: 'id' } },
      request: async (params) => (await getTaskTypeList())?.result,
    },
    {
      search: false,
      title: '提交时间',
      valueType: 'dateTime',
      dataIndex: 'submitTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: TASK_STATUS,
      render(dom, entity, index, action, schema) {
        const { text, status } = TASK_STATUS[entity.status as keyof typeof TASK_STATUS] || {};
        return <Tag color={status?.toLowerCase()}>{text}</Tag>;
      },
    },
    {
      title: '进度',
      search: false,
      valueType: 'progress',
      dataIndex: 'progress',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '失败原因',
      dataIndex: 'failReason',
    },
  ];

  return columns;
}
