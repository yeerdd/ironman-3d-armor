# Stark Hall of Armor // 钢铁侠全系 3D 交互格纳库与空间手势控制系统

[![Three.js](https://img.shields.io/badge/Three.js-r128%20%2F%20r183-black?logo=three.js)](https://threejs.org/)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-WASM%20Vision-blue?logo=google)](https://developers.google.com/mediapipe)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-00e5ff?logo=githubpages)](https://yeerdd.github.io/3d/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

> **在线实时交互体验地址**：[https://yeerdd.github.io/3d/](https://yeerdd.github.io/3d/)  
> **个人综合工程作品集**：[https://yeerdd.github.io/](https://yeerdd.github.io/)

---

## 🌟 项目亮点与核心架构 (Key Highlights)

本项目是一套面向 MCU 漫威电影宇宙动力装甲的高性能 Web3D 数字化交互平台。系统打破了传统单一 3D 模型展示的局限，构建了工业级 3D 地下格纳库与全息交互展台：

1. **20+ 款高精度 3D 机甲矩阵实时载入**
   - 完整收录从 **MARK I**（阿富汗山洞始祖装甲）、**MARK III**（经典红金）、**MARK XLII**（浪子装甲）、**MARK XLIV**（维罗妮卡反浩克外骨骼）、**MARK XLIX**（小辣椒 Rescue）、**MARK L**（无限战争纳米装甲）到 **MARK LXXXV**（终局之战至尊战甲）等 20+ 套正传机甲。
   - 自主研发模型分片预热与动态内存回收策略，避免一次性加载导致显存溢出（OOM），平均单套机甲切换耗时 `<300ms`。

2. **58+ 套漫威电影宇宙全息战甲档案库 (Canonical Archive)**
   - 底部抽屉矩阵收录 58+ 套 MCU 正传机甲全息档案。
   - 支持多阶段筛选（PHASE 1 至 PHASE 10）、型号与代号实时模糊检索、首战战役与功率数据综合度量。

3. **MediaPipe 空间光学手势识别 (Optical Sensor Gesture Control)**
   - 集成 Google MediaPipe WebAssembly 本地推理内核，通过前置摄像头实时追踪手部 21 个 3D 关节点。
   - 纯本地运行，不上传任何图像数据，交互延迟低至 `<16ms (60 FPS)`。
   - 支持隔空捏合抓取（Pinch）、手掌平移（Pan）、顺逆时针旋转模型等手势交互。

4. **电影级摄影棚 PBR 物理光照与环境着色**
   - 采用多光源 PBR 材质工作流，高光金属反射与粗糙度精准调校。
   - 预设 3 套摄影棚氛围灯光方案（斯塔克冷蓝 / 高光纯白 / 警戒战术红）。
   - 内置基于 Web Audio API 的程序化合成音效系统（脉冲聚能、反应堆轰鸣、战甲锁止）。

---

## 📂 项目目录结构 (Project Structure)

```text
ironman-3d-armor/
├── models/
│   ├── armors/             # 20+ 款经拓扑优化的 GLB 高清机甲模型
│   ├── related/            # 衍生机甲 (War Machine, Iron Monger, Iron Spider...)
│   ├── mediapipe/          # 本地化的 MediaPipe WASM 视觉算子库
│   └── hand_landmarker.task# 手势关键点追踪模型权重
├── _next/                  # 静态交互 UI 与全息 HUD 运行时分片
├── stories_data/           # 战甲背景设定与电影时间线数据库
├── index.html              # 3D 展台主入口与 WebGL 渲染挂载点
├── prologue.js             # 电影前奏动画引擎
├── security.js             # 斯塔克工业全息数字水印与防盗链套件
├── server.py               # 专为 3D/WASM 资产配置 MIME 类型的轻量服务器
└── 启动3D独立展台.bat        # Windows 一键拉起本地 3D 展台脚本
```

---

## 🚀 本地快速启动 (Quick Start)

### 方式一：Windows 一键启动
双击运行根目录下的 `启动3D独立展台.bat`，系统将自动配置端口并唤起默认浏览器访问 `http://localhost:3001`。

### 方式二：Python 命令启动
```bash
# 进入项目目录
cd ironman-3d-armor

# 启动本地高吞吐静态服务器 (推荐 Python 3.10+)
python server.py 3001
```
打开浏览器访问：`http://localhost:3001`

---

## 🎮 交互指南 (User Controls)

- **鼠标操控**：按住鼠标左键拖拽旋转机甲，右键拖拽平移，滚轮缩放细节。
- **机甲切换**：点击底部工具栏 `01 ARCHIVE (58+ SUITS)` 展开全息档案网格，点击任意机甲卡片即可秒级更换当前展示模型。
- **空间手势**：点击右上角手势面板 `[OFF]` 按钮开启摄像头，跟随指引做出手势即可隔空旋转战甲。
- **视角模式**：支持 `CAMERA FULL VIEW` 全景视角与特写细节对焦模式。

---

## 📄 版权与声明 (Disclaimer)
本项目所有 3D 模型交互与工程代码均用于个人技术研究与开源展示，钢铁侠形象版权归 Marvel Studios / The Walt Disney Company 所有。
