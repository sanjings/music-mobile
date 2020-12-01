import React, {
  memo,
  useState,
  useEffect,
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef
} from "react"
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { debounce } from 'utils/tools'

import styles from './index.module.scss'

const SearchBox = forwardRef((props, ref) => {
  const { keywords } = props

  const { clickBack, onInput } = props

  const [showClear, setShowClear] = useState(false),
        [queryStr, setQueryStr] = useState('');

  const inputRef = useRef(null)

  /**
   * 节流处理
   */
  const debounceOnInput = useMemo(() => {
    return debounce(onInput, 300)
  }, [onInput])

  useEffect(() => {
    if(keywords !== queryStr) {
      setQueryStr(keywords);
    }
  }, [keywords])

  /**
   * 显示时输入框聚焦
   */
  useEffect(() => {
    inputRef && inputRef.current.focus()
  }, []);

  /**
   * 监听value值的改变，并触发回调，同时显示隐藏清空按钮
   */
  useEffect(() => {
    debounceOnInput(queryStr);
    queryStr ? setShowClear(true) : setShowClear(false)
  }, [queryStr])

  /**
   * 输入框输入事件
   * @param {Event} e 
   */
  const handleInput = e => {
    setQueryStr(e.target.value.trim())
  }

  /**
   * 清空输入框
   */
  const handleClear = () => {
    setQueryStr('')
    debounceOnInput('')
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
      <div className={styles['input-wrap']}>
        <input
          ref={inputRef}
          type="text"
          value={queryStr}
          placeholder="搜索歌曲、歌手、专辑"
          className={styles['input']}
          onChange={handleInput}
        />
        <div
          className={classnames(styles['clear'], showClear && styles['visible'])}
          onClick={handleClear}
        >
          <i className="iconfont icon-clear" />
        </div>
      </div>
    </div>
  )
})

SearchBox.propTypes = {
  keywords: PropTypes.string,
  clickBack: PropTypes.func,
  onInput: PropTypes.func
}

export default memo(SearchBox)