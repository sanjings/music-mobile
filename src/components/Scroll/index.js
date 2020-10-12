import React,
{
  memo,
  useState,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  forwardRef
} from 'react'
import BScroll from 'better-scroll'

import Loading from '../../components/Loading'
import LoadingV2 from '../../components/LoadingV2'

import { debounce } from '../../utils/tools'

import styles from './index.module.scss'

const Scroll = forwardRef((props, ref) => {
  const {
    click,
    direction,
    bounceTop,
    bounceBottom,
    bounceLeft,
    bounceRight,
    pullDownLoading,
    pullUpLoading,
    children
  } = props

  const { onScroll, onPullDown, onPullUp } = props

  const [bScroll, setBScroll] = useState(null)

  const scrollRef = useRef()

  const pullDownDebounce = useMemo(() => {
    return debounce(onPullDown, 500)
  }, [onPullDown]);

  const pullUpDebounce = useMemo(() => {
    return debounce(onPullUp, 500)
  }, [onPullUp]);

  /**
   * 初始化BScroll
   */
  useEffect(() => {
    const scroll = new BScroll(scrollRef.current, {
      click: click,
      probeType: 3,
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      tap: true,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
        left: bounceLeft,
        right: bounceRight
      }
    })
    setBScroll(scroll)

    return () => {
      setBScroll(null)
    }
  }, [])

  /**
   * 绑定滚动事件
   */
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on('scroll', onScroll)

    return () => {
      bScroll.off('scroll');
    }
  }, [onScroll, bScroll]);

  /**
   * 监听用户顶部下拉动作
   */
  useEffect(() => {
    if (!bScroll || !onPullDown) return;
    const handlePullDown = (pos) => {
      //判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce();
      }
    };
    bScroll.on('touchEnd', handlePullDown);
    return () => {
      bScroll.off('touchEnd', handlePullDown);
    }
  }, [onPullDown, bScroll, pullDownDebounce])

  /**
   * 监听用户上拉动作
   */
  useEffect(() => {
    if (!bScroll || !onPullDown) return;
    const handlePullDown = (pos) => {
      //判断用户的下拉动作
      if (pos.y < bScroll.maxScrollY) {
        pullUpDebounce();
      }
    };
    bScroll.on('touchEnd', handlePullDown);
    return () => {
      bScroll.off('touchEnd', handlePullDown);
    }
  }, [onPullUp, bScroll, pullUpDebounce])

  /**
   * 每次重新渲染组件需刷新BScroll
   */
  useEffect(() => {
    bScroll && bScroll.refresh()
  });

  /**
   * 暴露组件方法
   */
  useImperativeHandle(ref, () => {
    return {
      refresh() {
        if (bScroll) {
          bScroll.refresh()
          bScroll.scrollTo(0, 0)
        }
      },
      getBScroll() {
        if (bScroll) return bScroll
      }
    }
  })

  return (
    <div ref={scrollRef} className={styles['scroll-wrapper']}>
      { children}
      { pullDownLoading && <div className={styles['pulldown-loading']}><Loading /></div>}
      { pullUpLoading && <div className={styles['pullup-loading']}><LoadingV2 label="加载中" /></div>}
    </div>
  )
})

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  bounceTop: true,
  bounceBottom: true,
  bounceLeft: true,
  bounceRight: true,
};

export default memo(Scroll)