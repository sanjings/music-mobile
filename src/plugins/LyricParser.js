const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g
const STATE_PAUSE = 0
const STATE_PLAYING = 1

export default class LyricParser {
  /**
   * @param {String} lyric 
   * @param {Function} handler 
   */
  constructor(lyric, handler) {
    this.lyric = lyric
    this.handler = handler
    this.lines = []
    this.state = STATE_PAUSE; // 播放状态
    this.curLineIndex = 0; // 当前播放歌词所在的行数
    this.startStamp = 0; // 歌曲开始的时间戳

    this._initLines()
  }

  _initLines() {
    const lines = this.lyric.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]; // 如 "[00:01.997] 作词：薛之谦"
      let result = timeExp.exec(line);
      if (!result) continue;
      const txt = line.replace(timeExp, '').trim(); // 现在把时间戳去掉，只剩下歌词文本
      if (txt) {
        if (result[3].length === 3) {
          result[3] = result [3]/10; //[00:01.997] 中匹配到的 997 就会被切成 99
        }
        this.lines.push ({
          time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10, // 转化具体到毫秒的时间，result [3] * 10 可理解为 (result / 100) * 1000
          txt
        });
      }
    }

    this.lines.sort((a, b) => a.time - b.time) // 根据时间排序
  }

  /**
   * 播放歌词
   * @param {Number} offset 时间进度
   * @param {Boolean} isSeek  是否手动调整进度
   */
  play(offset = 0, isSeek = false) {
    if (!this.lines.length) return;

    this.state = STATE_PLAYING;
    this.curLineIndex = this._findcurLineIndex(offset);
    this._callHandler(this.curLineIndex - 1);
    this.startStamp = +new Date () - offset;
  
    if (this.curLineIndex < this.lines.length) {
      clearTimeout (this.timer);
      this._playRest (isSeek);
    }
  }
  
  _findcurLineIndex(time) {
    const index = this.lines.findIndex(item => time <= item.time)    
    return index >= 0 ? index : this.lines.length - 1
  }
  
  _callHandler(i) {
    if (i < 0) return;

    this.handler({
      txt: this.lines[i].txt,
      lineNum: i
    })
  }

  /**
   * 继续播放
   * @param {Boolean} isSeek 是否手动调整进度
   */
  _playRest (isSeek = false) {
    let line = this.lines [this.curLineIndex];
    let delay;
    if (isSeek) {
      delay = line.time - (+new Date () - this.startStamp);
    } else {
      let preTime = this.lines [this.curLineIndex - 1] ? this.lines [this.curLineIndex - 1].time : 0;
      delay = line.time - preTime;
    }
    this.timer = setTimeout(() => {
      this._callHandler(this.curLineIndex++);
      if (this.curLineIndex < this.lines.length && this.state === STATE_PLAYING) {
        this._playRest();
      }
    }, delay)
  }

  togglePlay (offset) {
    if (this.state === STATE_PLAYING) {
      this.stop ()
    } else {
      this.state = STATE_PLAYING
      this.play(offset, true)
    }
  }
  
  stop () {
    this.state = STATE_PAUSE
    clearTimeout(this.timer)
  }

  seek(offset) {
    this.play(offset, true)
  }
}