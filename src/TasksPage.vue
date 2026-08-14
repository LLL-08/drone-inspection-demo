<script setup>
import { ClipboardList, Clock3 } from 'lucide-vue-next'
import StatusBadge from './StatusBadge.vue'
defineProps({ tasks: Array })
const emit = defineEmits(['open'])
</script>

<template><section class="page"><div class="page-title"><div><p class="eyebrow">OPERATIONS / TASKS</p><h1>任务调度</h1><p class="muted">调度人员根据项目计划分配飞手和无人机设备。</p></div></div><div class="task-banner"><div class="banner-icon"><ClipboardList :size="23"/></div><div><b>主案例任务执行情况</b><span>已完成 {{ tasks.filter(t => t.status === '已完成').length }} 个 · 待处理 {{ tasks.filter(t => t.status !== '已完成').length }} 个</span></div><button class="ghost-light" @click="emit('open', tasks[0])">打开任务包 →</button></div><div class="card table-card"><table><thead><tr><th>任务编号</th><th>项目 / 区域</th><th>执行日期</th><th>飞手</th><th>设备</th><th>状态</th><th>资料</th><th></th></tr></thead><tbody><tr v-for="task in tasks" :key="task.id"><td><b class="mono">{{ task.id }}</b></td><td>{{ task.project }}<small>{{ task.area }} · {{ task.regionCode }}</small></td><td><Clock3 :size="13"/> {{ task.date }}</td><td>{{ task.pilot }}</td><td>{{ task.drone }}</td><td><StatusBadge :status="task.status"/></td><td>{{ task.files.photo + task.files.video + task.files.flight }} / {{ task.files.total }}</td><td><button class="link-btn" @click="emit('open', task)">查看任务</button></td></tr></tbody></table></div></section></template>
