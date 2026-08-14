<script setup>
import { MapPin } from 'lucide-vue-next'
import StatusBadge from './StatusBadge.vue'
defineProps({ projects: Array })
const emit = defineEmits(['open'])
</script>

<template><section class="page"><div class="page-title"><div><p class="eyebrow">OPERATIONS / PROJECTS</p><h1>项目管理</h1><p class="muted">项目负责人维护客户、区域、巡检计划和交付标准。</p></div></div><div class="card table-card"><table><thead><tr><th>项目名称</th><th>客户</th><th>区域与计划</th><th>周期</th><th>负责人</th><th>状态</th><th>完成度</th><th></th></tr></thead><tbody><tr v-for="project in projects" :key="project.id"><td><b>{{ project.name }}</b><small>{{ project.id }}</small></td><td>{{ project.client }}</td><td><MapPin :size="13"/> {{ project.area }}<small>{{ project.plan }}</small></td><td>{{ project.cycle }}</td><td>{{ project.manager }}</td><td><StatusBadge :status="project.status"/></td><td>{{ project.progress }}%</td><td><button class="link-btn" @click="emit('open', project)">查看详情</button></td></tr></tbody></table></div></section></template>
