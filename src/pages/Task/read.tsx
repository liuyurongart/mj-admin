import { TASK_STATUS } from '@/constants/task';
import { ProDescriptions, ProDescriptionsProps } from '@ant-design/pro-components';
import { Card, Modal, Tag } from 'antd';

interface PropsType {
  record: any;
  onOpenChange?: (open?: boolean) => void;
}

export default function (props: PropsType) {
  const { record, onOpenChange } = props;

  const basicColumns: ProDescriptionsProps['columns'] = [
    { title: 'ID', dataIndex: 'taskId', copyable: true },
    { title: '用户ID', dataIndex: ['user', 'userId'], copyable: true },
    { title: '用户', dataIndex: ['user', 'name'] },
    { title: '类型', dataIndex: ['taskType', 'name'] },
    {
      title: '状态',
      dataIndex: 'status',
      render(dom, entity, index, action, schema) {
        const { text, status } = TASK_STATUS[entity.status as keyof typeof TASK_STATUS] || {};
        return <Tag color={status?.toLowerCase()}>{text}</Tag>;
      },
    },
    { title: '进度', dataIndex: 'progress', valueType: 'progress' },
    { title: '提示词', dataIndex: 'prompt' },
    { title: '提示词-英文', dataIndex: 'promptEn' },
    { title: '描述', dataIndex: 'description' },
    { title: '提交时间', dataIndex: 'submitTime', valueType: 'dateTime' },
    { title: '开始执行时间', dataIndex: 'startTime', valueType: 'dateTime' },
    { title: '结束时间', dataIndex: 'finishTime', valueType: 'dateTime' },
    { title: '失败原因', dataIndex: 'failReason' },
    { title: '自定义参数', dataIndex: 'state' },
    { title: '图片', dataIndex: 'imageUrl' },
  ];

  const extraColumns: ProDescriptionsProps['columns'] = [
    { title: 'bot类型', dataIndex: 'botType' },
    { title: 'Nonce', dataIndex: 'nonce' },
    { title: '频道ID', dataIndex: 'discordChannelId' },
    { title: '实例ID', dataIndex: 'discordInstanceId' },
    { title: 'Hash', dataIndex: 'hash' },
    { title: '消息内容', dataIndex: 'message' },
    { title: '最终提示词', dataIndex: 'finalPrompt' },
    { title: '最终提示词-中文', dataIndex: 'finalPromptCn' },
    { title: '动作ID', dataIndex: 'actionId' },
    { title: 'Modal确认', dataIndex: 'modalConfirm' },
    { title: '图片seed', dataIndex: 'imageSeed' },
    { title: '通知地址', dataIndex: 'notifyHook' },
  ];

  const handleClose = () => {
    onOpenChange?.(false);
  };

  return (
    <Modal width={1100} open onCancel={handleClose} footer={false} title="任务信息">
      <Card type="inner" size="small" title="基本信息" className="mb-4">
        <ProDescriptions column={2} columns={basicColumns} dataSource={record} />
      </Card>
      <Card type="inner" size="small" title="扩展信息">
        <ProDescriptions column={2} columns={extraColumns} dataSource={record?.properties} />
      </Card>
    </Modal>
  );
}
