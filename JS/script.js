var timeout;

function circleChaptaKaro(){
    // Define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprevious = 0;
    var yprevious = 0;
    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout)
        xscale = gsap.utils.clamp(.8,1.2, dets.clientX - xprevious)
        yscale = gsap.utils.clamp(.8,1.2, dets.clientY - yprevious)

        xprevious = dets.clientX
        yprevious = dets.clientY

        CircleFollower(xscale, yscale);
        timeout = setTimeout(() => {
             document.querySelector(".minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`
        }, 100);
    }) 
}

function CircleFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector(".minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`
    })
}

function FirstPageAnim(){
    var tl = gsap.timeline();

    tl.from(".nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easInOut
    })
    .to(".boundelem", {
      y: 0,
      ease: Expo.easInOut,
      delay: -1,
      duration: 2,
      stagger: .2
    })

    .from(".herofooter", {
       y: -10,
       opacity: 0,
       duration: 1.5,
       delay: -1,
       ease: Expo.easInOut
    })
}

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diffrot = 0;
   
    elem.addEventListener("mouseleave", function(){
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });
   
    elem.addEventListener("mousemove", function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;  // aik element ki value/jaga jaanne ke liye 'getBoundingClientRect' ka istimaal kiya jata he yaani siraf is element/div par agar mouse move karoga to kiya hoga (agar ye nahi karo ge to screen ke top se ye move hoga, toh dets.clientY se element ke top ko - karege to ye element ke andar move hoga), aur ha kisi element par bhi qs laga saktai ho jese el.qs('img') yaani element ke andar ka img select karo 

        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20, diffrot * 0.5),
        });
    });
});

circleChaptaKaro();
CircleFollower();
FirstPageAnim();