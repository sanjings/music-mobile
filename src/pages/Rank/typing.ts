export interface ICoverProps {
  coverImgUrl: string;
  updateFrequency: string;
}

export interface IRankTrack {
  first: string;
  second: string;
}

export interface IRankItem extends ICoverProps {
  id: number;
  tracks?: IRankTrack[]
}

export interface IRankListProps {
  listData: Array<IRankItem>;
}