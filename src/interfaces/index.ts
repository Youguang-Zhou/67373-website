export interface IVideo {
	AppId: string
	CateId: number
	CateName: string
	CommentsNum: number
	CoverURL: string
	CreateTime: string
	CreationTime: string
	Duration: number
	ModificationTime: string
	ModifyTime: string
	Size: number
	Snapshots: {
		Snapshot: Array<string>
	}
	Status: string
	StorageLocation: string
	Title: string
	VideoId: string
}
