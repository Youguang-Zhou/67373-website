import React from 'react'

const TermsOfUsePage = () => (
	<main className="flex-col px-4 flex-center md:px-0">
		<h1 className="py-4 text-2xl md:text-4xl">67373UPUP网站使用条款</h1>
		<section className="space-y-8">
			<div>
				<p>
					67373upup.com网站（以下称作“本网站”）是一个由粉丝自发组织的、非盈利性质的视频网站。
				</p>
				<p>本网站搬运、上传、播放了陈一发儿的视频，但均未获得陈一发儿本人的许可。</p>
				<p>如有任何侵权视频，请联系本网站删除。</p>
			</div>
			<div>
				<p>
					如果您在使用本网站的过程中遇到了任何bug、或者服务器崩溃的情况，请立即联系本网站。
				</p>
				<p>同时也欢迎各位水友提供关于网站建设的意见和建议！</p>
				<p>
					本网站
					<button
						className="px-1 text-primary"
						onClick={() => open('https://github.com/Youguang-Zhou/67373-website')}
					>
						前端源代码
					</button>
					已经在GitHub上开源，欢迎程序员水友一起交流和学习！
				</p>
			</div>
			<div>
				<p>联系方式：微博私信@青山多妩媚67373</p>
			</div>
			<div className="flex flex-col items-end">
				<p>67373代码部</p>
				<p>2021年12月31日</p>
			</div>
		</section>
	</main>
)

export default TermsOfUsePage
