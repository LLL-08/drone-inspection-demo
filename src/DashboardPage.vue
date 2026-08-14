<script setup>
import { computed } from 'vue'
import { ArrowUpRight, ClipboardList, FileText, FolderKanban, MapPin, Plane, ScanSearch } from 'lucide-vue-next'
import StatusBadge from './StatusBadge.vue'
const props = defineProps({ role: Object, projects: Array, tasks: Array, pendingIssues: Array, confirmedIssues: Array, reportStatus: String })
const emit = defineEmits(['navigate'])
const kpis = computed(() => [
  ['巡检项目', props.projects.length, '当前工作空间项目', 'blue', FolderKanban],
  ['待我处理', props.role.key === 'inspector' ? props.pendingIssues.length : props.tasks.filter(task => ['待执行', '待负责人审核'].includes(task.status)).length, '任务与审核待办', 'purple', ClipboardList],
  ['已确认问题', props.confirmedIssues.length, '进入报告统计', 'orange', ScanSearch],
  ['报告状态', props.reportStatus === '已交付' ? '已交付' : '1', props.reportStatus, 'green', FileText],
])
</script>

<template>
  <section class="page"><div class="page-title"><div><p class="eyebrow">TUESDAY, AUGUST 14, 2026</p><h1>你好，{{ role.label }} 👋</h1><p class="muted">围绕项目、任务、影像、问题和报告，查看当前交付闭环。</p></div></div>
    <div class="kpi-grid"><div v-for="item in kpis" :key="item[0]" class="kpi card"><div class="kpi-top"><span>{{ item[0] }}</span><div :class="['kpi-icon', item[3]]"><component :is="item[4]" :size="19"/></div></div><strong>{{ item[1] }}</strong><span :class="['kpi-foot', item[3]]">{{ item[2] }} <ArrowUpRight :size="13"/></span></div></div>
    <div class="dashboard-grid"><div class="card chart-card"><div class="card-title"><div><h3>巡检任务趋势</h3><span>近12个月任务完成情况</span></div></div><div class="chart"><div class="y-labels"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><div class="chart-main"><div class="grid-lines"><i v-for="i in 5" :key="i"></i></div><div class="bars"><div v-for="(bar, index) in [46,62,52,78,69,88,72,94,80,96,84,100]" :key="index" class="bar-wrap"><div class="bar" :style="{ height: `${bar}%` }"></div><span>{{ ['9月','10月','11月','12月','1月','2月','3月','4月','5月','6月','7月','8月'][index] }}</span></div></div></div></div></div>
      <div class="card today-card"><div class="card-title"><div><h3>当前任务与待办</h3><span>状态由主案例联动</span></div><button class="text-btn" @click="emit('navigate', 'tasks')">查看全部 →</button></div><div v-for="task in tasks" :key="task.id" class="task-mini"><div class="task-time"><b>{{ task.date.split(' ')[1] }}</b><span>{{ task.status }}</span></div><div class="task-info"><b>{{ task.area }}</b><span>{{ task.pilot }} · {{ task.drone }}</span></div><StatusBadge :status="task.status"/></div></div></div>
    <div class="card recent-card"><div class="card-title"><div><h3>最近巡检项目</h3><span>项目、区域和任务统一关联</span></div><button class="text-btn" @click="emit('navigate', 'projects')">全部项目 →</button></div><div v-for="project in projects" :key="project.id" class="project-row"><div class="project-symbol"><Plane :size="17"/></div><div class="project-name"><b>{{ project.name }}</b><span>{{ project.client }}</span></div><div class="project-area"><MapPin :size="14"/> {{ project.area }}</div><div class="project-progress"><div><span>完成度</span><b>{{ project.progress }}%</b></div><div class="progress"><i :style="{ width: `${project.progress}%` }"></i></div></div><StatusBadge :status="project.status"/></div></div>
  </section>
</template>
