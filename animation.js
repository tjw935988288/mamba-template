import animations from 'create-keyframe-animation'

// this creates the animation above
animations.registerAnimation({
  name: 'move',
  // the actual array of animation changes
  animation: [
	[0,0], 
	[1,1]
  ],
  // optional presets for when actually running the animation
  presets: {
    duration: 1000,
    easing: 'linear',
    delay: 500
  }
})

const ball = document.querySelector('.ball')

// then run it
animations.runAnimation(ball, 'move', function () {
	// callback gets called when its done
})
