// app
var app = {
    utils: {},
    store: {}
};
// 工具函数
app.utils = {
    $: function (selector, node) {
        return (node || document).querySelector(selector);
    },
    formatTime: function(timeStamp) {
        var time = new Date(timeStamp);
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var second = time.getSeconds();
        function to2bit(num){
            if (num >= 0 && num <= 9) {
               return 0 + '' + num;
            } else {
                return num;
            }
        }
        return year + '-' + to2bit(month) + '-' + to2bit(date) + ' ' + to2bit(hour) + ':' + to2bit(minute) + ':' + to2bit(second);
    },
    limitRange: function(note){
        var style = null;
        if(window.getComputedStyle) {
            style = window.getComputedStyle(node, null);
        }else{
            style = node.currentStyle;
        }
        return style;
    },
    // 获取计算后的样式
}
// 数据存储到本地
app.store = {
    set: function (key, value) {
        window.localStorage.setItem(key, value);
    },
    get: function () {
        window.localStorage.getItem(key);
    },
    remove: function () {
        window.localStorage.removeItem(key);
    }
};
// 立即执行函数
(function (utils) {
    var $ = utils.$;
    var moveNote = null;
    var startX;
    var startY;
    var maxZIndex = 0;
    var noteTpl = `
        <i class="u-close"></i>
        <div class="u-edit"  contenteditable="true"></div>
        <div class="m-time"><span>更新：</span><span class="u-timestamp">2017-07-02 15:09:02<span></div>`;
    // 创建便签
    function Note(options) {
        var note = document.createElement('div');
        note.className = 'm-note';
        // debugger;
        note.innerHTML = noteTpl;
        note.style.left = options.left + 'px';
        note.style.top = options.top + 'px';
        note.style.zIndex = options.zIndex + 'px';
        document.body.appendChild(note);
        this.note = note;
        this.updateTime();
        this.addEvent();
    }
    // 便签保存
    Note.prototype.save = function() {

    }
    // 便签关闭
    Note.prototype.close = function() {
        document.body.removeChild(this.note);
    }
    /// 便签更新时间
    Note.prototype.updateTime = function() {
        var nowTimeStamp = Date.now();
        var formatTimeStr = utils.formatTime(nowTimeStamp);
        $('.m-time .u-timestamp', this.note).innerHTML = formatTimeStr;
    }
    Note.prototype.addEvent = function() {
        let that = this;
        var btnClose = $('.u-close', this.note);
        // 便签的 mousedown 事件
        var handleMousedown = function (ev) {
            console.log(ev);
            moveNote = that.note;
            startX = ev.clientX - that.note.offsetLeft;
            startY = ev.clientY - that.note.offsetTop;
            console.log('mousedown');
        }
        that.note.addEventListener('mousedown', handleMousedown);
        // 便签的 关闭 事件
        var handleCloseClick = function (ev) {
            console.log('close click', that.note);
            // 关闭的同时移除事件
            btnClose.removeEventListener('click', handleCloseClick);
            that.note.removeEventListener('mousedown', handleMousedown);
            that.close(ev);
        }
        btnClose.addEventListener('click', handleCloseClick);
    };
    document.addEventListener('DOMContentLoaded', function (e) {
        var noteArr = [];
        var handleBtnCreateClick = function() {
            var options = {
                left: Math.floor(Math.random() * (window.innerWidth-200)),
                top: Math.floor(Math.random() * (window.innerHeight-250)),
                zIndex: maxZIndex++
            }
            console.log(options);
            noteArr.push(new Note(options));
        };
        var handleBtnRemoveClick = function() {
            console.log('handleBtnRemoveClick');
            console.log(noteArr);
            if (noteArr.length> 0) {
                noteArr.forEach(function(element) {
                    console.log(element);
                    element.close();
                    noteArr = [];
                }, this);
            }
        };
        var handleMousemove = function(ev) {
            if (!moveNote) {
                return;
            }
            moveNote.style.left = ev.clientX - startX + 'px';
            moveNote.style.top = ev.clientY - startY + 'px';
            // console.log('move', ev);
        };
        var handleMouseup = function() {
            if (!moveNote) {
                return;
            }
            moveNote = null;
        }
        $('#create').addEventListener('click', handleBtnCreateClick);
        $('#remove').addEventListener('click', handleBtnRemoveClick);
        document.addEventListener('mousemove',handleMousemove);
        document.addEventListener('mouseup',handleMouseup);
        console.log($('.m-note .u-close'));
    });
}(app.utils));
