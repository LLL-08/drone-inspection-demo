<script setup>
import { ref } from 'vue'
import { X } from 'lucide-vue-next'
const emit = defineEmits(['close', 'create'])
const form = ref({ name: '', client: '', area: '', cycle: '月度巡检', plan: '2026年8月巡检计划', standard: '无人机影像综合检查' })
function submit() { if (form.value.name && form.value.client) emit('create', { ...form.value }) }
</script>
<template><div class="modal-backdrop"><div class="modal-card"><div class="modal-head"><div><span class="eyebrow">NEW PROJECT</span><h2>创建巡检项目</h2></div><button class="close-button" @click="emit('close')"><X :size="18"/></button></div><label>项目名称<input v-model="form.name" placeholder="例如：华南储能基地一期"/></label><label>客户名称<input v-model="form.client" placeholder="客户或所属单位"/></label><label>覆盖区域<input v-model="form.area" placeholder="区域 / 建筑 / 设备范围"/></label><div class="form-row"><label>巡检周期<select v-model="form.cycle"><option>月度巡检</option><option>季度巡检</option><option>专项巡检</option></select></label><label>计划名称<input v-model="form.plan"/></label></div><label>检查标准<input v-model="form.standard"/></label><div class="modal-actions"><button class="btn-secondary" @click="emit('close')">取消</button><button class="btn-primary" @click="submit">创建项目</button></div></div></div></template>
