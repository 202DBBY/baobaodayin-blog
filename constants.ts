import { NavItem, Post, Moment, Friend, LocationLog, UserProfile } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: '主页', path: '/' },
  { 
    id: 'category', 
    label: '分类', 
    children: [
      { id: 'cat-magic', label: '魔法', path: '/category/magic' },
      { id: 'cat-log', label: '日志', path: '/category/log' },
      { id: 'cat-recent', label: '近期', path: '/category/recent' },
    ]
  },
  {
    id: 'pages',
    label: '页面',
    children: [
      { id: 'pg-archive', label: '归档', path: '/page/archive' },
      { id: 'pg-friends', label: '友链', path: '/page/friends' },
      { id: 'pg-footprints', label: '足迹', path: '/page/footprints' },
      { id: 'pg-about', label: '关于', path: '/page/about' },
    ]
  },
  { id: 'moments', label: '片刻', path: '/moments' },
];

export const DEFAULT_PROFILE: UserProfile = {
  name: '包包大银',
  avatar: 'https://picsum.photos/id/64/200/200',
  tagline: '00后',
  bio: '热衷于折腾的前端开发者，喜欢设计、摄影和一切美好的事物。永远保持好奇心，永远热泪盈眶。',
  description: `
嗨，我是包包大银（Jdeal）。一名出生于 00 后的普通且自信的青年。

目前主要从事前端开发工作，但也对 UI 设计、交互体验有着浓厚的兴趣。这个博客是我记录生活、分享技术、吐槽日常的一方小天地。

我不喜欢循规蹈矩，喜欢尝试新鲜事物。相信代码可以改变世界，至少能改变我的世界。
  `,
  location: '江苏 · 南京',
  email: 'hi@example.com',
  github: 'https://github.com',
  twitter: 'https://twitter.com',
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Figma', 'Photography', 'Sketch'],
  interests: [
    { name: '敲代码', percent: 90, color: 'bg-blue-500', icon: 'Code' },
    { name: '听音乐', percent: 85, color: 'bg-purple-500', icon: 'Music' },
    { name: '喝咖啡', percent: 60, color: 'bg-amber-500', icon: 'Coffee' },
  ],
  quote: "Stay hungry, stay foolish."
};

export const MOCK_MOMENTS: Moment[] = [
  {
    id: 'm1',
    author: '包包大银',
    avatar: 'https://picsum.photos/id/64/100/100',
    content: '嗯，你们愉快的假期即将结束了，其实昨天我已经开始上班了 🙃 告诉你们一个“好”消息，本周六要上班哦 😂',
    date: '3分钟前',
    likes: 12,
    isLiked: false,
    comments: [
      { id: 'c1', author: 'Tom', content: '这也太惨了吧！', date: '1分钟前' },
      { id: 'c2', author: 'Jerry', content: '哈哈哈哈，我也上班了', date: '2分钟前' }
    ]
  },
  {
    id: 'm2',
    author: '快捷指令',
    avatar: 'https://picsum.photos/id/103/100/100',
    content: '很喜欢的节目，就是一直没有更新第四季，可能美食节目原本受众就很小吧，你呢，又有多久没有和朋友一起吃宵夜啦 😋',
    date: '80天前',
    images: ['https://picsum.photos/id/225/400/300'],
    likes: 45,
    isLiked: true,
    comments: [
      { id: 'c3', author: 'Foodie', content: '这是哪家店？看起来很好吃！', date: '80天前' }
    ]
  },
  {
    id: 'm3',
    author: '微信公众号',
    avatar: 'https://picsum.photos/id/40/100/100',
    content: '搞了好几天了，一直以为是搬迁后环境部署有问题，一直在各种测试和文件恢复！突然灵光一现，最终找到问题所在，服务器端DNS解析有问题，擦，搞的我真是心力交瘁，总算是搞定了...',
    date: '84天前',
    likes: 23,
    isLiked: false,
    comments: []
  },
  {
    id: 'm4',
    author: '旅行日记',
    avatar: 'https://picsum.photos/id/10/100/100',
    content: '海边的风真的很舒服，分享一段海浪的声音。🌊',
    date: '2小时前',
    likes: 88,
    isLiked: false,
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', // Mock video URL
    comments: [
       { id: 'c4', author: 'Alice', content: '太治愈了~', date: '1小时前' },
       { id: 'c5', author: 'Bob', content: '求BGM', date: '30分钟前' }
    ]
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p-ai-01',
    title: '深度解析 DeepSeek R1：国产大模型的逆袭之路',
    date: '2025年02月10日',
    summary: 'DeepSeek R1 近期在 AI 圈引发了巨大轰动。本文将从技术架构、训练成本以及实际编码能力三个维度，深入剖析它是如何以极低的成本达到媲美 O1 的推理能力的。',
    tags: ['AI', 'LLM', 'DeepSeek', '深度学习'],
    category: 'magic',
    content: `# DeepSeek R1：打破算力垄断

DeepSeek R1 的发布无疑是 2025 年初最重磅的 AI 新闻。

## 什么是 MoE 架构？

DeepSeek 采用了混合专家模型 (Mixture of Experts, MoE)。简单来说，它就像一个拥有多个专家的团队，遇到数学题找数学专家，遇到代码题找代码专家。

\`\`\`python
# 伪代码示例：MoE 路由逻辑
def moe_layer(input, experts):
    # 计算路由概率
    routing_weights = softmax(gate_network(input))
    # 选择 Top-K 专家
    selected_experts = top_k(routing_weights, k=2)
    # 聚合专家输出
    output = sum(expert(input) * weight for expert, weight in selected_experts)
    return output
\`\`\`

## 蒸馏与推理优化

R1 的另一大亮点是**蒸馏技术**。通过让小模型学习大模型的思维链 (Chain of Thought)，在保持推理能力的同时，大幅降低了部署成本。

## 实际体验

在写 Python 爬虫和 React 组件时，R1 的表现令人印象深刻，尤其是在处理复杂的上下文逻辑时，不仅速度快，而且幻觉率极低。`
  },
  {
    id: 'p-lang-01',
    title: '2025年，Rust 依然是系统编程的王座吗？',
    date: '2025年01月28日',
    summary: '随着 C++26 的临近和 Zig 的崛起，Rust 面临着新的挑战。本文回顾了 Rust 在 Linux 内核、Windows 系统开发中的现状，并探讨其未来的统治力。',
    tags: ['Rust', '编程语言', 'System Programming'],
    category: 'log',
    content: `# Rust：从新贵到基石

还记得五年前，Rust 还是一个"虽然安全但难学"的小众语言。如今，它已经深入到了操作系统的核心。

## Linux 内核中的 Rust

Linus Torvalds 已经接纳 Rust 进入 Linux 内核。虽然目前主要用于驱动开发，但这是一个巨大的信号：**内存安全是不可逆转的趋势**。

## 借用检查器 (Borrow Checker)

Rust 最让人爱恨交织的特性。

\`\`\`rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // 所有权转移 (Move)
    
    // println!("{}, world!", s1); // 编译错误！s1 已失效
    println!("{}, world!", s2);
}
\`\`\`

正是这种严格的编译期检查，消除了空指针引用和数据竞争。虽然学习曲线陡峭，但为了生产环境的稳定性，这一切都是值得的。`
  },
  {
    id: 'p-ai-02',
    title: 'Transformer 架构详解：大模型的基石',
    date: '2024年12月15日',
    summary: 'Attention is All You Need. 这篇论文改变了世界。我们来手撕 Transformer 的核心机制：自注意力机制 (Self-Attention)。',
    tags: ['AI', 'Transformer', '算法'],
    category: 'magic',
    content: `# Attention is All You Need

在 Transformer 出现之前，NLP 领域由 RNN 和 LSTM 统治。它们的问题是：**无法并行计算，且长距离依赖效果差**。

## Self-Attention 机制

想象你在读一句话："The animal didn't cross the street because it was too tired."

当读到 "it" 时，人类知道它指代 "animal"。Self-Attention 就是让机器学会这种关联。

公式如下：

$$
Attention(Q, K, V) = softmax(\frac{QK^T}{\sqrt{d_k}})V
$$

*   **Q (Query)**: 查询向量
*   **K (Key)**: 键向量
*   **V (Value)**: 值向量

通过计算 Q 和 K 的点积，得到相关性分数，再加权求和 V，就得到了包含上下文信息的表示。`
  },
  {
    id: 'p-lang-02',
    title: 'Python 3.13：GIL 的移除意味着什么？',
    date: '2024年11月20日',
    summary: 'Python 终于要通过 PEP 703 移除全局解释器锁 (GIL) 了。这对于多线程性能来说是一次革命性的提升。',
    tags: ['Python', '并发', 'GIL'],
    category: 'log',
    content: `# 再见，GIL

Python 长期以来被诟病 "多线程是假的"，因为 GIL 限制了同一时刻只能有一个线程执行字节码。

## No-GIL 的影响

1.  **CPU 密集型任务**：将直接受益。多核 CPU 终于能被 Python 原生线程跑满了。
2.  **生态系统适配**：C 扩展库（如 NumPy, Pandas）需要大量修改以保证线程安全。
3.  **单线程性能**：可能会有微小的下降，但为了并行能力，这是可接受的代价。

这意味着在 AI 训练预处理、科学计算领域，纯 Python 代码的性能上限将被大幅拔高。`
  },
  {
    id: 'p-tech-01',
    title: 'Prompt Engineering：从入门到精通',
    date: '2024年10月05日',
    summary: '与 AI 对话是一门艺术。如何写出结构化、高质量的提示词？本文总结了 CO-STAR 框架和 Few-Shot Prompting 技巧。',
    tags: ['AI', 'Prompt', '技巧'],
    category: 'magic',
    content: `# 提示词工程指南

好的 Prompt 能让 GPT-4 变成天才，烂的 Prompt 能让它变成人工智障。

## CO-STAR 框架

*   **C (Context)**: 背景信息。"你是一个资深的前端架构师..."
*   **O (Objective)**: 任务目标。"请重构这段 React 代码..."
*   **S (Style)**: 风格。"使用幽默、通俗易懂的语言..."
*   **T (Tone)**: 语气。"专业、客观..."
*   **A (Audience)**: 受众。"面向初级开发者..."
*   **R (Response)**: 输出格式。"请输出 Markdown 格式，包含代码块..."

## Few-Shot Prompting (少样本提示)

不要只给指令，要给示例。

> 用户：将下列情感分类。
> 例子1："这饭真难吃" -> 负面
> 例子2："今天天气不错" -> 正面
> 任务："服务员态度很好" -> ?

这种方式能显著提高模型的准确率。`
  },
  {
    id: 'p-lang-03',
    title: 'React 19 前瞻：Compiler 来了',
    date: '2024年09月12日',
    summary: 'React 19 最大的亮点不是新的 Hook，而是 React Compiler。它将自动处理 memoization，不仅是 useMemo 和 useCallback，手动优化将成为历史。',
    tags: ['React', '前端', 'JavaScript'],
    category: 'recent',
    content: `# React Forget (Compiler)

React 开发者的心智负担一直很重：什么时候用 \`useMemo\`？什么时候用 \`useCallback\`？依赖项数组写对了吗？

React 19 引入的 Compiler 旨在解决这个问题。

## 自动记忆化

编译器会在构建阶段分析代码，自动为组件和 hook 添加记忆化逻辑。

**Before:**
\`\`\`jsx
const filteredList = useMemo(() => {
  return list.filter(item => item.active);
}, [list]);
\`\`\`

**After (React 19):**
\`\`\`jsx
// 就像写普通 JS 一样，编译器自动优化
const filteredList = list.filter(item => item.active);
\`\`\`

这是 React 迈向 "True Reactivity" 的重要一步。`
  },
  {
    id: 'p-ai-03',
    title: 'RAG vs Fine-tuning：企业级 AI 落地指南',
    date: '2024年08月30日',
    summary: '企业想用私有数据训练 AI，该选 RAG (检索增强生成) 还是 Fine-tuning (微调)？本文对比了两者的优缺点及适用场景。',
    tags: ['AI', 'RAG', '微调'],
    category: 'log',
    content: `# RAG 还是 微调？

这是每一个想做企业知识库的 CTO 都会面临的问题。

## RAG (Retrieval-Augmented Generation)

**原理**：先在知识库中检索相关文档，然后把文档作为 Context 喂给大模型。
**优点**：
*   数据实时更新，无需重训。
*   成本低，基于向量数据库。
*   可解释性强（知道引用了哪段文档）。

## Fine-tuning (微调)

**原理**：用特定领域的数据继续训练模型的权重。
**优点**：
*   学习特定的说话风格、格式。
*   植入深层的领域知识。

## 结论

90% 的场景（如客服问答、文档检索）应优先选择 **RAG**。只有当你需要模型学会一种全新的语言风格或极其专业的逻辑时，才考虑微调。`
  },
  {
    id: 'p7',
    title: '博客开发实录：Gemini 与我的全栈协作',
    date: '2024年05月20日',
    summary: '本文复盘了这个博客从零到一的开发历程。详细记录了如何利用 Google Gemini AI 进行辅助编程、报错解决以及功能迭代。这是一次 AI 驱动开发的深度尝试。',
    tags: ['全栈', 'AI', 'Gemini', '复盘', 'React'],
    category: 'magic',
    content: `# 博客开发实录：Gemini 与我的全栈协作

> 技术不应该只是冰冷的代码，它也可以充满温度。 —— 包包大银

## 前言

这一周，我做了一个有趣的实验：完全依赖 **Google Gemini** 和我（作为“Prompt 工程师”兼“代码审核员”）的协作，从零开始搭建了这个个人博客。

这不仅是一个技术项目的交付，更是一次关于 **AI 辅助开发** 模式的深度探索。

## 1. 技术选型：轻量与现代

在开始之前，我确立了“小而美”的原则。不需要复杂的后端，不需要庞大的数据库。

-   **核心框架**: React 19 (紧跟前沿)
-   **样式库**: Tailwind CSS (原子化 CSS，开发效率极高)
-   **路由**: React Router v6
-   **图标**: Lucide React
-   **AI 能力**: Google GenAI SDK (\`@google/genai\`)

## 2. 工具链：Google AI Studio

整个开发过程中，**Google AI Studio** 扮演了“云端架构师”的角色。

我并没有一行一行地手写 CSS，而是通过详细的 Prompt 描述我的需求：
*   “设计一个极简风格的 Sidebar，支持折叠。”
*   “创建一个展示足迹的 3D 地球组件，纯 CSS 实现。”
*   “帮我写一个 Markdown 解析器。”

Gemini 的响应速度和代码质量令人惊讶，尤其是在处理 Tailwind 的类名组合时，它比我手写要快得多。

## 3. 开发过程中的挑战与解决

当然，AI 并非万能，开发过程中也遇到了不少坑。

### 3.1 Markdown 渲染问题

**问题描述**：文章详情页最初只是简单展示文本，无法解析 Markdown 语法，导致排版混乱。
**解决思路**：通常我们会引入 \`react-markdown\`。但为了保持项目轻量（且受限于特定环境），我决定手写一个轻量级的 Markdown 渲染器。
**代码实现**：利用正则匹配 (\`#\`, \`**\`, \`>\`)，将文本转化为 React Node。虽然功能不如库完善，但满足了博客的基本需求。

### 3.2 状态管理的抉择

**问题描述**：随着“足迹”、“文章管理”功能的加入，组件间传值变得复杂。
**解决方案**：引入了 React Context API (\`DataContext\`)。
通过 \`DataProvider\` 包裹应用，实现了全局数据的共享。无论是 Admin 面板修改文章，还是前台展示，都共用一套数据源。

### 3.3 移动端适配

**问题描述**：Sidebar 在手机上占据了太多空间。
**解决方案**：利用 Tailwind 的 \`md:hidden\` 类名，实现了一套响应式的抽屉菜单。在移动端默认隐藏，点击汉堡按钮滑出。

## 4. 核心功能亮点

### 4.1 魔法足迹

这是我最喜欢的一个功能。利用 CSS 动画模拟了一个旋转的地球，并支持切换到平面地图模式。点击地图任意位置，即可记录一次“点亮”操作。

### 4.2 AI 写作助手

在后台管理中，如果我一时词穷，可以点击“AI 生成”，调用 Gemini API 根据标题自动撰写文章草稿。这大大降低了写作的门槛。

## 5. 总结

这次开发经历让我深刻体会到：**AI 不会取代程序员，但会使用 AI 的程序员将取代不会使用的。**

Gemini 就像是一个博学但偶尔粗心的助手。你需要清晰地表达需求，并具备 Review 代码的能力。当两者结合，效率是惊人的。

未来，我计划给博客加入更多 AI 元素，比如“AI 评论伴侣”或“智能语义搜索”。

> 保持好奇，保持热泪盈眶。`
  },
  {
    id: 'p1',
    title: '2025年震撼来袭：你准备好了吗？',
    date: '2025年01月03日',
    summary: '新的一年，新的开始。不仅仅是数字的跳动，更是心态的重塑。在这篇文章中，我将分享对未来的展望和一些即将在本站上线的有趣计划。',
    tags: ['计划', '新年', '展望'],
    category: 'recent',
    content: `# 2025年震撼来袭：你准备好了吗？

时间如白驹过隙，转眼间我们已经站在了2025年的门槛上。回首过去的一年，有欢笑，有泪水，有收获，也有遗憾。但无论如何，那些都已成为过去，现在，我们要面向未来。

## 新的起点

2025年对我来说，不仅仅是一个数字的更迭，更是一个全新的起点。我计划在这一年里：

1.  **深入学习前端新技术**：Web Components, Rust for Web, AI-Driven UI... 这些都是我想要探索的领域。
2.  **坚持写作**：博客不仅仅是技术的记录，更是成长的见证。我希望每周都能产出一篇高质量的文章。
3.  **身体健康**：身体是革命的本钱。今年我要坚持跑步，目标是完成一次半马。

## 本站计划

关于这个博客（包包大银的小站），我也有一些有趣的计划：

-   **暗黑模式优化**：让夜间阅读更加舒适。
-   **增加互动功能**：不仅仅是评论，还有更多的彩蛋等待大家发现。
-   **AI 辅助**：利用 Gemini 等大模型，辅助内容生成和代码审查，让博客更加智能。

## 结语

未来已来，将至已至。让我们收拾好行囊，带上梦想，向着2025年进发！

> 只要路是对的，就不怕路远。`
  },
  {
    id: 'p2',
    title: '从灵感闪现到 Scriptable 组件的奇妙一周',
    date: '2024年11月29日',
    summary: '折腾是一种乐趣。记录了如何利用 Scriptable 编写一个显示博客最新文章的小组件，过程中踩了不少坑，但也收获了满满的成就感。',
    tags: ['代码', 'Scriptable', '折腾'],
    category: 'magic',
    content: `# Scriptable 组件开发记

最近迷上了 iOS 的小组件，特别是 Scriptable 这个神器，简直是程序员的玩具。

## 灵感来源

每次想看自己博客有没有人评论，都要打开浏览器，太麻烦了。如果能直接在桌面上显示最新的文章和评论数，岂不是美滋滋？

## 动手实践

说干就干。Scriptable 使用的是 JavaScript 语法，这对前端开发来说简直是小菜一碟。

\`\`\`javascript
const url = "https://api.example.com/posts";
const req = new Request(url);
const res = await req.loadJSON();
// ... 渲染逻辑
\`\`\`

虽然语法简单，但是布局 API (\`ListWidget\`, \`addStack\`) 还是需要适应一下的。特别是字体大小的控制和图片的缓存处理，踩了不少坑。

## 遇到的坑

1.  **缓存问题**：Scriptable 对网络图片的加载有时候会比较慢，建议做本地文件缓存。
2.  **刷新机制**：小组件的刷新频率受限于 iOS 系统，不能做到实时更新，这点比较蛋疼。

## 最终效果

经过一周的打磨，终于搞定了一个包含：
- 最新文章标题
- 发布时间
- 随机背景图

的小组件。看着桌面上的成果，满满的成就感！`
  },
  {
    id: 'p3',
    title: '告白气球：让页面浪漫起来',
    date: '2024年11月14日',
    summary: '给博客添加了一些动态效果，不仅仅是为了炫技，更是为了让访问者感受到一丝温暖和浪漫。技术也可以是有温度的。',
    tags: ['CSS', '设计', '浪漫'],
    category: 'magic',
    content: `# 让代码充满浪漫

谁说程序员不懂浪漫？今天我就用 CSS 让博客飘满气球。

## CSS 动画之美

要实现气球飘动的效果，核心是 CSS 的 \`@keyframes\` 动画。

\`\`\`css
@keyframes float {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-100vh) rotate(20deg); opacity: 0; }
}

.balloon {
  position: fixed;
  bottom: -100px;
  animation: float 10s ease-in infinite;
}
\`\`\`

## 随机性

为了让气球看起来更自然，我们需要给每个气球设置不同的：
*   大小 (\`scale\`)
*   颜色 (\`background-color\`)
*   飘动速度 (\`animation-duration\`)
*   初始位置 (\`left\`)

这里我写了一个简单的 JS 脚本来生成这些 DOM 元素，并随机赋予它们样式。

## 温暖的交互

当鼠标滑过气球时，它会加速上升或者爆裂（加个 \`pop\` 音效），这种微小的交互能极大地提升用户的愉悦感。

> 技术不仅仅是冷冰冰的代码，它也是传递情感的媒介。希望每一个访问这里的人，都能感受到一份温暖。`
  },
  {
    id: 'p4',
    title: '浅浅的改造：博客新变化',
    date: '2024年11月12日',
    summary: '对博客的字体、间距和配色进行了一次微调。看似微小的改变，却能极大提升阅读体验。',
    tags: ['设计', '更新'],
    category: 'log',
    content: `# 博客 3.0：细节决定成败

最近看自己的博客，总觉得哪里不对劲。不是内容的问题，而是阅读体验。

## 字体选择

之前使用的是系统默认字体，在 Windows 下显示效果一般。这次引入了 \`Inter\` 作为英文字体，\`Noto Sans SC\` 作为中文字体。

\`\`\`css
font-family: 'Inter', 'Noto Sans SC', sans-serif;
\`\`\`

## 留白的艺术

"密不透风"是很多初级设计的通病。我把行高 (\`line-height\`) 从 1.5 调整到了 1.75，段落间距也适当增加。页面瞬间显得“透气”了许多。

## 配色微调

原来的灰色有点太冷了，这次在灰色中加入了一点点蓝紫色调，让暗黑模式下的背景看起来更加深邃但不死板。

## 总结

改版不是为了改而改，而是为了更好的服务于内容。希望大家喜欢这次的微调。`
  },
  {
    id: 'p5',
    title: '智能家居改造之红外转射频遥控',
    date: '2024年11月05日',
    summary: '为了让老旧的设备接入 HomeKit，我进行了一番硬核改造。红外、射频、HomeAssistant，一顿操作猛如虎。',
    tags: ['智能家居', '硬件', 'DIY'],
    category: 'magic',
    content: `# 硬核改造：老家电变智能

家里有一台十年前的空调，还有几个射频控制的电动窗帘。为了让它们能听懂 "Hey Siri"，我决定动手改造。

## 硬件准备

*   ESP8266 开发板
*   红外发射/接收模块
*   433Mhz 射频发射模块
*   杜邦线若干

## 软件方案

核心是 **Home Assistant** + **ESPHome**。

1.  **抓包**：利用接收模块，把空调遥控器和窗帘遥控器的信号录制下来。
2.  **编写配置**：在 ESPHome 中配置 switch 或 climate 组件，将录制的信号填入。
3.  **接入 HomeKit**：在 Home Assistant 中安装 HomeKit Bridge 插件，把实体暴露给 Apple 家庭 App。

## 成果

现在，我只需要躺在床上喊一声：“嘿 Siri，打开窗帘，把空调调到26度。” 一切自动完成。

这种掌控感，大概就是男人的浪漫吧。`
  },
  {
    id: 'p6',
    title: '独立博客自省问卷15题',
    date: '2024年10月15日',
    summary: '为什么要写博客？为了谁写？写什么？这是一份来自独立博客圈的自省问卷，用来审视自己的初心。',
    tags: ['思考', '博客', '问卷'],
    category: 'log',
    content: `# 博客自省：初心与坚持

在独立博客圈流传着一份“自省问卷”，今天我也来答一答，权当是对自己博客生涯的一次梳理。

## 1. 为什么写博客？

起初是为了记录技术遇到的坑，后来发现，写博客是一种很好的“输出倒逼输入”的学习方式。当然，也有一点点虚荣心，希望自己的文章能被别人看到并认可。

## 2. 博客写给谁看？

首先是写给自己看的。它是我的知识库，也是我的时光机。其次是写给有缘人看的，如果我的文章能帮到你，哪怕只有一点点，那也是极好的。

## 3. 坚持了多久？

算上最早在 CSDN 和 博客园 的时间，大概有5年了吧。独立建站也有3年了。中间断断续续，但好在没有彻底放弃。

## 4. 最大的收获是什么？

*   **技术提升**：为了写清楚一个知识点，必须自己先搞懂。
*   **结识朋友**：通过友链和评论，认识了很多志同道合的朋友。
*   **自我表达**：在这个嘈杂的互联网时代，拥有一个完全属于自己的发声渠道，是一件很酷的事情。

## 结语

博客，且写且珍惜。它不仅是代码的堆砌，更是灵魂的栖息地。`
  },
  {
    id: 'p-lang-04',
    title: 'TypeScript 5.5 Beta 发布：推理能力大增',
    date: '2024年04月28日',
    summary: 'TS 5.5 带来了一个备受期待的功能：Inferred Type Predicates。从此 filter(Boolean) 再也不用手动写类型断言了。',
    tags: ['TypeScript', '前端', '更新'],
    category: 'recent',
    content: `# TypeScript 5.5：更聪明的编译器

TS 开发者苦 \`filter\` 久矣。

## 痛点

\`\`\`typescript
const nums = [1, 2, null, 3];
const validNums = nums.filter(n => n !== null); 
// 推导出的类型依然是 (number | null)[]
\`\`\`

以前我们必须手动写 Type Guard：
\`\`\`typescript
nums.filter((n): n is number => n !== null);
\`\`\`

## 改进

在 TS 5.5 中，如果你的函数通过控制流收缩了类型，TS 会自动将其推导为类型谓词。代码瞬间清爽了！`
  },
  {
    id: 'p-ai-04',
    title: 'Sora：视频生成的 GPT-3 时刻',
    date: '2024年02月18日',
    summary: 'OpenAI 发布了文生视频模型 Sora，其生成的 60秒长视频在连贯性、物理规律遵循上吊打所有竞品。世界模拟器真的要来了吗？',
    tags: ['AI', 'Sora', '视频生成'],
    category: 'magic',
    content: `# Sora 震撼发布

如果说 ChatGPT 解决了文本的理解，那么 Sora 就在试图理解物理世界。

## 核心技术：Diffusion Transformer (DiT)

Sora 并没有沿用传统的 U-Net 架构，而是将 Transformer 与 Diffusion 结合。它将视频拆解为一个个 Patch（类似文本的 Token），然后在时空维度上进行建模。

## 物理规律的涌现

最让人惊讶的是，Sora 似乎"理解"了物理。比如视频中的人物被遮挡后再次出现，依然能保持一致性；水中的倒影随着波纹变化。虽然还有瑕疵，但这表明模型已经构建了某种内部的世界模型。`
  },
  {
    id: 'p-tech-02',
    title: 'WebAssembly：浏览器的核武器',
    date: '2024年01月10日',
    summary: '从 Figma 到 Photoshop Web 版，Wasm 正在让浏览器运行桌面级的应用成为可能。',
    tags: ['Wasm', 'Web', '性能'],
    category: 'magic',
    content: `# WebAssembly (Wasm)

JavaScript 很好，但它终究是解释型语言，在处理图像处理、视频解码等密集计算时力不从心。

## 什么是 Wasm？

它是一种二进制指令格式，可以以接近原生代码的速度运行。C++、Rust、Go 等语言都可以编译成 Wasm 在浏览器中跑。

## 应用场景

1.  **设计工具**：Figma 利用 C++ 编写图形引擎，编译为 Wasm，实现了极度流畅的 Web 体验。
2.  **游戏**：Unity 游戏可以直接发布到 Web。
3.  **AI 推理**：TensorFlow.js 配合 Wasm 后端，可以在浏览器端进行模型推理。`
  },
  {
    id: 'p-lang-05',
    title: 'Bun 1.0：Node.js 的挑战者',
    date: '2023年09月15日',
    summary: 'All-in-one 的 JavaScript 运行时 Bun 正式发布 1.0 版本。更快的启动速度、兼容 Node API、内置打包工具，它能取代 Node 吗？',
    tags: ['Bun', 'Node.js', 'JavaScript'],
    category: 'recent',
    content: `# Bun：快到飞起

Bun 是用 Zig 语言编写的，主打就是一个字：**快**。

## 为什么这么快？

1.  **JavaScriptCore**：Bun 使用了 Safari 的 JS 引擎，而不是 V8。JSC 在启动时间和内存占用上往往优于 V8。
2.  **零拷贝设计**：在 I/O 操作上进行了极致优化。

## 开发者体验

Bun 不仅仅是 Runtime，它还是：
*   Package Manager (替代 npm)
*   Bundler (替代 Webpack/Vite)
*   Test Runner (替代 Jest)

这种开箱即用的体验，对于新项目来说非常有吸引力。`
  },
  {
    id: 'p-ai-05',
    title: 'Agent：大模型的下半场',
    date: '2023年11月05日',
    summary: '单纯的聊天机器人已经不能满足需求，能自主使用工具、规划任务的 AI Agent (智能体) 才是未来。AutoGPT 只是开始。',
    tags: ['AI', 'Agent', '智能体'],
    category: 'magic',
    content: `# AI Agent 崛起

如果说 LLM 是大脑，那么 Agent 就是给大脑装上了手和脚。

## 核心架构

一个典型的 Agent 包含：
1.  **规划 (Planning)**：拆解复杂任务。
2.  **记忆 (Memory)**：记住之前的操作和结果。
3.  **工具使用 (Tool Use)**：调用搜索、计算器、API。

## 展望

未来的软件交互可能不再是点击按钮，而是对 Agent 说："帮我订一张下周五去北京的机票，要靠窗，价格在1000以内。" Agent 会自动去携程查询、对比、下单。`
  },
  {
    id: 'p-tech-03',
    title: 'CSS Nesting：终于等到你',
    date: '2023年08月20日',
    summary: '原生 CSS 嵌套语法终于被主流浏览器支持了。Sass/Less 的核心功能之一，现在可以直接在 CSS 文件里写了。',
    tags: ['CSS', '前端', '新特性'],
    category: 'log',
    content: `# 原生 CSS Nesting

以前我们需要预处理器才能写嵌套：

\`\`\`scss
.card {
  background: white;
  &:hover {
    background: gray;
  }
}
\`\`\`

现在，Chrome 112+ 已经原生支持这种写法！

## 语法规则

大部分情况下与 Sass 兼容，但有一些细微差别。例如，直接嵌套元素标签可能需要 \`&\` 符号作为前缀（虽然最新规范正在放宽这个限制）。

这大大简化了构建流程，对于轻量级项目，我们可能不再需要配置 PostCSS 或 Sass 了。`
  }
];

export const MOCK_FRIENDS: Friend[] = [
  {
    id: 'f1',
    name: '少数派',
    avatar: 'https://sspai.com/favicon.ico',
    description: '高效工作，品质生活',
    url: 'https://sspai.com',
    tags: ['科技', '效率'],
    status: 'active'
  },
  {
    id: 'f2',
    name: 'DIYgod',
    avatar: 'https://avatars.githubusercontent.com/u/12064746?v=4',
    description: '写代码是热爱，写到世界充满爱',
    url: 'https://diygod.me',
    tags: ['大佬', 'RSSHub'],
    status: 'active'
  },
  {
    id: 'f3',
    name: 'Randy',
    avatar: 'https://lutaonan.com/images/avatar.jpg',
    description: '一个前端开发者的碎碎念',
    url: 'https://lutaonan.com',
    tags: ['前端', '设计'],
    status: 'active'
  }
];

export const MOCK_FOOTPRINTS: LocationLog[] = [
  { id: 'l1', city: '南京', province: '江苏', date: '2023-05-01', coordinates: { x: 75, y: 55 } },
  { id: 'l2', city: '苏州', province: '江苏', date: '2023-06-15', coordinates: { x: 76, y: 56 } },
  { id: 'l3', city: '杭州', province: '浙江', date: '2023-10-02', coordinates: { x: 75, y: 60 } },
  { id: 'l4', city: '成都', province: '四川', date: '2024-01-20', coordinates: { x: 45, y: 58 } },
  { id: 'l5', city: '大理', province: '云南', date: '2024-03-10', coordinates: { x: 35, y: 70 } },
];