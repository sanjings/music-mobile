export interface ISong {
  id: number;
  name: string;
  album: IAlbum;
  singers: ISinger[];
  dt: number;
}

export interface IAlbum {
  id: number;
  name: string;
  picUrl: string;
}

export interface ISinger {
  id: number;
  name: string;
  picUrl: string;
}
