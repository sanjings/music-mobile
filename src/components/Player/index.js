import React, { memo, useCallback, useRef, useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'

import FullScreenPlayer from './FullScreenPlayer'
import MiniPlayer from './MiniPlayer'
import PlayList from './PlayList'

import { isEmptyObject } from '../../utils/tools'
import { formatSongUrl } from '../../utils/filters'
import { getLyricRequest } from '../../apis/requests/song'
import LyricParser from '../../plugins/LyricParser'
import { actions } from './store'

const { 
  changeFullScreenAction, 
  changePlayingStatusAction, 
  changeShowPlayListAction, 
  changeCurrentIndexAction,
  changeCurrentSongAction,
  deleteSongAction 
} = actions

const Player = () => {
  const fullScreen = useSelector(state => state.player.fullScreen),
        playingStatus = useSelector(state => state.player.playingStatus),
        currentIndex = useSelector(state => state.player.currentIndex),
        currentSong = useSelector(state => state.player.currentSong),
        showPlayList = useSelector(state => state.player.showPlayList),
        playList = useSelector(state => state.player.playList);

  const [preSongId, setPreSongId] = useState(),
        [currentTime, setCurrentTime] = useState(0),
        [duration, setDuration] = useState(0),
        [currentPlayingLyric, setPlayingLyric] = useState('');

  const percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;
  
  const dispatch = useDispatch()

  const audioRef = useRef(),
        currentLyric = useRef(),
        currentLineNum = useRef(0);

  useEffect(() => {
    if (
      !playList.length || 
      !playList[currentIndex] || 
      currentIndex === -1 || 
      playList[currentIndex].id === preSongId) 
    return;
    
    const audioDom = audioRef.current
    const curSong = playList[currentIndex]

    dispatch(changeCurrentSongAction(curSong))
    setPreSongId(curSong.id)
    audioDom.src = formatSongUrl(curSong.id)
    togglePlayingState(true)
    getLyric(curSong.id)
    setCurrentTime(0);
    setDuration((curSong.dt / 1000) || 0)
  }, [currentIndex, playList]);

  useEffect(() => {
    const audioDom = audioRef.current
    playingStatus ? audioDom.play() : audioDom.pause()
  }, [playingStatus]);

  const handleLyric = ({lineNum, txt}) => {
    if (!currentLyric.current) return;
    currentLineNum.current = lineNum;
    setPlayingLyric(txt);
  };

  const getLyric = async (id) => {
    const resp = await getLyricRequest(id),
          lyric = resp.lrc.lyric;
    
    if (!lyric) {
      currentLyric.current = null;
      return;
    }
    currentLyric.current = new LyricParser(lyric, handleLyric)
    currentLyric.current.play();
    currentLineNum.current = 0;
    currentLyric.current.seek(0);
  }

  const toggleFullScreen = useCallback((state) => {
    dispatch(changeFullScreenAction(state))
  }, [])

  const togglePlayingState = useCallback((state) => {
    dispatch(changePlayingStatusAction(state))
    if(currentLyric.current) {
      currentLyric.current.togglePlay(currentTime * 1000);
    }
  }, [currentTime])

  const toggleShowPlayList = useCallback((state) => {
    dispatch(changeShowPlayListAction(state))
  }, [])

  const onClickPrev = useCallback(() => {
    let index = currentIndex - 1
    if (index < 0) {
      index = playList.length - 1
    }
    changeCurrentIndex(index)
  }, [currentIndex])

  const onClickNext = useCallback(() => {
    let index = currentIndex + 1
    if (index === playList.length) {
      index = 0
    }
    changeCurrentIndex(index)
  }, [currentIndex])

  const changeCurrentIndex = index => {
    if (index === currentIndex) return;
    dispatch(changeCurrentIndexAction(index))
  }

  const handleDelete = e => {
    e.stopPropagation();
    const index = Number(e.target.dataset.index)
    dispatch(deleteSongAction(index))
  }

  /**
   * 控制进度条
   * @param {Number} 进度条百分比
   */
  const handleProgressChange = useCallback(percent => {
    const newTime = percent * duration
    setCurrentTime(newTime)
    audioRef.current.currentTime = newTime
    !playingStatus && togglePlayingState(true)
    if(currentLyric.current) {
      currentLyric.current.seek (newTime * 1000);
    }
  }, [duration])

  /**
   * 更新当前时间
   * @param {Event} e 
   */
  const handleUpdateTime = e => {
    setCurrentTime(e.target.currentTime)
  }

  /**
   * 当前歌曲播放完成后的处理函数
   */
  const handlePlayEnd = () => {
    onClickNext()
  }

  return (
    <div className="player">
      {/* 全屏播放器 */}
      {
        !isEmptyObject(currentSong)
        &&
        <FullScreenPlayer 
          fullScreen={fullScreen}
          song={currentSong}
          duration={duration} 
          currentTime={currentTime}
          percent={percent}
          playingStatus={playingStatus}
          currentLyric={currentLyric.current}
          currentPlayingLyric={currentPlayingLyric}
          currentLineNum={currentLineNum.current}
          toggleFullScreen={toggleFullScreen}
          togglePlayingState={togglePlayingState}
          toggleShowPlayList={toggleShowPlayList}
          onProgressChange={handleProgressChange}
          onClickNext={onClickNext} 
          onClickPrev={onClickPrev}
        />
      }

      {/* 底部播放器 */}
      {
        !isEmptyObject(currentSong)
        &&
        <MiniPlayer
          fullScreen={fullScreen} 
          song={currentSong} 
          playingStatus={playingStatus}
          toggleFullScreen={toggleFullScreen}
          togglePlayingState={togglePlayingState}
          toggleShowPlayList={toggleShowPlayList}
        />
      }

      {/* 播放列表 */}
      {
        showPlayList
        &&
        <PlayList
          currentIndex={currentIndex} 
          playList={playList}
          toggleShowPlayList={toggleShowPlayList}
          onClickDelete={handleDelete}
        />
      }
      
      <audio 
        ref={audioRef} 
        autoPlay={true}
        onTimeUpdate={handleUpdateTime}
        onEnded={handlePlayEnd} 
      />
    </div>
  )
}

export default memo(Player)