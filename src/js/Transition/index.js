const transition = require('transitionjs')
   
   // function typeTransition(){
      //       if(isTizenOS()){
      //       // return "-webkit-transform";
      //       }
      
      //       return "transform";
      // }
    
export function fadeInElement(element, opFrom, opTo, opS) {
      transition.begin(element, ["opacity", opFrom, opTo, opS], {
            onBeforeChangeStyle: function(element) {
                  element.style.display = ""
            },
            onAfterChangeStyle: function() {
            },
            onTransitionEnd: function() {
            
            }
      })
}

export function fadeOutElement(element, opFrom, opTo, opS) {
      transition.begin(element, ["opacity", opFrom, opTo, opS], {
            onBeforeChangeStyle: function() {
                  element.style.display = "none"
            },
            onAfterChangeStyle: function(){
            },
            onTransitionEnd: function() {
            }
      })
}
