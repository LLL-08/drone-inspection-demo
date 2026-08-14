<script setup>
import { computed, ref } from 'vue'
import { LayoutDashboard, FolderKanban, ClipboardList, Plane, BrainCircuit, ScanSearch, GitCompareArrows, FileText, Archive, Settings, Bell, LogOut } from 'lucide-vue-next'
import { roles, navigation, pilots, drones } from './demoData'
import { useInspectionStore } from './inspectionStore'
import RoleSwitcher from './RoleSwitcher.vue'
import DashboardPage from './DashboardPage.vue'
import ProjectsPage from './ProjectsPage.vue'
import TasksPage from './TasksPage.vue'
import FleetPage from './FleetPage.vue'
import AiAnalysisPage from './AiAnalysisPage.vue'
import IssueReviewPage from './IssueReviewPage.vue'
import HistoryPage from './HistoryPage.vue'
import ReportsPage from './ReportsPage.vue'
import ArchivePage from './ArchivePage.vue'
import SystemPage from './SystemPage.vue'
import ProjectDetailDrawer from './ProjectDetailDrawer.vue'
import TaskDetailDrawer from './TaskDetailDrawer.vue'
import NewProjectModal from './NewProjectModal.vue'

const store = useInspectionStore()
const loggedIn = ref(true)
const active = ref('dashboard')
const roleKey = ref('manager')
const roleMenuOpen = ref(false)
const projectDrawer = ref(false)
const taskDrawer = ref(false)
const newProjectOpen = ref(false)
const toast = ref('')
const username = ref('admin@inspection.cn')
const password = ref('123456')
const rememberAccount = ref(true)
const currentRole = computed(() => ({ ...roles[roleKey.value], key: roleKey.value }))
const visibleNavigation = computed(() => navigation.filter(item => item.roles.includes(roleKey.value)))
const navIcons = { dashboard: LayoutDashboard, projects: FolderKanban, tasks: ClipboardList, fleet: Plane, ai: BrainCircuit, issues: ScanSearch, history: GitCompareArrows, reports: FileText, archive: Archive, system: Settings }

function notify(message) { toast.value = message; window.clearTimeout(notify.timer); notify.timer = window.setTimeout(() => { toast.value = '' }, 2600) }
function go(key) { active.value = key; roleMenuOpen.value = false }
function changeRole(key) { roleKey.value = key; active.value = 'dashboard'; roleMenuOpen.value = false; notify('已切换为' + roles[key].label + '，菜单已按权限更新') }
function openProject(project) { store.selectProject(project); projectDrawer.value = true }
function openTask(task) { store.selectTask(task); taskDrawer.value = true; projectDrawer.value = false }
function withNotice(action, message) { action(); notify(message) }
function handleCreateProject(payload) { store.createProject(payload); newProjectOpen.value = false; go('projects'); notify('项目已创建，进入规划阶段') }
function login() { if (!username.value.trim() || !password.value.trim()) return; loggedIn.value = true; notify('登录成功，欢迎进入巡检管理平台') }
</script>

<template>
  <div v-if="!loggedIn" class="account-login"><div class="login-brand-panel"><div class="brand login-brand"><div class="brand-mark">U</div><div><b>巡检智管</b><span>UAV INSPECTION PLATFORM</span></div></div><div class="login-hero-copy"><span class="eyebrow">INTELLIGENT INSPECTION</span><h1>让每一次巡检<br/><em>都有据可查</em></h1><p>项目管理、任务调度、影像分析与报告交付，在一个工作平台完成。</p></div><div class="login-footer">© 2026 巡检智管 · 企业级巡检管理平台</div></div><div class="login-form-panel"><form class="account-form" @submit.prevent="login"><span class="eyebrow">ACCOUNT LOGIN</span><h2>登录管理平台</h2><p>请输入您的企业账号和密码</p><label>企业账号<input v-model="username" type="email" autocomplete="username" placeholder="请输入企业邮箱"/></label><label>登录密码<input v-model="password" type="password" autocomplete="current-password" placeholder="请输入登录密码"/></label><div class="login-options"><label class="remember"><input v-model="rememberAccount" type="checkbox"/>记住账号</label><button type="button" class="forgot-button">忘记密码？</button></div><button class="btn-primary login-submit" type="submit">登录平台</button><div class="login-security">企业统一身份认证 · 账号安全保护</div></form></div></div>
  <div v-else class="app-shell">
    <aside class="sidebar"><div class="brand"><div class="brand-mark">U</div><div><b>巡检智管</b><span>UAV INSPECTION</span></div></div><div class="demo-label">工作台</div><nav><button v-for="item in visibleNavigation" :key="item.key" :class="{ active: active === item.key }" @click="go(item.key)"><component :is="navIcons[item.key]" :size="17"/><span>{{ item.label }}</span></button></nav><div class="sidebar-foot"><div class="mock-note">华东巡检服务中心<br/><span>企业工作空间</span></div><button class="logout-button" @click="loggedIn = false"><LogOut :size="15"/>退出登录</button></div></aside>
    <main class="main-area"><header class="topbar"><div class="breadcrumb">无人机智能巡检管理平台 <span>/</span> {{ visibleNavigation.find(item => item.key === active)?.label || '首页驾驶舱' }}</div><div class="topbar-actions"><span class="interface-note">Web管理后台 + 飞手移动端</span><button class="notice-button"><Bell :size="17"/><i></i></button><RoleSwitcher :roles="roles" :current-key="roleKey" :open="roleMenuOpen" @toggle="roleMenuOpen = !roleMenuOpen" @change="changeRole"/></div></header><div class="content-area"><DashboardPage v-if="active === 'dashboard'" :role="currentRole" :projects="store.projects.value" :tasks="store.tasks.value" :pending-issues="store.pendingIssues.value" :confirmed-issues="store.confirmedIssues.value" :report-status="store.reportStatus.value" @navigate="go"/><ProjectsPage v-else-if="active === 'projects'" :projects="store.projects.value" @open="openProject"/><TasksPage v-else-if="active === 'tasks'" :tasks="store.tasks.value" @open="openTask"/><FleetPage v-else-if="active === 'fleet'" :pilots="pilots" :drones="drones"/><AiAnalysisPage v-else-if="active === 'ai'" :selected-task="store.selectedTask.value" :issues="store.issues.value" @run-analysis="withNotice(() => store.runAiAnalysis(store.selectedTask.value), 'AI分析完成，已生成候选问题')" @navigate="go"/><IssueReviewPage v-else-if="active === 'issues'" :issues="store.issues.value" @review="(issue, status, opinion) => withNotice(() => store.reviewIssue(issue, status, opinion), '已将' + issue.id + '处理为' + status)" @create="notify('人工新增问题入口已保留')"/><HistoryPage v-else-if="active === 'history'" :selected-task="store.selectedTask.value" :confirmed-issues="store.confirmedIssues.value"/><ReportsPage v-else-if="active === 'reports'" :report-status="store.reportStatus.value" :confirmed-issues="store.confirmedIssues.value" :selected-task="store.selectedTask.value" @review="status => withNotice(() => store.reviewReport(status), '报告状态已更新为' + status)" @deliver="withNotice(store.deliverReport, 'PDF交付记录已生成')"/><ArchivePage v-else-if="active === 'archive'" :projects="store.projects.value" :tasks="store.tasks.value" :issues="store.issues.value" :report-status="store.reportStatus.value"/><SystemPage v-else-if="active === 'system'"/></div></main>
    <ProjectDetailDrawer v-if="projectDrawer" :project="store.selectedProject.value" :tasks="store.tasks.value.filter(task => task.projectId === store.selectedProject.value?.id)" :logs="store.logs.value" @close="projectDrawer = false" @open-task="openTask"/><TaskDetailDrawer v-if="taskDrawer" :task="store.selectedTask.value" :role="roleKey" :logs="store.logs.value" @close="taskDrawer = false" @start="withNotice(() => store.startTask(store.selectedTask.value), '任务已开始执行')" @pause="withNotice(() => store.pauseTask(store.selectedTask.value), '任务已暂停')" @complete="withNotice(() => store.completeTask(store.selectedTask.value), '外业采集完成，请上传资料')" @upload="withNotice(() => store.uploadTaskFiles(store.selectedTask.value), '资料上传完成，等待完整性校验')" @submit="withNotice(() => store.submitTask(store.selectedTask.value), '资料校验通过，任务进入AI分析')" @run-ai="go('ai')"/><NewProjectModal v-if="newProjectOpen" @close="newProjectOpen = false" @create="handleCreateProject"/><div v-if="toast" class="toast-message">{{ toast }}</div>
  </div>
</template>
