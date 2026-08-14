<script setup>
import { Settings, UserRound, ScrollText } from 'lucide-vue-next'
</script>
<template><section class="page-stack"><div class="page-heading"><div><span class="eyebrow">SYSTEM CONTROL</span><h1>系统管理</h1><p>维护账号角色、权限边界、业务字典和操作日志。</p></div></div><div class="split-grid three"><div class="section-card admin-card"><UserRound :size="19"/><b>账号与角色</b><p>五类内部角色按岗位使用系统，客户一期仅接收审核后的PDF。</p><span>5 个角色</span></div><div class="section-card admin-card"><Settings :size="19"/><b>业务配置</b><p>维护问题类型、巡检周期、报告模板等基础配置。</p><span>基础配置 Mock</span></div><div class="section-card admin-card"><ScrollText :size="19"/><b>操作日志</b><p>记录任务、问题审核、报告审核和交付等关键操作。</p><span>演示日志已启用</span></div></div></section></template>
