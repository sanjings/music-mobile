import React, { 
  memo, 
  useCallback, 
  useRef, 
  useEffect, 
  useState, 
  FC, 
  ReactElement, 
  BaseSyntheticEvent 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FullScreenPlayer from './FullScreenPlayer';
import MiniPlayer from './MiniPlayer';
import PlayList from './PlayList';

import { isEmptyObject } from '../../utils/tools';
import { formatSongUrl } from '../../utils/formats';
import { getLyricRequest } from '../../apis/requests/song';
import LyricParser, { IHandler } from '../../plugins/LyricParser';
import { actions } from './store';
import { IStoreState } from '../../store';
import { ISong } from '../../typings';

const {
  changeFullScreenAction,
  changePlayingStatusAction,
  changeShowPlayListAction,
  changeCurrentIndexAction,
  changeCurrentSongAction,
  deleteSongAction
} = actions;

const Player: FC = (): ReactElement => {
  const { fullScreen, playingStatus, currentIndex, currentSong, showPlayList, playList } = useSelector(
    (state: IStoreState) => ({
      fullScreen: state.player.fullScreen,
      playingStatus: state.player.playingStatus,
      currentIndex: state.player.currentIndex,
      currentSong: state.player.currentSong,
      showPlayList: state.player.showPlayList,
      playList: state.player.playList
    })
  );

  const [preSongId, setPreSongId] = useState<number>(),
        [currentTime, setCurrentTime] = useState<number>(0),
        [duration, setDuration] = useState<number>(0),
        [currentPlayingLyric, setPlayingLyric] = useState<string>('');

  const percent: number = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const audioRef = useRef<HTMLAudioElement | null>(null),
        currentLyric = useRef<LyricParser | null>(null),
        currentLineNum = useRef<number>(0);

  const dispatch = useDispatch();

  useEffect((): void => {
    if (
      !playList.length || 
      !playList[currentIndex] || 
      currentIndex === -1 || 
      playList[currentIndex].id === preSongId
    ) return;

    const audioDom = audioRef.current;
    const curSong = playList[currentIndex];

    dispatch(changeCurrentSongAction(curSong));
    setPreSongId(curSong.id);
    audioDom!.src = formatSongUrl(curSong.id);
    togglePlayingState(true);
    getLyric(curSong.id);
    setCurrentTime(0);
    setDuration(curSong.dt / 1000 || 0);
  }, [currentIndex, playList]);

  useEffect((): void => {
    const audioDom = audioRef.current;
    playingStatus ? audioDom!.play() : audioDom!.pause();
  }, [playingStatus]);

  /**
   * 获取当前进度歌词
   * @param param
   */
  const handleLyric: IHandler = ({ lineNum, txt }) => {
    if (!currentLyric.current) return;
    currentLineNum.current = lineNum;
    setPlayingLyric(txt);
  };

  /**
   * 获取歌词
   * @param id 
   */
  const getLyric = async (id: number) => {
    const resp: any = await getLyricRequest(id),
          lyric = resp.lrc ? resp.lrc.lyric : null;

    if (!lyric) {
      currentLyric.current = null;
      return;
    }
    currentLyric.current = new LyricParser(lyric, handleLyric);
    currentLyric.current.play();
    currentLineNum.current = 0;
    currentLyric.current.seek(0);
  };

  /**
   * 切换全屏
   */
  const toggleFullScreen = useCallback((state: boolean): void => {
    dispatch(changeFullScreenAction(state));
  }, []);

  /**
   * 暂停/播放歌曲
   */
  const togglePlayingState = useCallback((state: boolean): void => {
    dispatch(changePlayingStatusAction(state));
    if (currentLyric.current) {
      currentLyric.current.togglePlay(currentTime * 1000);
    }
  }, [currentTime]);

  /**
   * 隐藏显示播放列表
   */
  const toggleShowPlayList = useCallback((state: boolean): void => {
    dispatch(changeShowPlayListAction(state));
  }, []);

  /**
   * 切换上一首
   */
  const onClickPrev = useCallback((): void => {
    let index: number = currentIndex - 1;
    if (index < 0) {
      index = playList.length - 1;
    }
    changeCurrentIndex(index);
  }, [currentIndex]);

  /**
   * 切换下一首
   */
  const onClickNext = useCallback((): void => {
    let index: number = currentIndex + 1;
    if (index === playList.length) {
      index = 0;
    }
    changeCurrentIndex(index);
  }, [currentIndex]);

  /**
   * 切换歌曲
   * @param index 
   */
  const changeCurrentIndex = (index: number): void => {
    if (index === currentIndex) return;
    dispatch(changeCurrentIndexAction(index));
  };

  /**
   * 删除歌曲
   * @param index 
   */
  const handleDelete = (index: number): void => {
    dispatch(deleteSongAction(index));
  };

  /**
   * 播放歌曲
   * @param index 
   */
  const handleClickPlay = (index: number): void => {
    changeCurrentIndex(index);
  };

  /**
   * 控制进度条
   * @param {Number} 进度条百分比
   */
  const handleProgressChange = useCallback((percent: number): void => {
    const newTime: number = percent * duration;
    setCurrentTime(newTime);
    audioRef.current!.currentTime = newTime;
    !playingStatus && togglePlayingState(true);
    if (currentLyric.current) {
      currentLyric.current.seek(newTime * 1000);
    }
  }, [duration]);

  /**
   * 更新当前时间
   * @param {Event} e
   */
  const handleUpdateTime = (e: BaseSyntheticEvent): void => {
    setCurrentTime(e.target.currentTime);
  };

  /**
   * 当前歌曲播放完成后的处理函数
   */
  const handlePlayEnd = (): void => {
    onClickNext();
  };

  return (
    <div className="player">
      {/* 全屏播放器 */}
      {!isEmptyObject(currentSong) && (
        <FullScreenPlayer
          fullScreen={fullScreen}
          song={currentSong as ISong}
          duration={duration}
          currentTime={currentTime}
          percent={percent}
          playingStatus={playingStatus}
          currentLyric={currentLyric.current as LyricParser}
          currentPlayingLyric={currentPlayingLyric}
          currentLineNum={currentLineNum.current}
          toggleFullScreen={toggleFullScreen}
          togglePlayingState={togglePlayingState}
          toggleShowPlayList={toggleShowPlayList}
          onProgressChange={handleProgressChange}
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
        />
      )}

      {/* 底部播放器 */}
      {!isEmptyObject(currentSong) && (
        <MiniPlayer
          fullScreen={fullScreen}
          song={currentSong as ISong}
          playingStatus={playingStatus}
          toggleFullScreen={toggleFullScreen}
          togglePlayingState={togglePlayingState}
          toggleShowPlayList={toggleShowPlayList}
        />
      )}

      {/* 播放列表 */}
      {showPlayList && (
        <PlayList
          currentIndex={currentIndex}
          playList={playList}
          toggleShowPlayList={toggleShowPlayList}
          onClickDelete={handleDelete}
          onClickPlay={handleClickPlay}
        />
      )}

      {/* H5音频播放器元素 */}
      <audio 
        ref={audioRef} 
        autoPlay={true} 
        onTimeUpdate={handleUpdateTime} 
        onEnded={handlePlayEnd}
      />
    </div>
  );
};

export default memo(Player);
