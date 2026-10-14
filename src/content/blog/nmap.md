---
title: 'NMAP命令全集'
description: '信安学习文档'
pubDate: '2026-10-14'
---

Nmap 命令选项速查，按官方手册分类整理。

## 一、目标规格（Target Specification）

- `{target specification}` 直接指定目标，支持主机名、IP、网段。示例：`scanme.nmap.org`、`microsoft.com/24`、`192.168.0.1`、`10.0.0-255.1-254`
- `-iL <inputfilename>` 从文件读取目标列表
- `-iR <num hosts>` 随机生成指定数量的目标
- `--exclude <host1[,host2],...>` 排除指定主机或网段
- `--excludefile <exclude_file>` 从文件读取排除列表

## 二、主机发现（Host Discovery）

- `-sL` 列表扫描（仅列出目标，不发包）
- `-sn` Ping 扫描（禁用端口扫描）
- `-Pn` 跳过主机发现，将所有主机视为在线
- `-PS/PA/PU/PY[portlist]` TCP SYN / TCP ACK / UDP / SCTP 发现探测
- `-PE/PP/PM` ICMP 回显 / 时间戳 / 网络掩码请求探测
- `-PO[protocol list]` IP 协议 Ping
- `-n` 从不进行 DNS 解析
- `-R` 总是进行 DNS 解析（默认：有时解析）
- `--dns-servers <serv1[,serv2],...>` 指定自定义 DNS 服务器
- `--system-dns` 使用操作系统 DNS 解析器
- `--traceroute` 追踪到每个主机的路由跳点

## 三、扫描技术（Scan Techniques）

- `-sS` TCP SYN 扫描（半开扫描）
- `-sT` TCP Connect() 扫描
- `-sA` TCP ACK 扫描
- `-sW` TCP 窗口扫描
- `-sM` TCP Maimon 扫描
- `-sU` UDP 扫描
- `-sN` TCP Null 扫描
- `-sF` TCP FIN 扫描
- `-sX` TCP Xmas 扫描
- `--scanflags <flags>` 自定义 TCP 扫描标志位
- `-sI <zombie host[:probeport]>` 空闲扫描（Idle Scan）
- `-sY` SCTP INIT 扫描
- `-sZ` SCTP COOKIE-ECHO 扫描
- `-sO` IP 协议扫描
- `-b <FTP relay host>` FTP 弹跳扫描

## 四、端口规格与扫描顺序（Port Specification and Scan Order）

- `-p <port ranges>` 仅扫描指定端口。示例：`-p22`、`-p1-65535`、`-p U:53,111,137,T:21-25,80,139,8080,S:9`
- `--exclude-ports <port ranges>` 排除指定端口
- `-F` 快速模式（扫描比默认更少的端口）
- `-r` 顺序扫描端口（不随机化）
- `--top-ports <number>` 扫描最常用的 number 个端口
- `--port-ratio <ratio>` 扫描出现频率高于 ratio 的端口

## 五、服务/版本检测（Service/Version Detection）

- `-sV` 探测开放端口的服务/版本信息
- `--version-intensity <level>` 设置探测强度（0~9，0 最轻，9 最全）
- `--version-light` 限制为最可能的探测（强度 2）
- `--version-all` 尝试每一个探测（强度 9）
- `--version-trace` 显示详细版本扫描活动（调试）

## 六、脚本扫描（Script Scan）

- `-sC` 等价于 `--script=default`
- `--script=<Lua scripts>` 指定脚本（目录、文件或类别，逗号分隔）
- `--script-args=<n1=v1,[n2=v2,...]>` 为脚本提供参数
- `--script-args-file=filename` 从文件读取 NSE 脚本参数
- `--script-trace` 显示所有收发数据
- `--script-updatedb` 更新脚本数据库
- `--script-help=<Lua scripts>` 显示脚本帮助信息

## 七、操作系统检测（OS Detection）

- `-O` 启用操作系统检测
- `--osscan-limit` 将 OS 检测限制在有希望的目标上
- `--osscan-guess` 更积极地猜测操作系统

## 八、时间和性能（Timing and Performance）

时间参数可带单位：ms（毫秒）、s（秒）、m（分钟）、h（小时）。

- `-T<0-5>` 设置时间模板（数字越大越快）
- `--min-hostgroup <size>` / `--max-hostgroup <size>` 并行主机扫描组大小
- `--min-parallelism <numprobes>` / `--max-parallelism <numprobes>` 探测并行度
- `--min-rtt-timeout <time>` / `--max-rtt-timeout <time>` / `--initial-rtt-timeout <time>` RTT 超时设置
- `--max-retries <tries>` 限制端口扫描探测的重传次数
- `--host-timeout <time>` 超过该时间放弃目标
- `--scan-delay <time>` / `--max-scan-delay <time>` 探测之间的延迟
- `--min-rate <number>` 每秒至少发送 number 个包
- `--max-rate <number>` 每秒最多发送 number 个包

## 九、防火墙/IDS 逃避与欺骗（Evasion and Spoofing）

- `-f` 分片发送数据包
- `--mtu <val>` 使用指定的 MTU 进行分片
- `-D <decoy1,decoy2[,ME],...>` 使用诱饵隐藏扫描源
- `-S <IP_Address>` 伪造源地址
- `-e <iface>` 使用指定网络接口
- `-g` / `--source-port <portnum>` 使用指定源端口
- `--proxies <url1,[url2],...>` 通过 HTTP/SOCKS4 代理中继连接
- `--data <hex string>` 向发送的包附加自定义十六进制负载
- `--data-string <string>` 向发送的包附加自定义 ASCII 字符串
- `--data-length <num>` 向发送的包附加随机数据
- `--ip-options <options>` 发送带有指定 IP 选项的包
- `--ttl <val>` 设置 IP 生存时间（TTL）
- `--spoof-mac <mac address/prefix/vendor name>` 伪造 MAC 地址
- `--badsum` 发送带有错误 TCP/UDP/SCTP 校验和的包

## 十、输出（Output）

- `-oN <file>` 正常格式输出
- `-oX <file>` XML 格式输出
- `-oS <file>` 脚本小子格式输出
- `-oG <file>` Grepable 格式输出
- `-oA <basename>` 同时输出三种主要格式（正常、XML、Grepable）
- `-v` 提高详细程度（`-vv` 或更多可进一步增加）
- `-d` 提高调试级别（`-dd` 或更多）
- `--reason` 显示端口处于特定状态的原因
- `--open` 仅显示开放（或可能开放）的端口
- `--packet-trace` 显示所有发送和接收的包
- `--iflist` 打印主机接口和路由（调试用）
- `--append-output` 追加到输出文件而不是覆盖
- `--resume <filename>` 恢复中断的扫描
- `--noninteractive` 禁止运行时键盘交互
- `--stylesheet <path/URL>` 将 XML 输出转换为 HTML 的 XSL 样式表
- `--webxml` 引用 Nmap.Org 的样式表（更便携的 XML）
- `--no-stylesheet` 不在 XML 输出中关联 XSL 样式表

## 十一、杂项选项（Miscellaneous）

- `-6` 启用 IPv6 扫描
- `-A` 启用 OS 检测、版本检测、脚本扫描和路由追踪
- `--datadir <dirname>` 指定自定义 Nmap 数据文件位置
- `--send-eth` 使用原始以太网帧发送
- `--send-ip` 使用原始 IP 包发送
- `--privileged` 假定用户拥有完全特权
- `--unprivileged` 假定用户缺少原始套接字权限
- `-V` 打印版本号
- `-h` 打印本帮助信息

## 十二、常用示例

```bash
nmap -v -A scanme.nmap.org
nmap -v -sn 192.168.0.0/16 10.0.0.0/8
nmap -v -iR 10000 -Pn -p 80
```

> 📖 更多信息：https://nmap.org/book/man.html
