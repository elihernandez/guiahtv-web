var cssTransition = require('css-transition')

export class Carousel {
    constructor (element, timeInterval) {
        this.element = element.current
        this.parent = this.element.children[0].children[0]
        this.positionX = 0
        this.time = timeInterval
        this.timer
        this.init()
    }

    animationEnd(){
        console.log("Transition end")
    }

    prev() {
        this.stopInterval()
        let element
        let t = this.parent;
        cssTransition(t, {
            transform: 'translate3d(0%, 0, 0)'
        }, 300, function(){
            let firstChild = t.firstChild
            let lastChild = t.lastChild
            firstChild.before(lastChild)
            t.style.transform =  "translate3d(-100%, 0, 0)"
        })

        let carouselIndicators = this.element.children[1].children[0].children
        for (let index = 0; index < carouselIndicators.length; index++) {
            element = carouselIndicators[index]
            if(element.classList.contains("active")){
                break
            }
        }

        if(!element.previousElementSibling){
            let previousElement = carouselIndicators[carouselIndicators.length - 1]
            element.classList.remove("active")
            previousElement.classList.add("active")
        }else{
            let previousElement = element.previousElementSibling
            element.classList.remove("active")
            previousElement.classList.add("active")
        }
        this.initInterval()
    }

    next() {
        this.stopInterval()
        let element
        let t = this.parent
        cssTransition(t, {
            transform: 'translate3d(-200%, 0, 0)'
        }, 300, function(){
            let firstChild = t.firstChild
            let lastChild = t.lastChild
            lastChild.after(firstChild)
            t.style.transform =  "translate3d(-100%, 0, 0)"
        })

        let carouselIndicators = this.element.children[1].children[0].children
        for (let index = 0; index < carouselIndicators.length; index++) {
            element = carouselIndicators[index]
            if(element.classList.contains("active")){
                break
            }
        }

        if(!element.nextElementSibling){
            let nextElement = carouselIndicators[0]
            element.classList.remove("active")
            nextElement.classList.add("active")
            nextElement.classList.remove("no-active")
            element.classList.add("no-active")
        }else{
            let nextElement = element.nextElementSibling
            element.classList.remove("active")
            nextElement.classList.add("active")
            nextElement.classList.remove("no-active")
            element.classList.add("no-active")
        }
        this.initInterval()
    }

    stopInterval() {
        clearInterval(this.timer)
    }

    initInterval() {
        let t = this
        this.timer = setInterval(function(){
            t.next()
        }, this.time)
    }

    init() {
        let t = this
        let firstChild = this.parent.firstChild
        let lastChild = this.parent.lastChild
        firstChild.before(lastChild)
        cssTransition(this.parent, {
            transform: 'translate3d(-100%, 0, 0)'
        }, 0, function(){
            t.initInterval()
        })
    }
}