import Intertitial from './intertitial.js'

const options = {
  title: 'Kwai - vídeos bacanas',
  description: 'Junte-se à comunidade Kwai e descubra vídeos incríveis, engraçados e inspiradores. Compartilhe seus momentos e divirta-se!',
  icon: 'https://micael-storage-production.up.railway.app/uploads/icons/d381ec33-fe91-4a0b-832e-ab39e56800aa.png',
  linkAction: 'https://play.google.com/store/apps/details?id=com.kwai.video',
  style: {
    title: 'Descubra vídeos incríveis',
    buttonColor: 'white',
    buttonBackgroundColor: '#FF5722'
  }
}

document.addEventListener('DOMContentLoaded', function() {

  const ad = new Intertitial(options)

  document.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      ad.render(document.body, link.href)
    })
  })
});