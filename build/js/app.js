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
        var Time = new Date(timeStamp);
        var year = Time.getFullYear();
        var month = Time.getMonth() + 1;
        var date = Time.getDate();
        var hour = Time.getHours();
        var minute = Time.getMinutes();
        var second = Time.getSeconds();
        function to2bit(num){
            if (num >= 0 && num <= 9) {
               return 0 + '' + num;
            } else {
                return num;
            }
        }
        return year + to2bit(month) + to2bit(date) + ' ' + to2bit(hour) + ':' + to2bit(minute) + ':' + to2bit(second);
    }
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
    var startX = '';
    var startY = '';
    var noteTpl = `
        <i class="u-close"></i>
        <div class="u-edit"  contenteditable="true"></div>
        <div class="m-time"><span>更新：</span><span class="u-timestamp">2017-07-02 15:09:02<span></div>`;
    // 创建便签
    function Note() {
        var note = document.createElement('div');
        note.className = 'm-note';
        // debugger;
        note.innerHTML = noteTpl;
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
        function handleCloseClick(e) {
            console.log('close click', that.note);
            btnClose.removeEventListener('click', handleCloseClick);
            that.close(e);
        }
        function handleMousedown(e) {
            console.log(e);
            moveNote = that.note;
            startX = e.clentX - that.note.offsetLeft;
            startY = e.clentY - that.note.offsetTop;
            console.log(that);
            console.log('mousedown');
        }
        btnClose.addEventListener('click', handleCloseClick);
        this.note.addEventListener('mousedown', handleMousedown);
    };
    document.addEventListener('DOMContentLoaded', function (e) {
        var note = null;
        var handleBtnClick = function() {
            note = new Note();
        };
        var handleMousemove = function(ev) {
            if (!moveNote) {
                return;
            }
            moveNote.style.left = ev.clientX - startX + 'px';
            moveNote.style.top = ev.clientY - startY + 'px';
            console.log('move', ev);
        };
        $('#create').addEventListener('click', handleBtnClick);
        document.addEventListener('mousemove',handleMousemove);
        console.log($('.m-note .u-close'));
    });
}(app.utils));
