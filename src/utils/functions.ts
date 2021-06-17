import moment from 'moment'

// 格式化duration，单位是秒
export const formatDuration = (duration: number): string => {
	const time = moment.utc(duration * 1000)
	return time.hour() == 0 ? time.format('mm:ss') : time.format('HH:mm:ss')
}

// hh:mm:ss格式转为毫秒
export const durationToSeconds = (hh_mm_ss: string): number => moment.duration(hh_mm_ss).asSeconds()

// 最长公共子序列
export const LongestCommonSubsequence = (key: string, str: string): number[] => {
	const n = key.length
	const m = str.length
	const dp = Array.from(new Array(n + 1), () => new Array(m + 1).fill(0))
	const indexes: number[] = []
	for (let i = 1; i <= n; i++) {
		for (let j = 1; j <= m; j++) {
			if (key[i - 1].toLowerCase() === str[j - 1].toLowerCase()) {
				dp[i][j] = dp[i - 1][j - 1] + 1
				if (!indexes.includes(j - 1)) {
					indexes.push(j - 1)
				}
			} else {
				dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j])
			}
		}
	}
	return indexes
}
