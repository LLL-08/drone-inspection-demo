# 无人机智能巡检管理平台 Demo

这是一个面向售前演示的 Vue 3 + Vite 高保真前端原型，全部数据均为本地 Mock，不依赖后端、真实 AI 模型或无人机接口。

## 启动

```bash
npm install
npm run dev
```

浏览器打开终端显示的本地地址（默认 `http://localhost:5173`）。

## GitHub Pages

将仓库推送到 GitHub 的 `main` 分支后，`.github/workflows/deploy.yml` 会自动执行 `npm ci`、`npm run build` 并发布 `dist`。首次使用时，在 GitHub 仓库 Settings → Pages → Build and deployment → Source 中选择 `GitHub Actions`。

Vite 会在 GitHub Actions 中自动使用仓库名作为 `base`，例如仓库名为 `drone-inspection-demo` 时，资源路径会使用 `/drone-inspection-demo/`。

本地 Git 初始化与推送命令：

```bash
git init
git branch -M main
git add .
git commit -m "chore: prepare drone inspection demo deployment"
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

## Linux + Nginx

先在服务器构建并上传 `dist`，再将 `deploy/nginx.conf` 复制到 Nginx 配置目录，并把 `server_name` 和 `root` 替换为实际值。该配置包含静态资源缓存和 SPA 刷新回退。

Ubuntu 示例：

```bash
sudo apt update
sudo apt install -y nginx git curl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v

git clone https://github.com/<你的用户名>/<仓库名>.git /opt/drone-inspection-demo
cd /opt/drone-inspection-demo
npm ci
npm run build
sudo mkdir -p /var/www/drone-inspection-demo
sudo cp -r dist/. /var/www/drone-inspection-demo/
sudo cp deploy/nginx.conf /etc/nginx/sites-available/drone-inspection-demo
sudo ln -s /etc/nginx/sites-available/drone-inspection-demo /etc/nginx/sites-enabled/drone-inspection-demo
sudo nginx -t
sudo systemctl reload nginx
```

## 推荐演示路径

1. 登录页点击“进入平台”
2. 首页驾驶舱查看项目、任务、AI问题和报告概览
3. 进入“巡检项目”查看项目详情入口
4. 进入“巡检任务”，点击“开始任务”或“演示上传资料”
5. 在“AI影像分析”查看模拟原始影像、异常框选、识别类型和置信度
6. 进入“问题审核”，使用确认有效、误报、需要复查或人工新增问题
7. 进入“历史对比”查看同一区域的前后变化趋势
8. 进入“报告管理”查看报告预览并演示PDF导出

## 项目结构

- `src/App.vue`：应用页面、Mock数据和交互逻辑
- `src/style.css`：企业级后台视觉样式与响应式布局
- `src/main.js`：Vue应用入口
- `vite.config.js`：Vite配置
