import React, { FC, memo, ReactElement, useRef, MouseEvent } from 'react';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';

import { formatSingerName } from '../../../utils/formats';

import styles from './index.module.scss';
import { IMiniPlayerProps } from '../typing';

const MiniPlayer: FC<IMiniPlayerProps> = ({
  song: { name, album, singers },
  fullScreen,
  playingStatus = false,
  toggleFullScreen,
  togglePlayingState,
  toggleShowPlayList
}): ReactElement => {
  const miniPlayerRef = useRef<HTMLDivElement | null>(null);

  /**
   * 歌曲播放/暂停
   * @param {Event} e
   */
  const handleTogglePlayStatus = (e: MouseEvent): void => {
    e.stopPropagation();
    togglePlayingState(!playingStatus);
  };

  /**
   * 显示播放列表
   * @param {Event} e
   */
  const handleShowPlayList = (e: MouseEvent): void => {
    e.stopPropagation();
    toggleShowPlayList(true);
  };

  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      appear={true}
      classNames="mini"
      onEnter={() => {
        miniPlayerRef.current!.style.display = 'flex';
      }}
      onExited={() => {
        miniPlayerRef.current!.style.display = 'none';
      }}
    >
      <div
        ref={miniPlayerRef}
        className={styles['mini-player']}
        onClick={() => toggleFullScreen(true)}
      >
        <div className={classnames(styles['img-wrap'], !playingStatus && styles['pause'])}>
          <img
            className={styles['cover']}
            src={album.picUrl + '?param=100y100'}
            width="40"
            height="40"
          ></img>
        </div>
        <div className={styles['text']}>
          <p className={styles['name']}>{name}</p>
          <p className={styles['singer']}>{formatSingerName(singers)}</p>
        </div>
        <div className={styles['control']} onClick={handleTogglePlayStatus}>
          {
            playingStatus 
            ? (
              <i className="iconfont icon-pause-circle"></i>
            ) 
            : 
            (
              <i className="iconfont icon-play-circle"></i>
            )
          }
        </div>
        <div onClick={handleShowPlayList} className={styles['control']}>
          <i className="iconfont icon-gedan"></i>
        </div>
      </div>
    </CSSTransition>
  );
};

export default memo(MiniPlayer);
