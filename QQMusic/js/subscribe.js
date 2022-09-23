/* 发布订阅设计模式 */
(function () {
    // 构建事件池
    let listener = {};

    // 向事件池中注入方法
    const on = function on(event, callback) {
        if (!listener[event]) {
            listener[event] = [];
        }
        let arr = listener[event];
        if (!arr.includes(callback)) {
            arr.push(callback);
        }

    }

    // 从事件池中移除方法
    const off = function off(event, callback) {
        let arr = listener[event];
        if (!arr) return;
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            if (item === callback) {
                // arr.splice(i, 1);//会有数组塌陷,让程序出现bug
                arr[i] = null;
                break;
            }
        }

    }

    // 通知事件池中的方法执行
    const emit = function emit(event, ...params) {
        let arr = listener[event];
        if (!arr) return;
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            if (typeof item === 'function') {
                item(...params);
                continue;
            }
            // 移除非函数内容;
            else {
                arr.splice(i, 1);
                i--;
            }
        }
    }

    // 暴露API
    window.$sub = {
        on, off, emit
    }

})();

// const fn1 = function fn1(x, y) {
//     console.log('fn1', x, y);
// }
// const fn2 = function fn2(x, y) {
//     console.log('fn2', x, y);
//     $sub.off('marry', fn1);
//     $sub.off('marry', fn2)
// }
// const fn3 = function fn3() {
//     console.log('fn3');
// }
// const fn4 = function fn4() {
//     console.log('fn4');
// }
// const fn5 = function fn5() {
//     console.log('fn5');
// }
// $sub.on('marry', fn1);
// $sub.on('marry', fn2);
// $sub.on('marry', fn3);
// $sub.on('marry', fn4);
// $sub.on('marry', fn5);
// document.body.onclick = function () {
//     $sub.emit('marry', 10, 20);
// }