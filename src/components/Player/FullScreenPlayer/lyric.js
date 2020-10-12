import React, { memo, useEffect, useRef, createRef } from "react"
import classnames from 'classnames'

import Scroll from '../../../components/Scroll'

import styles from './lyric.module.scss'

const Lyric = props => {
  const { currentLyric, currentLineNum } = props

  const { toggleCd } = props

  const scrollRef = useRef(),
        lyricLineRefs = useRef([]);

  useEffect(() => {
    if (!scrollRef.current) return;

    const bScroll = scrollRef.current.getBScroll()
    if (!bScroll) return ;
    if (currentLineNum > 5) {
      const curLineDom = lyricLineRefs.current[currentLineNum - 5].current
      bScroll.scrollToElement(curLineDom, 1000);
    } else {
      bScroll.scrollTo(0, 0, 200)
    }
  }, [currentLineNum])

  return (
    <div className={styles['lyric-wrapper']} onClick={() => toggleCd(true)}>
      <Scroll ref={scrollRef}>
        <div className={styles['lyric-list']}>
          {
            currentLyric.lines.map((item, index) => {
              lyricLineRefs.current[index] = createRef();
              return (
                <p
                  ref={lyricLineRefs.current[index]} 
                  className={classnames([styles['lyric-item'], index === currentLineNum && styles['highlight']])} 
                  key={item.time}
                >
                  { item.txt }
                </p> 
              )
            })
          }
        </div>
      </Scroll>
    </div>
  )
}

export default memo(Lyric)