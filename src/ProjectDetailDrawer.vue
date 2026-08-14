<script setup>
import { X, ArrowRight } from 'lucide-vue-next'
import StatusBadge from './StatusBadge.vue'
defineProps({ project: Object, tasks: Array, logs: Array })
const emit = defineEmits(['close', 'open-task'])
</script>
<template><div class="drawer-backdrop" @click.self="emit('close')"><aside class="detail-drawer"><div class="drawer-head"><div><span class="eyebrow">PROJECT DETAIL</span><h2>{{ project?.name }}</h2><p>{{ project?.id }}</p></div><button class="close-button" @click="emit('close')"><X :size="18"/></button></div><div class="detail-content"><div class="detail-grid"><div><span>客户</span><b>{{ project?.client }}</b></div><div><span>项目负责人</span><b>{{ project?.manager }}</b></div><div><span>巡检周期</span><b>{{ project?.cycle }}</b></div><div><span>覆盖区域</span><b>{{ project?.regions }} 个</b></div></div><div class="detail-section"><h3>关联任务</h3><button v-for="task in tasks" :key="task.id" class="related-row" @click="emit('open-task', task)"><span><b>{{ task.id }}</b><small>{{ task.area }} · {{ task.pilot }}</small></span><StatusBadge :status="task.status"/><ArrowRight :size="14"/></button></div><div class="detail-section"><h3>项目动态</h3><div v-for="log in logs.slice(0, 4)" :key="log.time + log.text" class="timeline-row"><i></i><span><b>{{ log.text }}</b><small>{{ log.time }} · {{ log.role }}</small></span></div></div></div></aside></div></template>
