import React, { memo, useEffect, useRef, createRef, FC, ReactElement } from 'react';
import classnames from 'classnames';

import Scroll from 'components/Scroll';

import styles from './lyric.module.scss';
import { IFullLyricProps } from '../typing';
import { IScrollInstance } from 'components/Scroll/typing';

const Lyric: FC<IFullLyricProps> = ({ 
  show = true, 
  currentLyric, 
  currentLineNum, 
  toggleCd 
}): ReactElement => {
  const scrollRef = useRef<IScrollInstance>(null),
        lyricLineRefs = useRef<any>([]);

  /**
   * 根据歌曲播放进度，滚动至相应的歌词
   */
  useEffect((): void => {
    if (!scrollRef.current) return;

    const bScroll = scrollRef.current!.getBScroll();
    if (!bScroll) return;
    if (currentLineNum > 6) {
      const curLineDom = lyricLineRefs.current[currentLineNum - 6].current;
      bScroll.scrollToElement(curLineDom, 1000, false, false);
    } else {
      bScroll.scrollTo(0, 0, 200);
    }
  }, [currentLineNum]);

  return (
    <div
      style={{ display: show ? 'block' : 'none' }}
      className={styles['lyric-wrap']}
      onClick={() => toggleCd(true)}
    >
      <Scroll ref={scrollRef}>
        <div className={styles['lyric-list']}>
          {
            currentLyric 
            ? 
            (
              currentLyric.lines.map((item, index) => {
              lyricLineRefs.current[index] = createRef();
                return (
                  <p
                    ref={lyricLineRefs.current[index]}
                    className={classnames(
                      styles['lyric-item'],
                      index === currentLineNum && styles['highlight']
                    )}
                    key={index}
                  >
                    {item.txt}
                  </p>
                );
              })
            ) 
            : (
              <p className={styles['no-lyric']}>纯音乐，暂无歌词</p>
            )
          }
        </div>
      </Scroll>
    </div>
  );
};

export default memo(Lyric);
