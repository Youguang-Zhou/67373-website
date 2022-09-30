# 67373 API 文档

目录：

[1. 获取所有的视频](#1)

[2. 获取单个视频的播放信息](#2)

[3. 获取推荐视频](#3)

[4. 获取所有的音频](#4)

[5. 搜索视频或歌曲](#5)

[6. 获取单个音频的歌词](#6)

[7. 附录](#7)

&emsp; [7.1. 视频分类](#7.1)

<h2 id="1">1. 获取所有的视频</h2>

-   **接口说明：** 获取所有的视频（不包含播放地址）

-   **接口地址：** /api/videos

### 请求参数

| 参数名称 | 类型   | 是否必选 | 描述                                            |
| :------- | :----- | :------- | :---------------------------------------------- |
| cateId   | string | 否       | 视频分类 id，默认获取[所有分类](#7.1)下的视频。 |
| pageNo   | string | 否       | 当前页码。默认值为 1。                          |
| pageSize | string | 否       | 列表页大小，可选。默认值为 12，最大值为 100。   |

### 返回示例

```
{
    "requestId": "A40F59BC-668E-5B05-8827-449922F000DA",
    "total": 492,
    "videoList": {
        "video": [

            ...

            {
                "creationTime": "2021-09-12T08:31:24Z",
                "status": "Normal",
                "storageLocation": "outin-2a4a898d8cd611ebaae800163e1a3b4a.oss-cn-shanghai.aliyuncs.com",
                "cateId": 1000326521,
                "videoId": "cc718e5255f849c988d467709a8478a1",
                "modificationTime": "2021-09-12T09:25:00Z",
                "snapshots": {
                    "snapshot": [
                        "https://vod.67373upup.com/cc718e5255f849c988d467709a8478a1/snapshots/b4a8675a6cb94b2097e2d932135a6f48-00001.jpg",
                        ...
                    ]
                },
                "cateName": "视频-唱歌视频",
                "description": "搬运自油管频道“最愛陈一发儿”。",
                "appId": "app-1000000",
                "size": 75977472,
                "coverURL": "https://vod.67373upup.com/image/cover/B39E8B70B4EE4627A3204548DA31FD7C-6-2.png",
                "duration": 263.292,
                "title": "童话镇"
            },

            ...

        ]
    }
}
```

<h2 id="2">2. 获取单个视频的播放信息</h2>

-   **接口说明：** 获取单个视频的播放信息（包含播放地址）

-   **接口地址：** /api/videos/{id}

### 请求参数

| 参数名称 | 类型   | 是否必选 | 描述      |
| :------- | :----- | :------- | :-------- |
| id       | string | 是       | 视频 id。 |

### 返回示例

```
{
    "playInfo": [
        {
            "status": "Normal",
            "creationTime": "2021-09-12T08:31:24Z",
            "specification": "Original",
            "narrowBandType": "0",
            "height": 1080,
            "bitrate": "2308.54",
            "modificationTime": "2021-09-12T08:31:24Z",
            "encrypt": 0,
            "definition": "OD",
            "streamType": "video",
            "jobId": "cc718e5255f849c988d467709a8478a102",
            "size": 75977476,
            "width": 1916,
            "fps": "30",
            "duration": "263.292",
            "playURL": "https://vod.67373upup.com/sv/2f730ff4-17bd921ecde/2f730ff4-17bd921ecde.mp4",
            "format": "mp4"
        }
    ],
    "requestId": "73CA0992-62C4-5E4F-BB65-74D77463145C",
    "videoInfo": {
        "status": "Normal",
        "creationTime": "2021-09-12T08:31:24Z",
        "storageLocation": "outin-2a4a898d8cd611ebaae800163e1a3b4a.oss-cn-shanghai.aliyuncs.com",
        "cateId": 1000326521,
        "modificationTime": "2021-09-12T09:25:00Z",
        "description": "搬运自油管频道“最愛陈一发儿”。",
        "appId": "app-1000000",
        "coverURL": "https://vod.67373upup.com/image/cover/B39E8B70B4EE4627A3204548DA31FD7C-6-2.png",
        "templateGroupId": "VOD_NO_TRANSCODE",
        "auditStatus": "Init",
        "videoId": "cc718e5255f849c988d467709a8478a1",
        "snapshots": {
            "snapshot": [
                "https://vod.67373upup.com/cc718e5255f849c988d467709a8478a1/snapshots/b4a8675a6cb94b2097e2d932135a6f48-00001.jpg",
                ...
            ]
        },
        "regionId": "cn-shanghai",
        "cateName": "唱歌视频",
        "size": 75977472,
        "duration": 263.292,
        "title": "童话镇"
    }
}
```

<h2 id="3">3. 获取推荐视频</h2>

-   **接口说明：** 获取推荐视频

-   **接口地址：** /api/videos/recomm

### 请求参数

| 参数名称 | 类型   | 是否必选 | 描述             |
| :------- | :----- | :------- | :--------------- |
| title    | string | 是       | 视频标题。       |
| cateName | string | 是       | 视频分类名。     |
| videoId  | string | 是       | 视频 id。        |
| num      | string | 是       | 返回结果的数量。 |

### 返回示例

```
{
    "requestId": "E3B49F84-0EF9-541F-ADB2-2F792395C9C5",
    "videoList": [

        ...

        {
            "status": "Normal",
            "creationTime": "2021-09-12T08:31:13Z",
            "storageLocation": "outin-2a4a898d8cd611ebaae800163e1a3b4a.oss-cn-shanghai.aliyuncs.com",
            "cateId": 1000326521,
            "videoId": "6b49371c3a994dfaa4c0269ba923929e",
            "modificationTime": "2021-09-12T09:25:00Z",
            "snapshots": [
                "https://vod.67373upup.com/6b49371c3a994dfaa4c0269ba923929e/snapshots/d9e65243d1b94b7fa1882a6164cd5965-00001.jpg",
                ...
            ],
            "cateName": "唱歌视频",
            "description": "搬运自油管频道“最愛陈一发儿”。",
            "appId": "app-1000000",
            "size": 84806496,
            "coverURL": "https://vod.67373upup.com/image/cover/6781F2A3FDB9437FA815561DA113AE12-6-2.png",
            "templateGroupId": "VOD_NO_TRANSCODE",
            "duration": 272.03,
            "title": "爆刘继芬"
        },

        ...

    ]
}
```

<h2 id="4">4. 获取所有的音频</h2>

-   **接口说明：** 获取所有的音频（包含播放地址）

-   **接口地址：** /api/audios

### 请求参数

| 参数名称 | 类型   | 是否必选 | 描述                                          |
| :------- | :----- | :------- | :-------------------------------------------- |
| pageNo   | string | 否       | 当前页码。默认值为 1。                        |
| pageSize | string | 否       | 列表页大小，可选。默认值为 12，最大值为 100。 |

### 返回示例

```
{
    "requestId": "191790C9-FD12-5B9F-BE28-57C17C20A35F",
    "total": 32,
    "videoList": {
        "video": [

            ...

            {
                "creationTime": "2021-07-13T09:12:59Z",
                "status": "Normal",
                "storageLocation": "outin-2a4a898d8cd611ebaae800163e1a3b4a.oss-cn-shanghai.aliyuncs.com",
                "cateId": 1000309090,
                "videoId": "c9d1966649c343d3b39c0b935dc64746",
                "modificationTime": "2021-07-13T09:31:15Z",
                "snapshots": {
                    "snapshot": [
                        "https://vod.67373upup.com/c9d1966649c343d3b39c0b935dc64746/snapshots/b3f04e5968504cdaa129fbc6799e899b-00001.jpg"
                    ]
                },
                "cateName": "音乐",
                "description": "https://vod.67373upup.com/sv/3e324f06-17a9f241494/3e324f06-17a9f241494.mp3",
                "appId": "app-1000000",
                "size": 8102109,
                "coverURL": "https://vod.67373upup.com/c9d1966649c343d3b39c0b935dc64746/snapshots/b3f04e5968504cdaa129fbc6799e899b-00001.jpg",
                "duration": 257.976,
                "title": "童话镇"
            },

            ...

        ]
    }
}
```

<h2 id="5">5. 搜索视频或歌曲</h2>

-   **接口说明：** 搜索视频或歌曲

-   **接口地址：** /api/search

### 请求参数

| 参数名称 | 类型   | 是否必选 | 描述         |
| :------- | :----- | :------- | :----------- |
| query    | string | 是       | 查询字符串。 |

### 返回示例

```
{
    "mediaList": [

        ...

        {
            "creationTime": "2021-09-05T07:48:16Z",
            "video": {
                "creationTime": "2021-09-05T07:48:16Z",
                "cateId": 1000326521,
                "coverURL": "https://vod.67373upup.com/e687854518b442e2a1febe7185aa9cdf/snapshots/9db62d5dda4a4d30abf8eeba6c90d0fe-00002.jpg",
                "videoId": "e687854518b442e2a1febe7185aa9cdf",
                "cateName": "视频-唱歌视频",
                "duration": 262.549,
                "title": "童话镇"
            },
            "attachedMedia": {},
            "image": {},
            "mediaType": "video",
            "audio": {},
            "mediaId": "e687854518b442e2a1febe7185aa9cdf"
        },

        ...

    ],
    "requestId": "D5F735DB-4855-5CFD-ACC1-AA691DD884E6",
    "scrollToken": "282cafe9a1e43f97c42f14b786d1f3c7",
    "total": 19
}
```

<h2 id="6">6. 根据标签搜索游戏直播回放</h2>

-   **接口说明：** 搜索游戏直播回放

-   **接口地址：** /api/searchGame

### 请求参数

| 参数名称 | 类型   | 是否必选 | 描述         |
| :------- | :----- | :------- | :----------- |
| tag      | string | 是       | 查询字符串。 |

### 返回示例

```
{
    "mediaList": [

        ...

        {
            "creationTime": "2022-09-28T23:42:09Z",
            "video": {
                cateId: 1000326522
                cateName: "视频-直播回放"
                coverURL: "https://vod.67373upup.com/image/cover/68FAF48511D74E4F84A93C8376D40533-6-2.png"
                creationTime: "2022-09-28T23:42:09Z"
                description: "油管地址: https://www.youtube.com/watch?v=LO37DSYYiLQ"
                duration: 24693.238
                title: "[2022-09-28] 《战神4》（第二期）高端女玩家の《战神4》大结局！ GAME NIGHT～"
                videoId: "2009fb362e204ee4b0e7ae5d13173427"
            },
            "attachedMedia": {},
            "image": {},
            "mediaType": "video",
            "audio": {},
            "mediaId": "e687854518b442e2a1febe7185aa9cdf"
        },

        ...

    ],
    "requestId": "8395F67E-9B66-5A30-832D-C821BA580369"
    "scrollToken": "7f360d71a027922f7ef554c2296d1ee9"
    "total": 2
}
```

<h2 id="7">7. 获取单个音频的歌词</h2>

-   **接口说明：** 获取单个音频的歌词

-   **接口地址：** /api/lyrics/{id}

### 请求参数

| 参数名称 | 类型   | 是否必选 | 描述      |
| :------- | :----- | :------- | :-------- |
| id       | string | 是       | 音频 id。 |

### 返回示例

```
{
    "lyrics": [

        ...

        "[01:03.84] 总有一条蜿蜒在童话镇里七彩的河",
        "[01:11.00] 沾染魔法的乖张气息",
        "[01:14.51] 却又在爱里曲折",
        "[01:17.98] 川流不息扬起水花",
        "[01:20.97] 又卷入一帘时光入水",
        "[01:24.89] 让所有很久很久以前",
        "[01:28.07] 都走到幸福结局的时刻",

        ...

    ]
}
```

<h2 id="8">8. 附录</h2>

<h3 id="8.1">8.1. 视频分类</h3>

| 分类名称       | 分类 id    |
| :------------- | :--------- |
| 唱歌视频       | 1000326521 |
| 直播回放       | 1000326522 |
| 直播剪辑       | 1000326523 |
| 茶话会文字视频 | 1000326524 |
| 游戏视频       | 1000326525 |
| 日常           | 1000326526 |
