---
title: '信息收集'
description: '信安学习文档'
pubDate: '2026-10-09'
---

信息收集是网络安全测试（如渗透测试、漏洞挖掘、风险评估）的第一步。下面记录几种常用的信息收集方法与工具。

## Google Hacking（谷歌黑客）

### 概述

利用搜索引擎的高级语法，精准找到互联网上公开但可能被忽略的敏感信息，这些信息对网络安全分析（比如漏洞挖掘、风险评估）非常有价值。

### 基本搜索用法

- **逻辑或 `OR`**：`A OR B`，两种都有或者有一种
- **逻辑与 `AND`**：`A AND B`，查找同时包含 A 和 B 的结果
- **逻辑非 `NOT`**：`NOT keyword` / `-keyword`，不出现此关键字
- **完美匹配**：`"keyword"`，强制搜索结果中出现该关键字

### 高级搜索语法

1. **`site:` —— 限定在某个网站内搜索**

   - 作用：只在指定域名/网站里找内容，避免无关信息干扰。
   - 例子：`site:example.com admin`（搜索 example.com 中包含 "admin" 的页面）

2. **`filetype:` —— 限定文件类型**

   - 作用：搜索特定格式的文件。
   - 常见敏感文件的类型：
     - `pdf`：可能包含内部流程、密码说明、架构图
     - `doc/docx`：可能有未脱敏的表格（员工信息、服务器地址）
     - `xls/xlsx`：可能有数据表格（如客户信息、数据库配置）
     - `txt`：可能有日志文件、配置片段（`password.txt`）
   - 例子：`filetype:txt site:example.com password`（在 example.com 中搜索以 password 命名的 txt 文件）

3. **`intitle:` / `intext:` —— 限定标题/正文中的关键词**

   - `intitle:` 搜索标题中含有关键词的页面（很多后台页面标题会带 "admin"、"登录"）
     - 例子：`intitle:"后台管理" site:example.com`
   - `intext:` 搜索正文中含关键词的页面（比如页面内容里藏着密码、IP 地址）
     - 例子：`intext:"root@localhost" site:example.com`（找正文中含 Linux 管理员账号的页面）

4. **`inurl:` —— 限定 URL 中的关键词**

   - URL 往往能暴露页面功能，比如 `login`、`admin`、`upload`（上传功能，可能有漏洞）。
   - 例子：
     - `inurl:admin site:example.com`（找 URL 中含 "admin" 的页面，大概率是后台入口）
     - `inurl:php?id=`（搜索含 `?id=` 的 PHP 页面，可能存在 SQL 注入漏洞的特征）

5. **组合使用**

   - 单个语法作用有限，组合起来能精准定位敏感信息。
   - 例子：
     - `site:example.com inurl:login filetype:php`（在 example.com 里找 URL 含 "login" 的 PHP 页面，登录相关接口）
     - `intitle:"index of" site:example.com`（搜索标题为 "index of" 的页面，这是服务器默认文件列表页面，可能直接看到未加密的文件目录，比如 `index of /backup/` 可能泄露备份文件）

## 搜索引擎

### Shodan

用于搜索互联网中连接的设备、服务和网络，可以搜漏洞等，主要是 Web 侧的信息收集。

#### 包解析

`HTTP/1.1 200 OK`：

- `HTTP/1.1` 表示使用的是 HTTP 协议的版本
- `200` 是 HTTP 状态码，表示请求成功
- `OK` 是状态码的文本描述，表示请求成功完成

常见响应头：

- `Server: openresty` —— 服务器软件名称，OpenResty 是基于 Nginx 的开源软件，用于构建可伸缩的 Web 应用和服务
- `Date: Mon, 29 Jan 2024 02:32:19 GMT` —— 服务器响应的时间
- `Content-Type: text/html; charset=UTF-8` —— 响应中实际返回的内容类型是 HTML 文本，使用 UTF-8 字符集编码
- `Content-Length: 37585` —— 实体正文的长度，这里是 37585 字节
- `Connection: keep-alive` —— 完成请求后保持连接打开，以便在同一连接上进行多个请求
- `Vary: Accept-Encoding` —— 告诉代理服务器（如缓存服务器）根据请求的 Accept-Encoding 头信息来选择返回缓存响应
- `X-Powered-By: php/7.1.11` —— 揭示了服务器使用的后端技术，这里是 PHP 版本 7.1.11
- `Set-Cookie: Location=pc` —— 服务器通过 HTTP 头部在客户端存储 cookie 的一种方式，这里是一个名为 "Location" 的 cookie
- `Set-Cookie: PHPSESSID=?????` —— PHP 会话 ID 的 cookie，用于跟踪用户的会话状态

#### 搜索语法

- `country:"CN"` —— 限定国家
- `city:"ShangHai"` —— 限定城市
- `hostname:.edu` / `hostname:"hubstc"` / `hostname:hubstc.com` —— 限定主机名或域名
- `org:"alibaba"` —— 限定组织或机构
- `os:"Windows Server 2008 R2"` / `os:"Linux 2.6.x"` —— 限定系统 OS 版本
- `port:22` / `port:80` —— 限定端口
- `net:"59.56.19.0/24"` —— 指定网段
- `product:"Apache httpd"` / `product:"nginx"` / `product:"Microsoft IIS httpd"` / `product:"mysql"` —— 指定使用的软件或产品
- `vuln:"CVE-2014-0723"` —— 指定 CVE 漏洞编号
- `http.html:"hello world"` —— 指定网页内容
- `http.title:"hello"` —— 指定网页标题
- `http.status:200` —— 指定返回响应码
- `geo:"31.25,121.44"` —— 指定地理位置
- `isp:"China Telecom"` —— 指定 ISP 供应商
- `ssl:"heartbleed"` —— 指定协议及其漏洞
- `asn:"AS4134"` —— 指定 ASN 自治系统号
- `timestamp:"2022-01-01"` —— 指定历史数据

### Zoomeye（钟馗之眼）

主要用于网络侦察、漏洞发现和网络安全研究，和 Shodan 大致一样。

**主机设备搜索：**

- `app:` 组件名
- `ver:` 组件版本
- `port:` 开放端口
- `service:` 结果分析中的 "服务名" 字段
- `hostname:` 分析结果中的 "主机名" 字段

**Web 应用搜索：**

- `app:` 组件名
- `ver:` 组件版本
- `os:` 操作系统
- `site:` 网站域名
- `title:` 网页标题
- `keywords:` `<meta name="keywords">` 定义页面的关键词
- `desc:` `<meta name="description">` 定义的页面说明
- `headers:` HTTP 请求中的 Headers
- `country:` 国家或者地区代码
- `city:` 城市名称
- `ip:` 搜索指定的一个 IP 地址
- `cidr:` 网段

## 企业信息

- 天眼查
- 企业信用信息公示系统
- 工业和信息化部 ICP/IP 地址/域名信息备案管理系统

以上几个可以用来深入了解目标网站所属企业的相关信息。

## whois 信息

站长工具、爱站、微步在线 —— 用于查询域名的 IP 以及所有者等信息的传输协议。

whois 信息可以获取关键注册人的信息，包括注册商、联系人、联系邮箱、联系电话、创建时间等，可以进行邮件反查域名、爆破邮箱、社工、域名劫持、寻找旁站等等。
