class Scroll {
    constructor(options) {
        this.opts=options;
        this.fn = options.func;
        this.obj = options.obj;
        this.init();
    }

    init() {
        var that= this;
        if (navigator.userAgent.indexOf('Firefox') != -1) {
            this.obj.addEventListener('DOMMouseScroll', function (ev) {
                that.fnwheel(ev);
            }, false);
        } else {
            this.obj.onmousewheel = function(ev){
                that.fnwheel(ev);
            };
        }
    }

    fnwheel(ev) {
        let oEv = ev || event;
        let down = false;
        if (oEv.wheelDelta) {
            down = oEv.wheelDelta < 0 ? true : false;
        } else {
            down = oEv.detail > 0 ? true : false;
        }
        // console.log(this.fn);
        this.fn(down);
        oEv.preventDefault || oEv.preventDefault();
        return false;
    }
}
/*
const scroll=(options)=>new Scroll(options);
export {scroll};
 */
/**
 * 运动
 * */
function go(obj) {
    clearInterval(timer);
    var iSpeed = 0;
    timer = setInterval(function () {
        bOk = false;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        iSpeed = (obj.offsetTop - scrollTop) / 13;

        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

        if (scrollTop == obj.offsetTop) {
            clearInterval(timer);
            iSpeed = 0;
            bOk = true;
        } else {
            document.documentElement.scrollTop = document.body.scrollTop = scrollTop + iSpeed;
        }
    }, 30);
}
/**
 * 初始化
 * */
var t = 0;
var bOk = true;
var timer = null;
var aLi = document.getElementsByTagName('li');
var oUl = document.getElementById('ul');

let scroll = new Scroll({
    obj: oUl,
    func: function (down) {
        if (down && bOk) {
            t += 1;
            bOk = false;
            if (t >= 0 && t <= aLi.length) {
                go(aLi[t])
            } else {
                t = 0;
                bOk = true;
            }
            alert(t);
        } else {
            t -= 1;
            bOk = false;
            if (t >= 0 && t <= aLi.length) {
                go(aLi[t]);
            } else {
                t = 0;
                bOk = true;
            }
            alert(t);
        }
    }
});

