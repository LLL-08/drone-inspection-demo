<script setup>
import { computed, ref } from 'vue'
import { Plus, Check, X, RotateCcw } from 'lucide-vue-next'
import StatusBadge from './StatusBadge.vue'
const props = defineProps({ issues: { type: Array, default: () => [] } })
const emit = defineEmits(['review', 'create'])
const filter = ref('全部')
const filters = ['全部', '待审核', '已确认', '误报', '人工新增']
const visibleIssues = computed(() => filter.value === '全部' ? props.issues : props.issues.filter(item => item.status === filter.value))
</script>
<template>
  <section class="page-stack"><div class="page-heading"><div><span class="eyebrow">HUMAN REVIEW</span><h1>问题审核</h1><p>检查人员对AI候选结果进行确认、误报处理或补充人工问题。</p></div><button class="btn-primary" @click="emit('create')"><Plus :size="15"/>人工新增问题</button></div>
    <div class="filter-tabs"><button v-for="item in filters" :key="item" :class="{ active: filter === item }" @click="filter = item">{{ item }} <em>{{ item === '全部' ? issues.length : issues.filter(issue => issue.status === item).length }}</em></button></div>
    <div class="section-card table-card"><table><thead><tr><th>问题编号</th><th>问题类型</th><th>位置</th><th>AI置信度</th><th>状态</th><th>审核意见</th><th>操作</th></tr></thead><tbody><tr v-for="issue in visibleIssues" :key="issue.id"><td><b>{{ issue.id }}</b></td><td><span class="issue-inline"><i class="issue-marker" :class="issue.color"></i>{{ issue.type }}</span></td><td>{{ issue.location }}</td><td><strong>{{ issue.confidence }}</strong></td><td><StatusBadge :status="issue.status"/></td><td class="muted-cell">{{ issue.opinion || '待检查人员确认' }}</td><td><div v-if="issue.status === '待审核'" class="table-actions"><button class="icon-action success" title="确认" @click="emit('review', issue, '已确认', '影像证据清晰，纳入报告。')"><Check :size="15"/></button><button class="icon-action danger" title="误报" @click="emit('review', issue, '误报', '复核后判断为误报。')"><X :size="15"/></button><button class="icon-action" title="需复查" @click="emit('review', issue, '需复查', '需要补充查看原始影像。')"><RotateCcw :size="15"/></button></div><span v-else class="muted-cell">已处理</span></td></tr></tbody></table></div>
  </section>
</template>
