import { request } from '@umijs/max';

// 分页查询任务列表/taskDetail/page
export async function getTaskListByPage(params = {}) {
  return request('/taskDetail/page', {
    method: 'POST',
    data: params,
  });
}

// 查询任务类型列表/taskType/page
export async function getTaskTypeList(params = {}) {
  return request('/taskType/page', {
    method: 'POST',
    data: {
      pageSize: 500,
      ...params,
    },
  });
}
