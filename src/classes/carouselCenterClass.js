var cssTransition = require('css-transition')

export default class Carousel {
    constructor (elementId, timeInterval) {
        this.element = document.querySelector("."+elementId)
        this.parent = this.element.children[0].children[0]
        this.positionX = 0;
        this.time = timeInterval;
        this.timer;
    }

    animationEnd(){
        console.log("Transition end")
    }

    prev() {
        var t = this.parent;
        cssTransition(t, {
            transform: 'translate3d(-100%, 0, 0)'
        }, 300, function(){
            var firstChild = t.firstChild
            var lastChild = t.lastChild
            firstChild.before(lastChild)
            t.style.transform =  "translate3d(-200%, 0, 0)"
        })

        var carouselIndicators = this.element.children[1].children[0].children;
        for (var index = 0; index < carouselIndicators.length; index++) {
            var element = carouselIndicators[index];
            if(element.classList.contains("active")){
                break;
            }
        }

        if(!element.previousElementSibling){
            var previousElement = carouselIndicators[carouselIndicators.length - 1];
            element.classList.remove("active");
            previousElement.classList.add("active");
        }else{
            var previousElement = element.previousElementSibling;
            element.classList.remove("active");
            previousElement.classList.add("active");
        }
    }

    next() {
        var t = this.parent;
        cssTransition(t, {
            transform: 'translate3d(-200%, 0, 0)'
        }, 300, function(){
            var firstChild = t.firstChild
            var lastChild = t.lastChild
            lastChild.after(firstChild)
            t.style.transform =  "translate3d(-100%, 0, 0)"
        })

        var carouselIndicators = this.element.children[1].children[0].children;
        for (var index = 0; index < carouselIndicators.length; index++) {
            var element = carouselIndicators[index];
            if(element.classList.contains("active")){
                break;
            }
        }

        if(!element.nextElementSibling){
            var nextElement = carouselIndicators[0];
            element.classList.remove("active");
            nextElement.classList.add("active");
            nextElement.classList.remove("no-active");
            element.classList.add("no-active");
        }else{
            var nextElement = element.nextElementSibling;
            element.classList.remove("active");
            nextElement.classList.add("active");
            nextElement.classList.remove("no-active");
            element.classList.add("no-active");
        }
    }

    init() {
        var t = this;
        var firstChild = this.parent.firstChild
        // console.log(firstChild)
        var lastChild = this.parent.lastChild
        // console.log(lastChild)
        firstChild.before(lastChild)
        this.parent.addEventListener("webkitAnimationEnd", function(){ console.log("Transition end 1")})
        this.parent.addEventListener("animationend", function(){ console.log("Transition end 2")})
        this.parent.addEventListener("oanimationend", function(){ console.log("Transition end 3")})
        cssTransition(this.parent, {
            transform: 'translate3d(-100%, 0, 0)'
        }, 0, function(){
            //console.log('animation complete')
        })
        this.timer = setInterval(function(){
            t.next();
        }, this.time)
    }
}