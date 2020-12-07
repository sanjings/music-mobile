import React, { memo, useEffect, useRef, createRef } from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Scroll from 'components/Scroll';

import styles from './lyric.module.scss';

const Lyric = props => {
  const { show, currentLyric, currentLineNum } = props;

  const { toggleCd } = props;

  const scrollRef = useRef(),
        lyricLineRefs = useRef([]);

  /**
   * 根据歌曲播放进度，滚动至相应的歌词
   */
  useEffect(() => {
    if (!scrollRef.current) return;

    const bScroll = scrollRef.current.getBScroll()
    if (!bScroll) return ;
    if (currentLineNum > 6) {
      const curLineDom = lyricLineRefs.current[currentLineNum - 6].current
      bScroll.scrollToElement(curLineDom, 1000);
    } else {
      bScroll.scrollTo(0, 0, 200)
    }
  }, [currentLineNum])

  return (
    <div
      style={{display: show ? 'block' : 'none'}} 
      className={styles['lyric-wrap']} 
      onClick={() => toggleCd(true)}
    >
      <Scroll ref={scrollRef}>
        <div className={styles['lyric-list']}>
          {
            currentLyric
            ?
            currentLyric.lines.map((item, index) => {
              lyricLineRefs.current[index] = createRef();
              return (
                <p
                  ref={lyricLineRefs.current[index]} 
                  className={classnames(styles['lyric-item'], index === currentLineNum && styles['highlight'])} 
                  key={index}
                >
                  { item.txt }
                </p> 
              )
            })
            :
            <p className={styles['no-lyric']}>纯音乐，暂无歌词</p>
          }
        </div>
      </Scroll>
    </div>
  )
}

Lyric.defaultProps = {
  show: true
}

Lyric.propTypes = {
  show: PropTypes.bool,
  toggleCd: PropTypes.func
}

export default memo(Lyric)