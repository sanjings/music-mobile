import React, {
  memo,
  useState,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  forwardRef,
  FC,
  ReactElement
} from 'react';
import BScroll, { BScrollInstance, Options } from 'better-scroll';

import LoadingV3 from '../../components/LoadingV3';
import LoadingV2 from '../../components/LoadingV2';

import { debounce } from '../../utils/tools';

import styles from './index.module.scss';
import { IPosition, IProps, IScrollInstance } from './typing';

const Scroll: FC<IProps> = forwardRef(({ 
  direction = 'vertical',
  click = true,
  bounceTop = true,
  bounceBottom = true,
  bounceLeft = true,
  bounceRight = true,
  pullDownLoading = false,
  pullUpLoading = false,
  children,
  onScroll = () => {},
  onPullDown = () => {},
  onPullUp = () => {}
}, ref ): ReactElement => {
    const [bScroll, setBScroll] = useState<BScrollInstance | null>(null);

    const scrollRef = useRef<HTMLDivElement>(null);

    const pullDownDebounce = useMemo(() => {
      return debounce(onPullDown, 500);
    }, [onPullDown]);

    const pullUpDebounce = useMemo(() => {
      return debounce(onPullUp, 500);
    }, [onPullUp]);

    /**
     * 初始化BScroll
     */
    useEffect(() => {
      const scroll = new BScroll<Options>(scrollRef.current!, {
        click: click,
        probeType: 3,
        scrollX: direction === 'horizontal',
        scrollY: direction === 'vertical',
        tap: 'tap',
        bounce: {
          top: bounceTop,
          bottom: bounceBottom,
          left: bounceLeft,
          right: bounceRight
        }
      });
      setBScroll(scroll);
      
      return () => {
        setBScroll(null);
      };
    }, []);

    /**
     * 绑定滚动事件
     */
    useEffect(() => {
      if (!bScroll || !onScroll) return;
      bScroll.on('scroll', onScroll);

      return () => {
        bScroll.off('scroll');
      };
    }, [onScroll, bScroll]);

    /**
     * 监听用户顶部下拉动作
     */
    useEffect(() => {
      if (!bScroll || !onPullDown) return;
      const handlePullDown = (pos: IPosition): void => {
        //判断用户的下拉动作
        if (pos.y > 50) {
          pullDownDebounce();
        }
      };
      bScroll.on('touchEnd', handlePullDown);
      return () => {
        bScroll.off('touchEnd', handlePullDown);
      };
    }, [onPullDown, bScroll, pullDownDebounce]);

    /**
     * 监听用户上拉动作
     */
    useEffect(() => {
      if (!bScroll || !onPullDown) return;
      const handlePullDown = (pos: IPosition): void => {
        //判断用户的下拉动作
        if (pos.y < bScroll.maxScrollY) {
          pullUpDebounce();
        }
      };
      bScroll.on('touchEnd', handlePullDown);
      return () => {
        bScroll.off('touchEnd', handlePullDown);
      };
    }, [onPullUp, bScroll, pullUpDebounce]);

    /**
     * 每次重新渲染组件需刷新BScroll
     */
    useEffect((): void => {
      bScroll && bScroll.refresh();
    });

    /**
     * 暴露组件方法
     */
    useImperativeHandle(ref, (): IScrollInstance => {
      return {
        refresh(): void {
          if (bScroll) {
            bScroll.refresh();
            bScroll.scrollTo(0, 0);
          }
        },
        getBScroll() {
          if (bScroll) return bScroll;
        }
      };
    });

    return (
      <div ref={scrollRef} className={styles['scroll-wrap']}>
        { children }
        {
          pullDownLoading 
          && (
            <div className={styles['pulldown-loading']}>
              <LoadingV3 />
            </div>
          )
        }
        {
          pullUpLoading 
          && (
            <div className={styles['pullup-loading']}>
              <LoadingV2 label="加载中" />
            </div>
          )
        }
      </div>
    );
  }
);

export default memo(Scroll);
