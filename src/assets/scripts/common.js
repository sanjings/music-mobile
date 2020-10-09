import fastclick from 'fastclick'

fastclick.attach(document.body)

document.documentElement.addEventListener('touchmove', (event) => {
   if (event.touches.length > 1) {
      event.preventDefault()
   }
}, false)