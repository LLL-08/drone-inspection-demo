<script setup>
import { Check, ChevronDown } from 'lucide-vue-next'
defineProps({ roles: { type: Object, required: true }, currentKey: { type: String, required: true }, open: Boolean })
const emit = defineEmits(['change'])
</script>

<template>
  <div class="user-menu role-menu-anchor">
    <div class="user-avatar" @click="$emit('toggle')">{{ roles[currentKey].short }}</div>
    <div @click="$emit('toggle')"><b>{{ roles[currentKey].label }}</b><span>{{ roles[currentKey].description }}</span></div>
    <ChevronDown :size="15" @click="$emit('toggle')"/>
    <div v-if="open" class="role-menu">
      <div class="role-menu-title">Demo角色切换</div>
      <button v-for="(role, key) in roles" :key="key" @click="emit('change', key)"><span class="role-dot">{{ role.short }}</span><span><b>{{ role.label }}</b><small>{{ role.description }}</small></span><Check v-if="key === currentKey" :size="15"/></button>
    </div>
  </div>
</template>
