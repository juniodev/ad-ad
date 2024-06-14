const infoIcon = `
<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
<path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" />
`

const closeIcon = `
<path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
`

const nextIcon = `
<svg
viewBox="0 0 465 1000"
fill="currentColor"
height="1em"
width="1em"
>
<path d="M13 870l358-370L13 128c-17.333-17.333-17.333-33.333 0-48 17.333-17.333 33.333-17.333 48 0l392 394c16 17.333 16 34 0 50L61 918c-14.667 17.333-30.667 17.333-48 0-17.333-14.667-17.333-30.667 0-48" />
</svg>
`

const letters = 'qwer_tyuioP_OIUYT_REWQpasdf_ghjklL_KJHGFDSAzxcvbnmMNBVCXZ'

const idClass = len => {
  const chars = letters.split("");
  let str = "";
  for (let i = 0; i < len; i++) {
    const r = Math.floor(Math.random() * chars.length);
    str += chars[r];
  }
  return str;
};

class AdBox {

  _class

  constructor(options) {
    this._class = idClass(8)
    this.options = options;
    this.element = this._createBox()
  }

  _createBox() {

    const box = document.createElement('div');

    box.classList.add(this._class)

    box.style.width = this.options.width ?? '300px'
    box.style.height = this.options.height ?? '250px'
    box.style.background = this.options.background ?? 'white'
    box.style.boxSizing = 'border-box'
    box.style.position = 'relative'
    box.style.border = '1px solid rgba(0,0,0,.1)'
    box.style.overflow = 'hidden'

    const div = document.createElement('div')
    div.style.height = '75%'
    div.style.width = '100%'

    const img = document.createElement('img')
    img.style.height = '100%'
    img.style.width = '100%'
    img.style.objectFit = 'container'
    img.src = this.options.src

    div.appendChild(img)

    const options = this._options()

    const details = this._details()

    box.appendChild(div)
    box.appendChild(options)
    box.appendChild(details)
    return box
  }

  _options() {
    const options = document.createElement('div')

    options.style.height = '25px'
    options.style.margin = '2px'
    options.style.position = 'absolute'
    options.style.top = '0'
    options.style.right = '0'
    options.style.display = 'flex'
    options.style.color = 'rgba(0,0,0,.5)'
    options.style.overflow = 'hidden'

    const close = this._createOptionBtn(
      closeIcon, () => {
        alert(this._class)
      }
    )

    const help = this._createOptionBtn(infoIcon)

    options.appendChild(help)
    options.appendChild(close)
    return options
  }

  _details() {
    const details = document.createElement('div')
    details.style.width = '100%'
    details.style.height = '25%'
    details.style.padding = '6px 10px'
    details.style.display = 'flex'
    details.style.justifyContent = 'space-between'
    details.style.alignItems = 'center'
    details. style.boxSizing = 'border-box'

    const texts = document.createElement('div')
    
    texts.style.height = '100%'

    const title = document.createElement('h2')
    title.textContent = 'Fortune tiger'
    title.style.margin = '0'
    title.style.color = '#333'
    texts.appendChild(title)

    const siteName = document.createElement('spa')
    siteName.textContent = 'galera.bet'
    siteName.style.color = 'rgba(0,0,0,.7)'
    texts.appendChild(siteName)

    const action = document.createElement('div')

    action.style.width = '40px'
    action.style.height = '40px'
    action.style.borderRadius = '100%'
    action.style.background = '#333'
    action.style.fontSize = '1.8rem'
    action.style.display = 'flex'
    action.style.alignItems = 'center'
    action.style.justifyContent = 'center'
    action.style.overflow = 'hidden'
    action.style.color = 'white'
    action.innerHTML = nextIcon

    action.addEventListener('click', () => {
      window.open('https://galera.bet', '_blank');
    })

    details.appendChild(texts)
    details.appendChild(action)
    return details
  }

  _createOptionBtn(icon, onFunction) {
    const btn = document.createElement('div')
    btn.style.height = '13px'
    btn.style.width = '13px'
    btn.style.padding = '2px'
    btn.style.display = 'flex'
    btn.style.alignItems = 'center'
    btn.style.justifyContent = 'center'
    btn.style.background = 'white'
    btn.innerHTML = `
    <svg
    viewBox="0 0 1024 1024"
    fill="currentColor"
    height="1em"
    width="1em"
    >${icon}</svg>`
    btn.addEventListener('click', onFunction)
    return btn
  }

  render(element) {
    element.appendChild(this.element)
  }

}

const ad = new AdBox( {
  src: 'https://i.ibb.co/yS9zBkk/images.jpg'
})
ad.render(document.body)