export const roles = {
  manager: { label: '项目负责人', short: '负', description: '项目统筹与报告审核' },
  dispatcher: { label: '调度人员', short: '调', description: '飞手与设备调度' },
  pilot: { label: '无人机飞手', short: '飞', description: '现场执行与资料上传' },
  inspector: { label: '检查人员', short: '检', description: '影像复核与问题审核' },
  admin: { label: '系统管理员', short: '管', description: '账号、权限与日志管理' },
}

export const navigation = [
  { key: 'dashboard', label: '首页驾驶舱', roles: Object.keys(roles) },
  { key: 'projects', label: '项目管理', roles: ['manager', 'dispatcher', 'inspector', 'admin'] },
  { key: 'tasks', label: '任务调度', roles: Object.keys(roles) },
  { key: 'fleet', label: '飞手与设备', roles: ['manager', 'dispatcher', 'admin'] },
  { key: 'ai', label: 'AI影像分析', roles: ['manager', 'inspector', 'admin'] },
  { key: 'issues', label: '问题审核', roles: ['manager', 'inspector', 'admin'] },
  { key: 'history', label: '历史影像对比', roles: ['manager', 'inspector', 'admin'] },
  { key: 'reports', label: '报告管理', roles: ['manager', 'inspector', 'admin'] },
  { key: 'archive', label: '资料归档', roles: ['manager', 'inspector', 'admin'] },
  { key: 'system', label: '系统管理', roles: ['admin'] },
]

export const projects = [
  { id: 'PRJ-HDN-001', name: '华东新能源科技园一期', client: '华东新能源科技有限公司', area: 'A区 / 组件区01-08', cycle: '月度巡检', status: '执行中', manager: '李晨', progress: 72, regions: 8, plan: '2026年8月月度巡检计划', standard: '光伏组件外观与热成像检查' },
  { id: 'PRJ-SZ-002', name: '苏州工业园区屋顶光伏', client: '苏州工业园区发展集团', area: '5号厂房 / 屋顶', cycle: '季度巡检', status: '待执行', manager: '王欣', progress: 18, regions: 3, plan: '2026年第三季度巡检计划', standard: '屋面组件与排水检查' },
  { id: 'PRJ-PD-003', name: '浦东国际机场配套建筑', client: '上海机场建设指挥部', area: 'T3航站楼 / 屋面', cycle: '专项巡检', status: '已完成', manager: '周然', progress: 100, regions: 2, plan: '机场屋面专项检查计划', standard: '建筑屋面裂缝与锈蚀检查' },
]

export const tasks = [
  { id: 'TASK-20260812-001', projectId: 'PRJ-HDN-001', project: '华东新能源科技园一期', area: 'A区 / 组件区03', regionCode: 'A-03', date: '2026-08-12 09:00', pilot: '张伟', drone: 'DJI Mavic 3E', status: '待AI分析', files: { photo: 24, video: 2, flight: 1, total: 27 }, note: '完成组件区03 RGB及热成像采集，关注遮挡、裂缝、积水和锈蚀。' },
  { id: 'TASK-20260812-002', projectId: 'PRJ-HDN-001', project: '华东新能源科技园一期', area: 'A区 / 组件区05-08', regionCode: 'A-05~08', date: '2026-08-12 13:30', pilot: '李浩', drone: 'DJI Mavic 3T', status: '待执行', files: { photo: 0, video: 0, flight: 0, total: 30 }, note: '按任务包完成组件区05-08巡检。' },
  { id: 'TASK-20260808-006', projectId: 'PRJ-PD-003', project: '浦东国际机场配套建筑', area: 'T3 / 西侧屋面', regionCode: 'T3-W', date: '2026-08-08 10:00', pilot: '赵磊', drone: 'DJI Matrice 30T', status: '已完成', files: { photo: 16, video: 2, flight: 1, total: 19 }, note: '专项检查已完成并归档。' },
]

export const issues = [
  { id: 'ISS-001', taskId: 'TASK-20260812-001', location: 'A-03 / 组件排3 / P-028', type: '光伏板遮挡', time: '2026-08-12 10:24', confidence: '92%', status: '待审核', color: 'orange', opinion: '' },
  { id: 'ISS-002', taskId: 'TASK-20260812-001', location: 'A-03 / 组件排3 / P-041', type: '裂缝', time: '2026-08-12 10:31', confidence: '88%', status: '待审核', color: 'red', opinion: '' },
  { id: 'ISS-003', taskId: 'TASK-20260812-001', location: 'A-03 / 组件排2 / P-017', type: '积水', time: '2026-08-12 10:46', confidence: '81%', status: '已确认', color: 'blue', opinion: '影像证据清晰，纳入本次报告。' },
  { id: 'ISS-004', taskId: 'TASK-20260812-001', location: 'A-03 / 组件排1 / P-006', type: '锈蚀', time: '2026-08-12 11:02', confidence: '76%', status: '误报', color: 'gray', opinion: '复核后判断为光照反射。' },
]

export const pilots = [
  { name: '张伟', level: '高级飞手', expiry: '2027-06-30', area: '华东区域', status: '执行中' },
  { name: '李浩', level: '中级飞手', expiry: '2027-02-28', area: '苏州园区', status: '空闲' },
  { name: '赵磊', level: '高级飞手', expiry: '2026-12-31', area: '浦东机场', status: '空闲' },
]

export const drones = [
  { model: 'DJI Mavic 3E', id: 'DJI-M3E-0068', status: '执行中', maintenance: '正常' },
  { model: 'DJI Mavic 3T', id: 'DJI-M3T-0021', status: '空闲', maintenance: '正常' },
  { model: 'DJI Matrice 30T', id: 'DJI-M30T-0008', status: '空闲', maintenance: '待维保' },
]

export const activityLogs = [
  { time: '2026-08-12 11:20', role: '检查人员', text: '完成影像归档校验，任务进入待AI分析' },
  { time: '2026-08-12 10:05', role: '无人机飞手', text: '上传24张照片、2段视频和1条飞行记录' },
  { time: '2026-08-12 09:00', role: '调度人员', text: '确认张伟 / DJI Mavic 3E执行任务' },
  { time: '2026-08-11 16:30', role: '项目负责人', text: '由月度巡检计划生成任务' },
]
