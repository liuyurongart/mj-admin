// 任务状态
export const TASK_STATUS = {
  NOT_START: { text: '未启动', status: 'Default' },
  SUBMITTED: { text: '已提交', status: 'Default' },
  MODAL: { text: '窗口等待', status: 'Default' },
  IN_PROGRESS: { text: '执行中', status: 'Processing' },
  FAILURE: { text: '失败', status: 'Error' },
  SUCCESS: { text: '成功', status: 'Success' },
  CANCEL: { text: '已取消', status: 'Warning' },
};
