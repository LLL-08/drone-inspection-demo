<script setup>
import { computed } from 'vue'
import { BrainCircuit, ArrowRight, Play } from 'lucide-vue-next'
import StatusBadge from './StatusBadge.vue'

const props = defineProps({ selectedTask: Object, issues: Array })
const emit = defineEmits(['run-analysis', 'navigate'])
const taskIssues = computed(() => props.issues.filter(item => item.taskId === props.selectedTask?.id))
</script>

<template>
  <section class="page-stack">
    <div class="page-heading"><div><span class="eyebrow">AI ASSISTED REVIEW</span><h1>AI影像分析</h1><p>基于已归档的照片、视频和飞行记录生成问题候选，最终结论由检查人员确认。</p></div><button class="btn-primary" @click="emit('run-analysis')"><Play :size="15"/>运行分析</button></div>
    <div class="ai-banner"><div class="ai-icon"><BrainCircuit :size="24"/></div><div><b>当前分析对象：{{ selectedTask?.id }}</b><p>输入：{{ selectedTask?.files?.photo || 0 }}张照片 · {{ selectedTask?.files?.video || 0 }}段视频 · {{ selectedTask?.files?.flight || 0 }}条飞行记录</p></div><StatusBadge :status="selectedTask?.status"/></div>
    <div class="section-card"><div class="section-card-title"><div><b>候选问题结果</b><span>AI辅助识别结果</span></div><button class="text-button" @click="emit('navigate', 'issues')">进入问题审核 <ArrowRight :size="14"/></button></div><div class="issue-grid"><article v-for="issue in taskIssues" :key="issue.id" class="issue-card"><div class="issue-card-top"><span class="issue-marker" :class="issue.color"></span><b>{{ issue.type }}</b><StatusBadge :status="issue.status"/></div><strong>{{ issue.confidence }}</strong><small>{{ issue.location }}</small><p>系统建议检查人员结合原始影像复核，不作为最终结论。</p></article></div></div>
  </section>
</template>
