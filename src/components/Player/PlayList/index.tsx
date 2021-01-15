import React, { 
  memo, 
  useCallback, 
  useState, 
  useRef, 
  FC, 
  ReactElement,
  TouchEvent 
} from 'react';
import { CSSTransition } from 'react-transition-group';

import Scroll from '../../../components/Scroll';
import List from './list';

import styles from './index.module.scss';
import { IPlayListIndexProps, IPlayListTouchInfo } from '../typing';
import { IPosition } from '../../Scroll/typing';

const PlayList: FC<IPlayListIndexProps> = ({
  playList = [],
  currentIndex = 0,
  toggleShowPlayList,
  onClickPlay,
  onClickDelete
}): ReactElement => {
  const [show, setShow] = useState<boolean>(true);
  const [canTouch, setCanTouch] = useState<boolean>(true);
  const [touchInfo, setTouchInfo] = useState<IPlayListTouchInfo>({
    initiated: false,
    startY: 0,
    distance: 0
  });

  const listRef = useRef<HTMLDivElement>(null);

  /**
   * bScroll滚动事件回调
   */
  const handleScroll = useCallback((pos: IPosition): void => {
    setCanTouch(pos.y === 0);
  }, []);

  /**
   * 列表容器touchStart事件
   * @param {Event} e
   */
  const handleTouchStart = (e: TouchEvent): void => {
    if (!canTouch || touchInfo.initiated) return;
    listRef.current!.style['transition'] = '';
    setTouchInfo({
      initiated: true,
      startY: e.nativeEvent.touches[0].pageY,
      distance: 0
    });
  };

  /**
   * 列表容器touchMove事件
   * @param {Event} e
   */
  const handleTouchMove = (e: TouchEvent): void => {
    if (!canTouch || !touchInfo.initiated) return;

    const distance: number = e.nativeEvent.touches[0].pageY - touchInfo.startY;
    if (distance < 0) return;
    setTouchInfo(preTouchInfo => ({
      ...preTouchInfo,
      distance
    }));
    listRef.current!.style.transform = `translate3d(0, ${distance}px, 0)`;
  };

  /**
   * 列表容器touchEnd事件
   */
  const handleTouchEnd = (): void => {
    setTouchInfo(preTouchInfo => ({
      ...preTouchInfo,
      initiated: false
    }));

    if (touchInfo.distance >= 150) {
      setShow(false);
    } else {
      listRef.current!.style.transition = `all .3s`;
      listRef.current!.style.transform = `translate3d(0, 0, 0)`;
    }
  };

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="move"
      onExited={() => toggleShowPlayList(false)}
    >
      <div className={styles['play-list']}>
        {/* 遮蔽层 */}
        <div className={styles['mask']} onClick={() => setShow(false)}></div>

        {/* 歌曲列表 */}
        <div
          className={styles['list-wrap']}
          ref={listRef}
          onClick={e => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* 表头 */}
          <div className={styles['list-header']}>
            <div className={styles['play-mode']}>
              <i className="iconfont icon-loop" />
              <span>顺序播放</span>
            </div>
          </div>
          {/* 滚动列表 */}
          <div className={styles['list-scroll-wrap']}>
            <Scroll onScroll={handleScroll}>
              <List
                listData={playList}
                currentIndex={currentIndex}
                onClickDelete={onClickDelete}
                onClickPlay={onClickPlay}
              />
            </Scroll>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default memo(PlayList);
