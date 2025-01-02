import { InitDataType } from '@umijs/max';
import { includes } from 'es-toolkit/compat';

// 在这里按照初始化数据定义项目中的权限，统一管理
// 参考文档 https://umijs.org/docs/max/access
export default (initialState: InitDataType['initialState']) => {
  const permissions = initialState?.userInfo?.permissions ?? [];

  const isInPermissions = (keys: string[]) => keys.some((key) => includes(permissions, key));

  if (isInPermissions(['read:user', 'read:role_permission'])) {
    permissions.push('read:system');
  }

  if (isInPermissions(['read:cooperate_channel', 'read:cooperate_lawer'])) {
    permissions.push('read:resource');
  }
  permissions.push('dev');
  const keys = [
    'dev',
    /** >>>>>>>>>>>>> 首页 <<<<<<<<<<<<<< */
    // 案件简报
    'summary:case_count',

    /** >>>>>>>>>>>>> 角色管理 <<<<<<<<<<<<<< */
    // 查看角色权限列表
    'read:role_permission',

    // 系统管理
    'read:system',
    /** >>>>>>>>>>>>> 用户管理 <<<<<<<<<<<<<< */
    // 查看用户列表
    'read:user',
    // 创建用户
    'create:user',
    // 编辑用户
    'update:user',
    // 开启/关闭用户状态
    'change:user_status',
    // 删除用户
    'delete:user',

    /** >>>>>>>>>>>>> 客户管理 <<<<<<<<<<<<<< */
    // 查看客户列表
    'read:customer',
    // 创建客户
    'create:customer',
    // 编辑客户
    'update:customer',
    // 开启/关闭客户状态
    'change:customer_status',
    // 查看客户联系人列表
    'read:customer_contact',
    // 创建客户联系人
    'create:customer_contact',
    // 编辑客户联系人
    'update:customer_contact',
    // 查看客户项目列表
    'read:customer_project',
    // 查看客户合同列表
    'read:customer_contract',
    // 创建客户合同
    'create:customer_contract',
    // 编辑客户合同
    'update:customer_contract',
    // 下载客户合同
    'download:customer_contract',

    // 合作资源管理
    'read:resource',
    /** >>>>>>>>>>>>> 渠道管理 <<<<<<<<<<<<<< */
    // 查看合作渠道列表
    'read:cooperate_channel',
    // 创建合作渠道
    'create:cooperate_channel',
    // 编辑合作渠道
    'update:cooperate_channel',
    // 开启/关闭合作渠道状态
    'change:cooperate_channel_status',
    // 查看合作渠道联系人列表
    'read:cooperate_channel_contact',
    // 创建合作渠道联系人
    'create:cooperate_channel_contact',
    // 编辑合作渠道联系人
    'update:cooperate_channel_contact',
    // 查看合作渠道项目列表
    'read:cooperate_channel_project',
    // 查看合作渠道合同列表
    'read:cooperate_channel_contract',
    // 创建合作渠道合同
    'create:cooperate_channel_contract',
    // 编辑合作渠道合同
    'update:cooperate_channel_contract',
    // 下载合作渠道合同
    'download:cooperate_channel_contract',

    /** >>>>>>>>>>>>> 律师管理 <<<<<<<<<<<<<< */
    // 查看合作律师列表
    'read:cooperate_lawer',
    // 创建合作律师
    'create:cooperate_lawer',
    // 编辑合作律师
    'update:cooperate_lawer',
    // 开启/关闭合作律师状态
    'change:cooperate_lawer_status',
    // 查看合作律师项目列表
    'read:cooperate_lawer_project',
    // 查看合作律师合同列表
    'read:cooperate_lawer_contract',
    // 创建合作律师合同
    'create:cooperate_lawer_contract',
    // 编辑合作律师合同
    'update:cooperate_lawer_contract',
    // 下载合作律师合同
    'download:cooperate_lawer_contract',

    /** >>>>>>>>>>>>> 项目管理 <<<<<<<<<<<<<< */
    'read:dashboard',
    // 查看项目列表
    'read:project',
    // 创建项目
    'create:project',
    // 编辑项目
    'update:project',
    // 生成案件模板
    'generate:project_case_template',
    // 导出项目案件报表
    'export:project_case_report',

    /** >>>>>>>>>>>>> 案件管理 <<<<<<<<<<<<<< */
    // 查看案件列表
    'read:case',
    // 创建案件
    'create:case',
    // 批量导入案件
    'import:case',
    // 确认案件信息
    'confirm:case_info',
    // 编辑案件信息
    'update:case_info',
    // 添加证据材料
    'add:evidence_info',
    // 删除证据材料
    'delete:evidence_info',
    // 添加案件二级进度
    'add:case_two_level_progress',
    // 案件-分案
    'assign:case',
    // 案件-渠道委案
    'commission:case_channel',
    // 案件-收案处置
    'processing:case_channel',
    // 案件-导出
    'export:case',
    // 案件-结案
    'finish:case',
    // 创建案件回款
    'create:case_collection',
    // 编辑案件回款
    'update:case_collection',
    // 案件-匹配渠道/律师
    'match:case_channel',
    // 上传司法文书
    'add:case_judicial_doc',
    // 删除司法文书
    'delete:case_judicial_doc',
    // 创建费用管理
    'create:case_fee',
    // 编辑费用管理
    'update:case_fee',
    // 案件-渠道退案
    'withdraw:case_channel',
    // 案件-撤诉
    'withdraw:case_prosecution',
    // 案件-撤回执行
    'withdraw:case_execution',
    // 添加案件进度主节点
    'add:case_progress_node_one',
  ] as const;
  return keys.reduce((obj, key) => ({ ...obj, [key]: includes(permissions, key) }), {}) as Record<
    (typeof keys)[number],
    boolean
  >;
};
