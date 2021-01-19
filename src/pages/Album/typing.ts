import { ISong } from "@/typings";

export interface IHeaderProps {
  ref: any;
  title: string;
  isTitleMarquee: boolean;
  onClickBack: () => void;
}

export interface IAlbumProps {
  subscribedCount: number;
  name: string; 
  creator: IAlbumCreator;
  coverImgUrl: string;
}

export interface IAlbumDetailProps extends IAlbumProps {
  tracks: ISong[];
}

export interface IAlbumCreator {
  avatarUrl: string;
  nickname: string;
}