import { computed, ref } from 'vue'
import { activityLogs, issues as initialIssues, projects as initialProjects, tasks as initialTasks } from './demoData'

export function useInspectionStore() {
  const projects = ref(structuredClone(initialProjects))
  const tasks = ref(structuredClone(initialTasks))
  const issues = ref(structuredClone(initialIssues))
  const logs = ref(structuredClone(activityLogs))
  const reportStatus = ref('待负责人审核')
  const selectedTaskId = ref('TASK-20260812-001')
  const selectedProjectId = ref('PRJ-HDN-001')

  const selectedTask = computed(() => tasks.value.find(item => item.id === selectedTaskId.value) || tasks.value[0])
  const selectedProject = computed(() => projects.value.find(item => item.id === selectedProjectId.value) || projects.value[0])
  const pendingIssues = computed(() => issues.value.filter(item => item.status === '待审核'))
  const confirmedIssues = computed(() => issues.value.filter(item => ['已确认', '人工新增'].includes(item.status)))

  function log(role, text) {
    logs.value.unshift({ time: '2026-08-14 10:20', role, text })
  }

  function selectTask(task) { selectedTaskId.value = task.id }
  function selectProject(project) { selectedProjectId.value = project.id }
  function startTask(task) { task.status = '执行中'; log('无人机飞手', `开始执行任务 ${task.id}`) }
  function pauseTask(task) { task.status = '已暂停'; log('无人机飞手', `暂停任务 ${task.id}`) }
  function completeTask(task) { task.status = '资料待校验'; log('无人机飞手', `完成外业采集，任务 ${task.id} 进入资料校验`) }
  function uploadTaskFiles(task) {
    task.files = { photo: 24, video: 2, flight: 1, total: 27 }
    task.status = '资料待校验'
    log('无人机飞手', `上传${task.files.photo}张照片、${task.files.video}段视频和1条飞行记录`)
  }
  function submitTask(task) { task.status = '待AI分析'; log('无人机飞手', `提交任务 ${task.id}，资料完整性校验通过`) }
  function runAiAnalysis(task) { task.status = '待问题审核'; log('系统', `AI模拟分析完成，${task.id}生成4个候选问题`) }
  function reviewIssue(issue, status, opinion) {
    issue.status = status
    issue.opinion = opinion
    log('检查人员', `将${issue.id}审核为“${status}”`)
    if (!pendingIssues.value.length) selectedTask.value.status = '待负责人审核'
  }
  function createManualIssue() {
    issues.value.unshift({ id: `ISS-00${issues.value.length + 1}`, taskId: selectedTaskId.value, location: 'A-03 / 组件排4 / P-052', type: '人工新增问题', time: '2026-08-14 10:20', confidence: '—', status: '人工新增', color: 'purple', opinion: '检查人员现场补充，纳入报告初稿。' })
    log('检查人员', '人工新增问题并纳入报告初稿')
  }
  function reviewReport(status) { reportStatus.value = status; log('项目负责人', status === '已审核' ? '报告审核通过' : '报告退回修改') }
  function deliverReport() { reportStatus.value = '已交付'; log('项目负责人', '报告已导出PDF并记录客户交付') }
  function createProject(payload) {
    const project = { id: `PRJ-DEMO-${String(projects.value.length + 1).padStart(3, '0')}`, ...payload, status: '规划中', progress: 0, regions: 0, manager: '李晨' }
    projects.value.unshift(project)
    selectedProjectId.value = project.id
    log('项目负责人', `创建项目“${project.name}”并进入规划阶段`)
  }

  return { projects, tasks, issues, logs, reportStatus, selectedTaskId, selectedProjectId, selectedTask, selectedProject, pendingIssues, confirmedIssues, selectTask, selectProject, startTask, pauseTask, completeTask, uploadTaskFiles, submitTask, runAiAnalysis, reviewIssue, createManualIssue, reviewReport, deliverReport, createProject }
}
