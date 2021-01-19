import { ISinger } from "../../typings";
import { IAlpha } from "../../typings/localData";

export interface IListProps {
  listData: Array<ISinger>;
}

export interface ITabProps {
  currentType: string; 
  listData: IAlpha[];
  onItemClick: (type: string) => void;
}