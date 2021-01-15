import { ISong } from "../../typings";

export interface IProps {
  listData: ISong[];
  showIndex: boolean;
  showMenu: boolean;
  showCollect: boolean;
  showPlay: boolean;
  subscribedCount: number;
}

export interface IMenuProps {
  songCount: number;
  subscribedCount: number;
  showCollect: boolean;
  onClickPlayAll: () => void;
}

export interface IItemProps {
  itemData: ISong,
  index: number;
  showPlay: boolean;
  showIndex: boolean;
  onClickPlay: (index: number) => void;
}
