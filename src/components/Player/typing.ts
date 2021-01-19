import LyricParser from 'plugins/LyricParser';
import { ISong } from '@/typings';

type handleProgressChange = (percent: number) => void;

type toggleFullScreen = (state: boolean) => void;

type toggleCd = (status: boolean) => void;

export interface IPlayerProps {
  song: ISong;
  fullScreen: boolean;
  playingStatus: boolean;
  toggleFullScreen: toggleFullScreen;
  togglePlayingState: (state: boolean) => void;
  toggleShowPlayList: (state: boolean) => void;
}

export interface IFullScreenPlayerProps extends IPlayerProps {
  currentTime: number;
  duration: number;
  percent: number;
  currentLyric: LyricParser;
  currentPlayingLyric: string;
  currentLineNum: number;
  onProgressChange: handleProgressChange;
  onClickNext: () => void;
  onClickPrev: () => void;
}

export interface IFullBackProps {
  picUrl: string;
}

export interface IFullTopProps {
  songName: string; 
  singerName: string;
  toggleFullScreen: toggleFullScreen
}

export interface IFullCdProps {
  ref: any;
  show: boolean;
  picUrl: string;
  playingStatus: boolean,
  currentPlayingLyric: string;
  toggleCd: toggleCd;
}

export interface IFullLyricProps {
  show: boolean;
  currentLyric: LyricParser; 
  currentLineNum: number; 
  toggleCd: toggleCd;
}

export interface IFullControlProps {
  playingStatus: boolean; 
  currentTime: number; 
  duration: number; 
  percent: number;
  togglePlayingState: (state: boolean) => void;
  toggleShowPlayList: (state: boolean) => void;
  onProgressChange: handleProgressChange;
  onClickNext: () => void;
  onClickPrev: () => void;
}

export interface IMiniPlayerProps extends IPlayerProps {}

export interface IPlayListProps {
  listData?: ISong[];
  currentIndex: number;
  onClickPlay: (index: number) => void;
  onClickDelete: (index: number) => void;
}

export interface IPlayListIndexProps extends IPlayListProps {
  toggleShowPlayList: (state: boolean) => void;
  playList: ISong[];
}

export interface IProgressBarProps {
  percent: number;
  onChange: handleProgressChange;
}

export interface IProgressTouchInfo {
  initiated: boolean;
  startX: number;
  left: number;
}

export interface IPlayListTouchInfo {
  initiated: boolean;
  startY: number;
  distance: number;
}

export interface IPosAndScale {
  x: number;
  y: number;
  scale: number;
}
