(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

$.fn.disableScroll = function() {
    window.oldScrollPos = $(window).scrollTop();

    $(window).on('scroll.scrolldisabler',function ( event ) {
       $(window).scrollTop( window.oldScrollPos );
       event.preventDefault();
    });
};

$.fn.enableScroll = function() {
    $(window).off('scroll.scrolldisabler');
};
    
document.documentElement.classList.remove("no-js");

var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() ||isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() ||isMobile.Windows());}};
		
// init
var storyWidth = 0;		
var storyChild = $("#section-1 .scroller").children('.item')
var storyFirst = $("#section-1 .scroller").children('.firstWrap').width();

var opWidth = 0;		
var opChild = $("#section-2 .scroller").children('.item')
var opFirst = $("#section-2 .scroller").children('.firstWrap').width();

var comWidth = 0;		
var comChild = $("#section-3 .scroller").children('.item')
var comFirst = $("#section-3 .scroller").children('.firstWrap').width();


var controller = new ScrollMagic.Controller({
	globalSceneOptions: {
		triggerHook: 'onLeave'
	}
});

// init header
var headerStrip = new ScrollMagic.Controller();
		
// init controller
var storyControl = new ScrollMagic.Controller({
	globalSceneOptions: {
		//triggerHook: 'onLeave'
	}
});

var opControl = new ScrollMagic.Controller({
	globalSceneOptions: {
		//triggerHook: 'onLeave'
	}
});

var comControl = new ScrollMagic.Controller({
	globalSceneOptions: {
		//triggerHook: 'onLeave'
	}
});

var conControl = new ScrollMagic.Controller({
	globalSceneOptions: {
		//triggerHook: 'onLeave'
	}
});



// build tween
var storyHeaderBG = TweenMax.to("#target", 1, {height: 75});
var opHeaderBG 	  = TweenMax.to("#targetTwo", 1, {height: 75});
var comHeaderBG   = TweenMax.to("#targetThree", 1, {height: 75});
var conHeaderBG   = TweenMax.to("#targetFour", 1, {height: 75});

var storyTween  = TweenMax.to("#section-1 .scroller", 1, { x: "0%", delay: 0.1, ease: Sine.easeInOut});
var opTween 	= TweenMax.to("#section-2 .scroller", 1, { x: "0%",delay: 0.1,ease: Sine.easeInOut});
var comTween 	= TweenMax.to("#section-3 .scroller", 1, { x: "0%",delay: 0.1,ease: Sine.easeInOut});		

var skipParam = {css: {scaleX: 1}};		

// init controller
var controll = new ScrollMagic.Controller({
	vertical:false
});

// loop through all elements
$('.fade-in').each(function() {	 
  // build a tween
  var tween = TweenMax.from($(this), 0.9, {autoAlpha: 0, x: '+=25', ease:Power4.easeInOut});

  // build a scene
  var scene = new ScrollMagic.Scene({
    triggerElement: this,
    triggerHook: 0.8
  })
  .reverse(false)
  .setTween(tween) // trigger a TweenMax.to tween
  .addTo(controll);     
});

//animate storyTimeline
$('[class*="line-"]').each(function() {

  // build a scene
  var scene = new ScrollMagic.Scene({
	triggerElement: this,
    triggerHook: 0.7
  })
  .reverse(false)
  .setClassToggle(this, "draw") // add class toggle
  .addTo(controll);     
});



//build header transition
var scene = new ScrollMagic.Scene({
	triggerHook: 'onLeave',
	triggerElement: "#section-1", 
	duration: 75
})
.setTween(storyHeaderBG)
.offset(-75)
//.addIndicators() // add indicators (requires plugin)
.addTo(headerStrip)
.on("start", function (e) {
	var direction = e.target.controller().info("scrollDirection");
	if(direction == 'FORWARD'){
		console.log('forward: bottom > top')
	}else{
		console.log('back: top > bottom')
	}
});

var opHeader = new ScrollMagic.Scene({
	triggerHook: 'onLeave',
	triggerElement: "#section-2", 
	duration: 75
})
.setTween(opHeaderBG)
.offset(-75)
//.addIndicators() // add indicators (requires plugin)
.addTo(headerStrip)
.on("start", function (e) {
	var direction = e.target.controller().info("scrollDirection");
	if(direction == 'FORWARD'){

	}else{

	}
});

var comHeader = new ScrollMagic.Scene({
	triggerHook: 'onLeave',
	triggerElement: "#section-3", 
	duration: 75
})
.setTween(comHeaderBG)
.offset(-75)
//.addIndicators() // add indicators (requires plugin)
.addTo(headerStrip)
.on("start", function (e) {
	var direction = e.target.controller().info("scrollDirection");
	if(direction == 'FORWARD'){
		
	}else{
		
	}
});

var conHeader = new ScrollMagic.Scene({
	triggerHook: 'onLeave',
	triggerElement: "#section-4", 
	duration: 75
})
.setTween(conHeaderBG)
.offset(-75)
//.addIndicators() // add indicators (requires plugin)
.addTo(headerStrip)
.on("start", function (e) {
	var direction = e.target.controller().info("scrollDirection");
	if(direction == 'FORWARD'){
		console.log('fadeTargets OUT')		
	}else{
		console.log('fadeTargets IN')
	}
});

//build Scene:mobile
var mobileStory = new ScrollMagic.Scene({	
	triggerHook: 'onLeave',
	triggerElement: '#section-1',
	//duration:'100%'
})
.on("start", function (e) {
	var direction = e.target.controller().info("scrollDirection");
	if(direction == 'FORWARD'){
		//$("body > header").addClass("interior");
		//$("body > header").addClass("yellow");
	}else{
		//$("body > header").removeClass("interior");
		//$("body > header").removeClass("yellow");
	}
})

var mobileOp = new ScrollMagic.Scene({	
	triggerHook: 'onLeave',
	triggerElement: '#section-2',
})
.on("start", function (e) {
	var direction = e.target.controller().info("scrollDirection");
	if(direction == 'FORWARD'){
		//$("body > header").removeClass("yellow");
		//$("body > header").addClass("green");
	}else{
		//$("body > header").addClass("yellow");
		//$("body > header").removeClass("green");
	}
})

var mobileCom = new ScrollMagic.Scene({	
	triggerHook: 'onLeave',
	triggerElement: '#section-3',
})
.on("start", function (e) {
	var direction = e.target.controller().info("scrollDirection");
	if(direction == 'FORWARD'){
		//$("body > header").removeClass("green");
		//$("body > header").addClass("orange");
	}else{
		//$("body > header").addClass("green");
		//$("body > header").removeClass("orange");
	}
})

var mobileCon = new ScrollMagic.Scene({	
	triggerHook: 'onLeave',
	triggerElement: '#section-4',
})
.on("start", function (e) {
	var direction = e.target.controller().info("scrollDirection");
	if(direction == 'FORWARD'){
		//$("body > header").removeClass("orange");
		//$("body > header").addClass("lightBlue");
	}else{
		//$("body > header").addClass("orange");
		//$("body > header").removeClass("lightBlue");
	}
})


//build Scene
var storyScene = new ScrollMagic.Scene({	
	triggerHook: 'onLeave',
	triggerElement: '#section-1',
	duration: '450%'
	//duration:'100%'
})
.on("destroy", function (event) {
  console.log('STORYSCENE:Destroyed');
})
.on("progress", function (e) {
	$("#section-1 img").trigger("unveil");
})
.on("start", function (e) {
/*
	var direction = e.target.controller().info("scrollDirection");
	if(direction == 'FORWARD'){
		$("body > header").addClass("interior");
		$("body > header").addClass("yellow");
	}else{
		$("body > header").removeClass("interior");
		$("body > header").removeClass("yellow");
	}
*/
})
.setTween(storyTween)
.setPin("#section-1");
//.addIndicators() // add indicators (requires plugin)


function storyBuild(){
	storyScene = new ScrollMagic.Scene({	
		triggerHook: 'onLeave',
		triggerElement: '#section-1',
		duration: '400%'
	
	})	
	.on("destroy", function (event) {
	console.log('STORYSCENE:Destroyed');
	})
	.on("progress", function (e) {
	$("#section-1 img").trigger("unveil");
	})
	.on("start", function (e) {
	var direction = e.target.controller().info("scrollDirection");
	if(direction == 'FORWARD'){
		//$("body > header").addClass("interior");
		//$("body > header").addClass("yellow");
	}else{
		//$("body > header").removeClass("interior");
		//$("body > header").removeClass("yellow");
	}
	})
	.setTween(storyTween)
	.setPin("#section-1")
	//.addIndicators() // add indicators (requires plugin)

}

var opScene = new ScrollMagic.Scene({	
	triggerElement: '#section-2',
	duration: '500%'
	//triggerHook: 'onLeave',
	//duration:'100%'
})
.on("progress", function (e) {
	$("#section-2 img").trigger("unveil");
})
.on("start", function (e) {
	var direction = e.target.controller().info("scrollDirection");
	if(direction == 'FORWARD'){
		//$("body > header").removeClass("yellow");
		//$("body > header").addClass("green");
	}else{
		//$("body > header").addClass("yellow");
		//$("body > header").removeClass("green");
	}
})
.setTween(opTween)
.setPin("#section-2")
//.addIndicators() // add indicators (requires plugin)

function opBuild(){
	opScene = new ScrollMagic.Scene({	
		triggerElement: '#section-2',
		duration: '500%'
		//triggerHook: 'onLeave',
		//duration:'100%'
	})
	.on("progress", function (e) {
		$("#section-2 img").trigger("unveil");
	})
	.on("start", function (e) {
		var direction = e.target.controller().info("scrollDirection");
		if(direction == 'FORWARD'){
			//$("body > header").removeClass("yellow");
			//$("body > header").addClass("green");
		}else{
			//$("body > header").addClass("yellow");
			//$("body > header").removeClass("green");
		}
	})
	.setTween(opTween)
	.setPin("#section-2")
	//.addIndicators() // add indicators (requires plugin)	
}


var comScene = new ScrollMagic.Scene({	
	triggerHook: 'onLeave',
	triggerElement: '#section-3',
	duration: '500%'
	//duration:'100%'
})
.on("progress", function (e) {
	$("#section-3 img").trigger("unveil");
})
.on("start", function (e) {
	var direction = e.target.controller().info("scrollDirection");
	if(direction == 'FORWARD'){
		//$("body > header").removeClass("green");
		//$("body > header").addClass("orange");
	}else{
		//$("body > header").addClass("green");
		//$("body > header").removeClass("orange");
	}
})
.setTween(comTween)
.setPin("#section-3")
//.addIndicators() // add indicators (requires plugin)

function comBuild(){
	comScene = new ScrollMagic.Scene({	
		triggerHook: 'onLeave',
		triggerElement: '#section-3',
		duration: '500%'	
	})
	.on("progress", function (e) {
	$("#section-3 img").trigger("unveil");
	})
	.on("start", function (e) {
	var direction = e.target.controller().info("scrollDirection");
	if(direction == 'FORWARD'){
		//$("body > header").removeClass("green");
		//$("body > header").addClass("orange");
	}else{
		//$("body > header").addClass("green");
		//$("body > header").removeClass("orange");
	}
	})
	.setTween(comTween)
	.setPin("#section-3")
	//.addIndicators() // add indicators (requires plugin)

}

var conScene = new ScrollMagic.Scene({	
	triggerHook: 'onLeave',
	triggerElement: '#section-4',
})
.on("start", function (e) {
	var direction = e.target.controller().info("scrollDirection");
	if(direction == 'FORWARD'){
		//$("body > header").removeClass("orange");
		//$("body > header").addClass("lightBlue");
	}else{
		//$("body > header").addClass("orange");
		//$("body > header").removeClass("lightBlue");
	}
})


function comBuild(){
	comScene = new ScrollMagic.Scene({	
		triggerHook: 'onLeave',
		triggerElement: '#section-3',
		duration: '500%'
		//duration:'100%'
	})
	.on("progress", function (e) {
		$("#section-3 img").trigger("unveil");
	})
	.on("start", function (e) {
		var direction = e.target.controller().info("scrollDirection");
		if(direction == 'FORWARD'){
			//$("body > header").removeClass("green");
			//$("body > header").addClass("orange");
		}else{
			//$("body > header").addClass("green");
			//$("body > header").removeClass("orange");
		}
	})
	.setTween(comTween)
	.setPin("#section-3")
	//.addIndicators() // add indicators (requires plugin)	
}

// get all slides
var slides = document.querySelectorAll("section.panel");

// create scene for every slide
function sceneInit(){  
	console.log('sceneInit');
	
	scene.offset(-75)
	opHeader.offset(-75)
	comHeader.offset(-75)
	conHeader.offset(-75)
				
	storyWidth  = 0 //resetsMath
	opWidth		= 0;
	comWidth	= 0;
	
	$(storyChild).each(function() { storyWidth += $(this).width(); }); 
	storyWidth += storyFirst;
	
	$(opChild).each(function() { opWidth += $(this).width(); }); 
	opWidth += opFirst;
	
	$(comChild).each(function() { comWidth += $(this).width(); }); 
	comWidth += comFirst;
		
	var storyParam = {x:-storyWidth, delay: 0.1};
	var opParam = {x:-opWidth-700,delay: 0.1};		
	var comParam = {x:-comWidth+400,delay: 0.1};		
	
	
	// reset progress to start so changes do not occur from current position but from start
	storyTween.progress(0)
	// set set new tween parameters
	storyTween.updateTo(storyParam, true);
	//setTriggerHook
	//storyScene.offset(350)
	storyScene.triggerHook('onLeave');
	// re-add tween to reset position and to update
	storyScene.setTween(storyTween);
	
	
	opTween.progress(0)
	opTween.updateTo(opParam, true);
	opScene.triggerHook('onLeave');
	opScene.setTween(opTween);
	
	comTween.progress(0)
	comTween.updateTo(comParam, true);
	comScene.triggerHook('onLeave');
	comScene.setTween(comTween);
	
	conScene.triggerHook('onLeave');
		
	console.log('storyWidth:'+ storyWidth);	
	console.log('opWidth:'+ opWidth);	
	console.log('comWidth:'+ comWidth);	
	

	storyScene.enabled(true);
	opScene.enabled(true);	
	comScene.enabled(true);
	conScene.enabled(true);
	
	// add a scene to a ScrollMagic Controller
	
	storyScene.addTo(storyControl);			
	opScene.addTo(opControl);			
	comScene.addTo(comControl);			
	conScene.addTo(conControl);
}  

//Change Header - Mobile
function mobileScenes(){  	
	
	scene.offset(-60)
	opHeader.offset(-60)
	comHeader.offset(-60)
	conHeader.offset(-60)
	
	mobileStory.triggerHook(0.08);
	mobileStory.enabled(true);
	//mobileStory.addIndicators();
	mobileStory.addTo(storyControl);
	
	mobileOp.triggerHook(0.08);
	mobileOp.enabled(true);
	//mobileOp.addIndicators();
	mobileOp.addTo(opControl);
	
	mobileCom.triggerHook(0.08);
	mobileCom.enabled(true);
	//mobileCom.addIndicators();
	mobileCom.addTo(comControl);
	
	mobileCon.triggerHook(0.08);
	mobileCon.enabled(true);
	//mobileCon.addIndicators();
	mobileCon.addTo(conControl);
}

function checkHeader(){
	console.log('checkHeader');	
	console.log('currentScroll: '+$(window).scrollTop());
	
	var curScroll = $(window).scrollTop()
	console.log(curScroll);
	
	if (isMobile.any()){
		
	}else{
	//DESKTOP
		
		if($(window).width() >= 769){
			console.log('CH: notMobile-769');
			
			setTimeout(function(){
				//$('body > header').attr('class', '');					
				
				
			if(curScroll > conScene.triggerPosition()){
				console.log('oONLY')
				//$('body > header').addClass('lightBlue');	
			}else if(curScroll > comScene.triggerPosition()){
				//$('body > header').addClass('orange');	
			}else if(curScroll > opScene.triggerPosition()){
				//$('body > header').addClass('green');	
			}else if(curScroll > storyScene.triggerPosition()){
				//$('body > header').addClass('yellow');	
			}
				
			},325)

								
		}else{		
			console.log('CH: notMobile-else');
			//resetHeader
			setTimeout(function(){
				//$('body > header').attr('class', '');	
			
			
			if(curScroll > mobileCon.triggerPosition()){
				console.log('oONLY')
				//$('body > header').addClass('lightBlue');	
			}else if(curScroll > mobileCom.triggerPosition()){
				//$('body > header').addClass('orange');	
			}else if(curScroll > mobileOp.triggerPosition()){
				//$('body > header').addClass('green');	
			}else if(curScroll > mobileStory.triggerPosition()){
				//$('body > header').addClass('yellow');	
			}
			
			},325)
						
		}
		
	}
	
	
}

// buildScenes for Desktop
if (isMobile.any()){
	console.log('Mobile');	
	mobileScenes();
}else{
	console.log('notMobile');
		
	if($(window).width() >= 769){
		console.log('notMobile-769');		
		sceneInit();				
		checkHeader();
	}else{		
		console.log('notMobile-else');
				
		
		mobileScenes();
		checkHeader();
	}
}

// debounced re-size event - less destroying and re-adding scenes
//var timeoutDuration = 1500;
//var resizeTimeout = null;
/*
window.addEventListener('resize', function(event) {	
	console.log('RESIZING!!!');
	
	if (resizeTimeout) {
		clearTimeout(resizeTimeout);
	}
	
	resizeTimeout = setTimeout(function() {
		//check windowSize
		
		if (isMobile.any()){
			//mobile device - do nothing
		}else{
		
			console.log('TIMEOUT:notMobile!!');			
			
			//checkWindowSize
			if($(window).width() >= 769){
				console.log('notMobile && GREATERthan 769? '+$(window).width());
				
				//mobileOp.destroy(true);			
				//mobileCom.destroy(true);				
				//mobileCon.destroy(true);							
				
				//destroy mobile
				
				//create desktop SCENES
				
				
				setTimeout(function(){
					//sceneInit();															
				}, 1000)
				
			}else if(($(window).width() <= 769)){
								
				console.log('notMobile && LESSthan 769? '+$(window).width());
					
				setTimeout(function(){										
					//storyScene.destroy(true);
					//opScene.destroy(true);
					//comScene.destroy(true);
					
					//mobileScenes();
					
				}, 1000)
				
			}
		}
	});	
		
}, timeoutDuration);
*/

$(window).smartresize(function(){
	console.log('resize!!');
	
	//checkWindowSize
	if($(window).width() >= 769){
		console.log('notMobile && GREATERthan 769? '+$(window).width());
		$('body > header').attr('class', '');
						
		//scenes destroyed?		
		if(storyScene == null){
			//create desktop SCENES	
			console.log('build??');			
			storyBuild();
			opBuild();
			comBuild();			
			console.log('init??');
			sceneInit();												
		}
		
		//mobileOp.destroy(true);			
		//mobileCom.destroy(true);				
		//mobileCon.destroy(true);							
		
		//destroy mobile
		
		//create desktop SCENES

		
		setTimeout(function(){
			//sceneInit();															
			checkHeader();
		}, 250)
		
	}else if(($(window).width() <= 769)){
						
		console.log('notMobile && LESSthan 769? '+$(window).width());
			
		setTimeout(function(){														
			storyScene.destroy(true);
			opScene.destroy(true);
			comScene.destroy(true);
			
			storyScene = null;						
			
			mobileScenes();
			
			checkHeader();
								
		}, 500)
		
	}

	
});


//Links
$('.menu-toggle').click(function(e) {	
	e.preventDefault();
	$('body > header').find('.box').fadeOut();
	
	console.log('menuClicked');
	
	var menuVisible = $('body').hasClass('menu-on');
	
	setTimeout(function(){
		$( "#menuTrigger" ).trigger( "click" );
		$('body > header').toggleClass('blue');
	}, 500)
	
	$('body').toggleClass('menu-on');	
	
	if(menuVisible){		
		$("body").enableScroll();		
		setTimeout(function(){
			$('body > header').find('.box').fadeIn();	
		},500)
	}else{
		$("body").disableScroll();
	}		
	
});
/*
$('.menu-toggle').on('click', function(e) {
	e.preventDefault();				
	
	console.log('clicked!!');
	var menuVisible = $('body').hasClass('menu-on');
	
	setTimeout(function(){
		$( "#foo" ).trigger( "click" );
	}, 500)
	
	if(menuVisible){
		
		$('body').toggleClass('menu-on');		
		
		$('body > header').css('background-color','transparent');

		$('#main-nav-overlay-legal').removeClass('legal-open');
		
		setTimeout(function(){
			//$('.shade').fadeToggle('fast');			
			$('body > header').attr('style','');	
		},500)	
		
	}else{
		
		//$('.shade').fadeToggle('fast');
		
		setTimeout(function(){		
			$('body').toggleClass('menu-on');				
		},75)	
	}
});
*/

$(document).on("click", "a[href^='#']", function (e) {				
		e.preventDefault();				
		var tempScrollTop = $(window).scrollTop();
		$(window).scrollTop(tempScrollTop);
		
		
		console.log('is this the menu?');								
		
		var id = $(this).attr("href");
		var menuVisible = $('body').hasClass('menu-on');
						
		
		if(menuVisible){				
			console.log(id);	
			console.log('menuVisible!!');
			
			//$('.shade').fadeOut();
			
			

			if($(this).attr('id') == 'legal'){							
				console.log('LEGAL');
								
				$('#main-nav-overlay-legal').toggleClass('legal-open');
				console.log($("#main-nav-overlay-legal").offset().top);
				$('#menu').animate({
					scrollTop: $("#main-nav-overlay-legal").offset().top
				}, 1000);
																	
			}else{
				
				console.log('notLEGAL');
				$('body').removeClass('menu-on'); 	
				
				$('html, body').animate({scrollTop: $(id).offset().top-45}, 100);
				
/*
				setTimeout(function(){
					
					$('#main-nav-overlay-legal').removeClass('legal-open');
					$('.shade').fadeOut();
					console.log('removeLegal');
				}, 125)			
*/
			}
		}else{	
			console.log('menuVisible ELSE');
										
			if($(this).attr('id') == 'legal'){		
				
				console.log('LEGAL');
								
				$('#main-nav-overlay-legal').toggleClass('legal-open');
				$('#menu').animate({
					scrollTop: $("#main-nav-overlay-legal").offset().top-60
				}, 1000);
								
			}else if($(this).attr('data-target')){
				console.log( $(this).data('target') );
				
				var linkParams = {x:0};
				var curSlide   = $(this).attr('data-current');
				var nextSlide  = '#section-'+$(this).data('target');						
				
				if(curSlide == 0){
					
					$('html, body').animate({scrollTop: $(id).offset().top}, 750, 'easeInOutQuint');
					
				}else if(curSlide == 1){				
					console.log('curSlide=1');
					console.log($(nextSlide).offset().top);
					storyWidth  = 0 //resetsMath					
					$(storyChild).each(function() { storyWidth += $(this).width(); }); 
					storyWidth += storyFirst;
														
					// reset progress to start so changes do not occur from current position but from start
					//storyTween.progress(0)
					// set set new tween parameters
					
					// re-add tween to reset position and to update
					
					//scroll to next
					setTimeout(function(){
						$('html, body').animate({scrollTop: $(nextSlide).offset().top}, 750, 'easeInOutQuint');						
					},250);			
					
				}else if(curSlide == 2){				
					console.log($(nextSlide).offset().top);
					opScene.enabled(false);				
					//scroll to next
					setTimeout(function(){
						$('html, body').animate({scrollTop: $(nextSlide).offset().top}, 750, 'easeInOutQuint');
						opScene.enabled(true);	
					},250);			
				}else if(curSlide == 3){		
					console.log($(nextSlide).offset().top);
					comScene.enabled(false);				
					//scroll to next
					setTimeout(function(){
						$('html, body').animate({scrollTop: $(nextSlide).offset().top}, 750, 'easeInOutQuint');
						
						setTimeout(function(){					
							comScene.enabled(true);	
						},100);			
					},250);			
				}else{
					$('html, body').animate({scrollTop: $(id).offset().top}, 750, 'easeInOutQuint');
				}							
			}
		}			
});


$(function () { // wait for document ready	
	console.log('READY');	
	
	$('#title .intro-text').imagesLoaded( { background: true }, function() {
	  setTimeout(function(){
		  $('.intro-text').addClass('loaded');
	  },500)
	});
	
	//header handler
	if (isMobile.any()){		
		
	}else{
		
	}

	
	//unveil global
	$("img").unveil(0, function(){
		$(this).load(function() {
		    this.style.opacity = 1;
		});			
	});	
});
