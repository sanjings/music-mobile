import { BScrollInstance } from 'better-scroll';
import { ReactNode } from 'react';

export interface IProps {
  ref?: any;
  direction?: 'horizontal' | 'vertical';
  click?: boolean;
  bounceTop?: boolean;
  bounceBottom?: boolean;
  bounceLeft?: boolean;
  bounceRight?: boolean;
  pullDownLoading?: boolean;
  pullUpLoading?: boolean;
  onScroll?: (pos: IPosition) => void;
  onPullDown?: () => void;
  onPullUp?: () => void;
  children?: ReactNode;
}

export interface IScrollInstance {
  refresh: () => void;
  getBScroll: () => BScrollInstance | undefined;
}

export interface IPosition {
  x: number;
  y: number;
}
