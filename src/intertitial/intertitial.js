import {
  close
} from './svgs/close.js'
import {
  hand
} from './svgs/hand.js'

class Intertitial {
  
  #destination

  constructor(options) {
    this.options = options
  }

  #createAd() {

    const ctn = document.createElement('article')

    Object.assign(ctn.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '100',
      userSelect: 'none',
      fontFamily: 'sans-serif',
      backgroundColor: 'rgba(0, 0, 0, .75)'
    })

    const closeBtn = document.createElement('div')
    closeBtn.innerHTML = close

    closeBtn.addEventListener('click', () => {
      window.location.href = this.#destination
      //ctn.remove()
      //document.body.style.overflow = ''
    })

    Object.assign(closeBtn.style, {
      position: 'absolute',
      right: '10px',
      top: '10px',
      fontSize: '1.6rem',
      color: 'white',
      display: 'flex',
      alignItems: 'center'
    })

    const adDetails = this.#adDetails(this.options)

    const action = this.#btnAction(this.options)
    adDetails.appendChild(action)

    ctn.appendChild(closeBtn)
    ctn.appendChild(adDetails)
    return ctn
  }

  #btnAction( {
    linkAction,
    style: {
      title,
      buttonColor,
      buttonBackgroundColor
    }
  }) {

    const actionDiv = document.createElement('div')

    const btn = document.createElement('button')

    Object.assign(btn.style, {
      width: '100%',
      height: '55px',
      padding: '0 12px',
      marginTop: '25px',
      fontSize: '1.1rem',
      border: 'none',
      fontWeight: '500',
      borderRadius: '6px',
      color: buttonColor,
      backgroundColor: buttonBackgroundColor
    })

    btn.textContent = title
    
    btn.addEventListener('click', () => {
      window.location.href = linkAction
    })

    const handDiv = document.createElement('div')

    Object.assign(handDiv.style, {
      position: 'absolute',
      top: '93%',
      right: '-25px',
      transform: 'translateY(-90%) rotate(60deg)',
      fontSize: '40px',
      color: 'white',
      animation: 'float 2s infinite'
    })

    handDiv.innerHTML = hand
    actionDiv.appendChild(handDiv)

    actionDiv.appendChild(btn)

    return actionDiv
  }

  #adDetails( {
    icon,
    title,
    description
  }) {

    const box = document.createElement('div')

    Object.assign(box.style, {
      height: '70%',
      width: '70%',
      position: 'absolute',
      right: '0',
      left: '0',
      top: '0',
      bottom: '0',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    })

    const ad = document.createElement('div')

    Object.assign(ad.style, {
      height: '100%',
      width: '100%',
      padding: '15px 0',
      borderRadius: '6px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'rgba(0,0,0,.7)',
      textAlign: 'center',
      overflow: 'hidden',
      backgroundColor: 'white'
    })

    const report = this.#reportAd()
    ad.appendChild(report)

    const adInfo = document.createElement('div')

    adInfo.innerText = 'Patrocinado'

    Object.assign(adInfo.style, {
      padding: '5px 10px',
      position: 'absolute',
      top: '0',
      left: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '.7rem',
      borderBottomRightRadius: '5px',
      borderTopLeftRadius: '5px',
      color: 'white',
      backgroundColor: 'orange'
    })
    ad.appendChild(adInfo)

    const style = document.createElement('style')
    style.textContent = `
    @keyframes bounce {
    0%, 25%, 55%, 75%, 100% {transform: translateY(0);}
    40% {transform: translateY(-15px);}
    60% {transform: translateY(-5px);}
    }
    @keyframes float {
    0%, 100% {
    transform: translateY(-10%) rotate(30deg);
    }
    50% {
    transform: translateY(-15%) rotate(35deg);
    }
    }
    `
    document.head.appendChild(style)

    const ctnIcon = document.createElement('div')

    Object.assign(ctnIcon.style, {
      height: '120px',
      width: '120px',
      margin: '20px 0',
      borderRadius: '8px',
      animationName: 'bounce',
      animationDuration: '1s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
      overflow: 'hidden'
    })

    const img = document.createElement('img')

    img.src = icon
    img.alt = 'ads image icon'
    Object.assign(img.style, {
      width: '100%',
      objectFit: 'cover'
    })
    ctnIcon.appendChild(img)
    ad.appendChild(ctnIcon)

    const adTitle = document.createElement('h1')
    Object.assign(adTitle.style, {
      padding: '0 12px',
      margin: '0'
    })

    adTitle.textContent = title

    ad.appendChild(adTitle)

    const adDescription = document.createElement('p')
    adDescription.textContent = description

    Object.assign(adDescription.style, {
      padding: '0 10px',
      fontSize: '.9rem'
    })

    ad.appendChild(adDescription)

    box.appendChild(ad)
    return box
  }

  #reportAd() {
    const report = document.createElement('a')

    report.textContent = 'Report'
    report.href = this.linkAction

    Object.assign(report.style, {
      padding: '2px 8px',
      borderRadius: '3px',
      display: 'block',
      position: 'absolute',
      backgroundColor: '#4682B4',
      color: 'white',
      bottom: '15%',
      right: '5px',
      fontSize: '.8rem',
      textDecoration: 'none'
    })

    return report
  }

  render(element, destination) {
    this.#destination = destination
    
    const meta = document.createElement('meta')
    meta.name = 'theme-color'
    meta.media = '(prefers-color-scheme: light)'
    meta.content = this.options.style.buttonBackgroundColor
    document.head.appendChild(meta)
    
    const ad = this.#createAd()

    document.body.style.overflow = 'hidden'

    element.appendChild(ad)
  }
}

export default Intertitial