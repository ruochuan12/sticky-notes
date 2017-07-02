var app = {
    utils: {},
    store: {}
};
app.utils = {
    $: function(selector, node){
        return (node || document).querySelector(selector);
    }
}
app.store = {

};
(function(utils){
    var noteTpl = `
        <i class="u-close"></i>
        <div class="u-edit"  contenteditable="true"></div>
        <div class="m-time"><span>更新：</span><span class="u-timestamp">2017-07-02 15:09:02<span></div>`;
    function Note(){
        var note = document.createElement('div');
        note.className = 'm-note';
        // debugger;
        note.innerHTML = noteTpl;
        document.body.appendChild(note);
    }
    document.addEventListener('DOMContentLoaded',function(e){
        function handleBtnClick(){
            new Note();
        };
        utils.$('#create').addEventListener('click',handleBtnClick);
        
    });
}(app.utils));
console.log('这里是live-reload，略坑');