// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = '我的博客-ypc';
export const SITE_DESCRIPTION = '正在无限学习中~';

// 统一处理 base 路径（GitHub Pages 部署在 /boke/ 子路径下）
// 用法：path('/blog') -> '/boke/blog'
export function path(p: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
	return `${base}${p}`;
}
