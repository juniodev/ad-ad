import {
  close
} from './svgs/close.js'

class Intertitial {
  constructor() {}

  #createAd() {

    const ctn = document.createElement('div')

    Object.assign(ctn.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '100',
      backgroundColor: 'rgba(0, 0, 0, .75)'
    })

    const closeBtn = document.createElement('div')
    closeBtn.innerHTML = close

    Object.assign(closeBtn.style, {
      position: 'absolute',
      right: '10px',
      top: '10px',
      fontSize: '1.6rem',
      color: 'white',
      display: 'flex',
      alignItems: 'center'
    })
    
    const ad = document.createElement('div')
    
    Object.assign(ad.style, {
      height: '50%',
      width: '70%',
      position: 'absolute',
      right: '0',
      left: '0',
      top: '0',
      bottom: '0',
      margin: 'auto',
      backgroundColor: '#f2f5fa'
    })
    
    ctn.appendChild(ad)

    /* const top = this.#topAd( {
      title: 'Kwai - vídeos curto'
    })*/

    ctn.appendChild(closeBtn)
    return ctn
  }

  #topAd( {
    title
  }) {

    // const ctn = document.createElement('div')



    //  ctn.appendChild(titleEl)
    // ctn.appendChild(closeBtn)

    // return ctn
  }

  render(element) {

    const ad = this.#createAd()

    document.body.style.overflow = 'hidden'

    element.appendChild(ad)
  }
}

export default Intertitial