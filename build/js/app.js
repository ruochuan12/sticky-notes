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
    formatTime: function (timeStamp) {
        var time = new Date(timeStamp);
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var second = time.getSeconds();

        function to2bit(num) {
            if (num >= 0 && num <= 9) {
                return 0 + '' + num;
            } else {
                return num;
            }
        }
        return year + '-' + to2bit(month) + '-' + to2bit(date) + ' ' + to2bit(hour) + ':' + to2bit(minute) + ':' + to2bit(second);
    },
    limitRange: function (note) {
        var style = null;
        if (window.getComputedStyle) {
            style = window.getComputedStyle(node, null);
        } else {
            style = node.currentStyle;
        }
        return style;
    },
    // 获取计算后的样式
}
// 数据存储到本地
app.store = {
    __store_key: '__store_note',
    set: function (id, content) {
        // debugger;
        var notes = this.getNotes();
        if (notes[id]) {
            Object.assign(notes[id],content);
        } else {
            notes[id] = content
        }
        localStorage[this.__store_key] = JSON.stringify(notes);
    },
    get: function () {
        var jsonStr = window.localStorage[this.__store_key];
        return JSON.parse(jsonStr);
    },
    remove: function (id) {
        var notes = this.getNotes();
        delete notes[id];
        localStorage[this.__store_key] = JSON.stringify(notes);
    },
    getNotes: function(){
        // debugger;
        return JSON.parse(localStorage[this.__store_key] || '{}');
    }
};
// 立即执行函数
(function (utils, store) {
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
        note.id = options.id || 'm-note-' + Date.now();
        note.innerHTML = noteTpl;
        $('.u-edit', note).innerHTML = options.content || '';
        note.style.left = options.left + 'px';
        note.style.top = options.top + 'px';
        note.style.zIndex = options.zIndex + 'px';
        document.body.appendChild(note);
        this.note = note;
        console.log(note);
        this.updateTime();
        this.addEvent();
    }
    // 便签保存
    Note.prototype.save = function () {
        var that = this;
        debugger;
        var dataStore = {
            zIndex: that.note.style.zIndex,
            left: that.note.offsetLeft,
            // 弄清offsetLeft 和 left 的区别 前者只读，后者可读可写
            // left: parseInt(that.note.style.left),
            top: that.note.offsetTop,
            content:$('.u-edit',that.note).innerHTML,
            timeStamp: Date.now()
        }
        store.set(this.note.id, dataStore);
    }
    // 便签关闭
    Note.prototype.close = function () {
        document.body.removeChild(this.note);
    }
    /// 便签更新时间
    Note.prototype.updateTime = function () {
        var nowTimeStamp = Date.now();
        var formatTimeStr = utils.formatTime(nowTimeStamp);
        $('.m-time .u-timestamp', this.note).innerHTML = formatTimeStr;
    }
    Note.prototype.addEvent = function () {
        let that = this;
        var btnClose = $('.u-close', this.note);
        // 便签的 mousedown 事件
        var handleMousedown = function (ev) {
            console.log(ev);
            moveNote = that.note;
            startX = ev.clientX - that.note.offsetLeft;
            startY = ev.clientY - that.note.offsetTop;
            moveNote.style.zIndex = maxZIndex++;
            console.log('mousedown');
        }
        that.note.addEventListener('mousedown', handleMousedown);
        var inputTimer;
        // 便签的 input 输入事件
        var editNote = $('.u-edit', that.note);
        var handleInput = function () {
            clearTimeout(inputTimer);
            inputTimer = setTimeout(function () {
                // debugger;
                store.set(that.note.id, {
                    content: editNote.innerHTML,
                    timeStamp: Date.now()
                });
            }, 300);
        }
        editNote.addEventListener('input', handleInput);
        // 便签的 关闭 事件
        var handleCloseClick = function (ev) {
            store.remove(that.note.id);
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
        var handleBtnCreate = function () {
            var options = {
                left: Math.floor(Math.random() * (window.innerWidth - 200)),
                top: Math.floor(Math.random() * (window.innerHeight - 250)),
                zIndex: maxZIndex++
            }
            var note = new Note(options);
            note.save();
            noteArr.push(note);
            console.log(noteArr);
        };
        var handleBtnRemove = function () {
            console.log('handleBtnRemove');
            console.log(noteArr);
            if (noteArr.length > 0) {
                noteArr.forEach(function (element,index) {
                    console.log(element);
                    element.close();
                    // noteArr.splice(index,1);
                }, this);
            }
            // 关闭后置空 noteArr
            noteArr = [];
        };
        var handleMousemove = function (ev) {
            if (!moveNote) {
                return;
            }
            moveNote.style.left = ev.clientX - startX + 'px';
            moveNote.style.top = ev.clientY - startY + 'px';
            // console.log('move', ev);
        };
        var handleMouseup = function () {
            if (!moveNote) {
                return;
            }
            store.set(moveNote.id,{
                left: moveNote.offsetLeft,
                top: moveNote.offsetTop
            });
            moveNote = null;
        }
        $('#create').addEventListener('click', handleBtnCreate);
        $('#remove').addEventListener('click', handleBtnRemove);
        // 初始化便签
        var notes = store.getNotes();
        Object.keys(notes).forEach(function(id){
            var options = notes[id];
            new Note(Object.assign(options,{
                id:id
            }));
        });
        document.addEventListener('mousemove', handleMousemove);
        document.addEventListener('mouseup', handleMouseup);
        console.log($('.m-note .u-close'));
    });
}(app.utils, app.store));