<script setup>
defineProps({ status: { type: String, required: true } })
const statusClass = status => ({ '执行中': 'doing', '已完成': 'done', '已确认': 'done', '已审核': 'done', '已交付': 'done', '误报': 'muted-status', '待执行': 'pending', '待审核': 'pending', '待负责人审核': 'pending', '待AI分析': 'review-status', '待问题审核': 'review-status', '资料待校验': 'review-status', '需复查': 'review-status', '已暂停': 'muted-status' }[status] || 'pending')
</script>

<template><span :class="['status', statusClass(status)]">{{ status }}</span></template>
