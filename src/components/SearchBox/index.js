import React, {
  memo,
  useState,
  useEffect,
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef
} from "react"

import classnames from 'classnames'

import { throttle } from '../../utils/tools'

import styles from './index.module.scss'

const SearchBox = forwardRef((props, ref) => {
  const { searchValue } = props

  const { clickBack, onInput } = props

  const [showClear, setShowClear] = useState(false)

  const inputRef = useRef(null)

  /**
   * 节流处理
   */
  const throttleOnInput = useMemo(() => {
    return throttle(onInput, 500)
  }, [onInput])

  /**
   * 显示时输入框聚焦
   */
  useEffect(() => {
    inputRef && inputRef.current.focus()
  }, []);

  /**
   * 监听value是否有值，有值显示清空按钮，否则隐藏
   */
  useEffect(() => {
    searchValue ? setShowClear(true) : setShowClear(false)
  }, [searchValue])

  /**
   * 输入框输入事件
   * @param {Event} e 
   */
  const handleInput = e => {
    throttleOnInput(e.target.value.trim())
  }

  /**
   * 清空输入框
   */
  const handleClear = () => {
    throttleOnInput('')
    setShowClear(false)
    inputRef.current.focus()
  }

  /**
   * 暴露组件方法
   */
  useImperativeHandle(ref, () => {
    return {
      focus() {
        if (inputRef) {
          inputRef.current.focus()
        }
      }
    }
  })

  return (
    <div className={styles['search-box']}>
      <div className={styles['back']} onClick={clickBack}>
        <i className="iconfont icon-leftarrow" />
      </div>
      <div className={styles['input-wrapper']}>
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          placeholder="搜索歌曲、歌手、专辑"
          className={styles['input']}
          onChange={handleInput}
        />
        <div
          className={classnames([styles['clear'], showClear && styles['visible']])}
          onClick={handleClear}
        >
          <i className="iconfont icon-clear" />
        </div>
      </div>
    </div>
  )
})

export default memo(SearchBox)