/**
 * @file main.js
 * @desc 便签
 * @version 1.0.0
 * @author 轩辕Rowboat <lxchuan12@163.com>
 * @date 2017-07-02
 * @update 2018-04-30
 * @update 2018-10-17 全面改用ES6
 * @copyright 2017
 */
import './styles/index';
import './assets/img/btn-close.png';
// app
let app = {
	utils: {},
	store: {}
};
// 工具函数
app.utils = {
	// 获取单个元素
	$(selector, node){
		return (node || document).querySelector(selector);
	},
	// 格式化时间
	formatTime(timeStamp){
		let time = new Date(timeStamp);
		let year = time.getFullYear();
		let month = time.getMonth() + 1;
		let date = time.getDate();
		let hour = time.getHours();
		let minute = time.getMinutes();
		let second = time.getSeconds();

		let to2bit = (num) => {
			if(num > 9){
				return num;
			}
			else{
				return '0' + num;
			}
		};
		return `${year}-${to2bit(month)}-${to2bit(date)} ${to2bit(hour)}:${to2bit(minute)}:${to2bit(second)}`;
	},
	/**
	 * 绑定事件
	 * @author luoxiaochuan <lxchuan12@163.com>
	 * @date 2018-05-10
	 */
	on: (() => {
		if(document.addEventListener){
			return (element, event, handler) => {
				if(element && event && handler){
					element.addEventListener(event, handler, false);
				}
			};
		}
		else{
			return (element, event, handler) => {
				if(element && event && handler){
					element.attachEvent('on' + event, handler);
				}
			};
		}
	})(),
	/**
	 * 取消事件
	 * @author luoxiaochuan <lxchuan12@163.com>
	 * @date 2018-05-10
	 */
	off: (() => {
		if(document.removeEventListener){
			return (element, event, handler) => {
				if(element && event && handler){
					element.removeEventListener(event, handler, false);
				}
			};
		}
		else{
			return (element, event, handler) => {
				if(element && event && handler){
					element.detachEvent('on' + event, handler);
				}
			};
		}
	})(),
};
// 数据存储到本地
app.store = {
	__store_key: '__store_note',
	set(id, content){
		// debugger;
		let notes = this.getNotes();
		if(notes[id]){
			Object.assign(notes[id], content);
		}
		else{
			notes[id] = content;
		}
		localStorage[this.__store_key] = JSON.stringify(notes);
	},
	get(){
		let jsonStr = window.localStorage[this.__store_key];
		return JSON.parse(jsonStr);
	},
	remove(id){
		let notes = this.getNotes();
		delete notes[id];
		localStorage[this.__store_key] = JSON.stringify(notes);
	},
	getNotes(){
		return JSON.parse(localStorage[this.__store_key] || '{}');
	}
};
// 立即执行函数
(function (utils, store){
	let $ = utils.$;
	let formatTime = utils.formatTime;
	let on = utils.on;
	let off = utils.off;
	let moveNote = null;
	// 是否限制拖拽范围在可视区 上边缘和左边缘磁性吸附
	let isLimitRange = true;
	let startX;
	let startY;
	let maxZIndex = 0;
	let noteTpl = `
		<i class="u-close"></i>
		<div class="u-bar"></div>
		<div class="u-edit"  contenteditable="true"></div>
		<div class="m-time"><span>更新：</span><span class="u-timestamp">2017-07-02 15:09:02<span></div>`;
	/**
	 * 创建便签 - 全面改用ES6
	 * @author luoxiaochuan <lxchuan12@163.com>
	 * @date 2018-04-30
	 * @update 2018-10-17
	 * @param {Object} options
	 */
	class Note{
		constructor(options){
			let note = document.createElement('div');
			note.className = 'm-note';
			note.id = options.id || 'm-note-' + Date.now();
			note.innerHTML = noteTpl;
			$('.u-edit', note).innerHTML = options.content || '';
			note.style.left = options.left + 'px';
			note.style.top = options.top + 'px';
			note.style.zIndex = options.zIndex;
			document.body.appendChild(note);
			this.note = note;
			this.updateTime(options.updateTimeStamp);
			this.addEvent();
		}
		/**
		 * 初始化便签 - 全面改用ES6
		 * @author luoxiaochuan <lxchuan12@163.com>
		 * @date 2018-04-30
		 * @update 2018-10-17
		 */
		init(){
			let notes = store.getNotes();
			Object.keys(notes).forEach(id => {
				let options = notes[id];
				if(maxZIndex < options.zIndex){
					maxZIndex = options.zIndex;
				}
				let note = new Note(Object.assign(options, {
					id: id
				}));
				console.log('init-note', note);
			});
			maxZIndex += 1;
		}
		/**
		 * 便签保存 - 全面改用ES6
		 * @author luoxiaochuan <lxchuan12@163.com>
		 * @date 2018-04-30
		 * @update 2018-10-17
		 */
		save(){
			let dataStore = {
				zIndex: this.note.style.zIndex,
				left: this.note.offsetLeft,
				// 弄清offsetLeft 和 left 的区别 前者只读，后者可读可写
				// left: parseInt(this.note.style.left),
				top: this.note.offsetTop,
				content: $('.u-edit', this.note).innerHTML,
				updateTimeStamp: this.updateTimeInMS
			};
			store.set(this.note.id, dataStore);
		}
		/**
		 * 便签关闭 - 全面改用ES6
		 * @author luoxiaochuan <lxchuan12@163.com>
		 * @date 2018-04-30
		 * @update 2018-10-17
		 */
		close(){
			document.body.removeChild(this.note);
		}
		/**
		 * 便签更新时间 - 全面改用ES6
		 * @author luoxiaochuan <lxchuan12@163.com>
		 * @date 2018-04-30
		 * @update 2018-10-17
		 */
		updateTime(ms){
			let nowTimeStamp = ms || Date.now();
			let formatTimeStr = formatTime(nowTimeStamp);
			$('.m-time .u-timestamp', this.note).innerHTML = formatTimeStr;
			this.updateTimeInMS = nowTimeStamp;
		}
		/**
		 * 便签添加事件 - 全面改用ES6
		 * @author luoxiaochuan <lxchuan12@163.com>
		 * @date 2018-04-30
		 * @update 2018-10-17
		 */
		addEvent(){
			let btnClose = $('.u-close', this.note);
			// 便签的 mousedown 事件
			let handleMousedown = (ev) => {
				// console.log(ev);
				moveNote = this.note;
				if(moveNote.setCapture){
					moveNote.setCapture();
				}
				startX = ev.clientX - this.note.offsetLeft;
				startY = ev.clientY - this.note.offsetTop;
				if(moveNote.style.zIndex !== maxZIndex - 1){
					moveNote.style.zIndex = maxZIndex++;
					store.set(moveNote.id, {
						zIndex: maxZIndex - 1
					});
				}
				// console.log('mousedown');
			};
			on(this.note, 'mousedown', handleMousedown);
			let inputTimer;
			// 便签的 input 输入事件
			let editNote = $('.u-edit', this.note);
			let handleInput = () => {
				// console.log('handleInput');
				let content = editNote.innerHTML;
				clearTimeout(inputTimer);
				inputTimer = setTimeout(() => {
					let time = Date.now();
					store.set(this.note.id, {
						content: content,
						updateTimeStamp: time
					});
					this.updateTime(time);
				}, 300);
			};
			on(editNote, 'input', handleInput);
			// 便签的 关闭 事件
			let handleCloseClick = (ev) => {
				// 不为空时提示是否删除。
				let content = editNote.innerHTML;
				if(content !== ''){
					let result = window.confirm('是否要删除此便签？');
					if(!result){
						return;
					}
				}
				store.remove(this.note.id);
				// console.log('close click', this.note);
				// 关闭的同时移除事件
				off(btnClose, 'click', handleCloseClick);
				off(this.note, 'mousedown', handleMousedown);
				this.close();
			};
			on(btnClose, 'click', handleCloseClick);
		};
	}
	on(document, 'DOMContentLoaded', (e) => {
		// 初始化保存在localstorage里的便签
		var initLocal = () => {
			// debugger;
			let notes = store.getNotes();
			// console.log('initLocal notes', notes);
			Object.keys(notes).forEach(id => {
				let options = notes[id];
				// console.log('initLocal',options);
				if(maxZIndex < options.zIndex){
					maxZIndex = options.zIndex;
				}
				let note = new Note(Object.assign(options, {
					id: id
				}));
				console.log('initLocal', note);
			});
			maxZIndex += 1;
		};
		initLocal();
		let handleBtnCreate = () => {
			let options = {
				left: Math.floor(Math.random() * (window.innerWidth - 200)),
				top: Math.floor(Math.random() * (window.innerHeight - 250)),
				zIndex: maxZIndex++
			};
			let note = new Note(options);
			note.save();
		};
		let handleMousemove = (ev) => {
			if(!moveNote){
				return;
			}

			let L = ev.clientX - startX;
			let T = ev.clientY - startY;

			if(isLimitRange){
				let width = document.documentElement.clientWidth - moveNote.offsetWidth;
				let height = document.documentElement.clientHeight - moveNote.offsetHeight;
				if(L < 0){
					L = 0;
				}
				else if(L > width){
					L = width;
				}

				if(T < 0){
					T = 0;
				}
				else if(T > height){
					T = height;
				}
			}

			moveNote.style.left = L + 'px';
			moveNote.style.top = T + 'px';
			// console.log('move', ev);
		};
		let handleMouseup = () => {
			if(!moveNote){
				return;
			}
			store.set(moveNote.id, {
				left: moveNote.offsetLeft,
				top: moveNote.offsetTop
			});
			if(moveNote.releaseCapture){
				moveNote.releaseCapture();
			}
			moveNote = null;
			// 把事件解除
			// off(document, 'mousemove', handleMousemove);
		};
		// 清除所有的便签
		let handleBtnRemoveAllNotes = () => {
			// 有便签就提示是否删除所有便签
			let hasNote = [...document.querySelectorAll('.m-note')].length > 0;
			if(hasNote){
				let result = window.confirm('是否要清除所有便签？');
				if(!result){
					return;
				}
			}
			// 思路1：主动触发把所有的便签关闭事件
			[...document.querySelectorAll('.u-close')].forEach((element) => {
				element.click();
			});
		};
		// 创建便签
		on($('#create'), 'click', handleBtnCreate);
		on(document, 'mousemove', handleMousemove);
		on(document, 'mouseup', handleMouseup);
		// 清除所有的便签
		on($('#remove'), 'click', handleBtnRemoveAllNotes);
		// console.log($('.m-note .u-close'));
	});
}(app.utils, app.store));
// console.log(1);
if(module.hot){
	// 实现热更新
	module.hot.accept('./styles/index.less', () => {
		console.log('hot-accept-style-less-2');
	});
}
