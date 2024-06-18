import {
  infoIcon,
  closeIcon,
  nextIcon
} from './icons/svgs.js';

import AnalyticsBrowser from './analytics/browser.js'

class AdBox extends AnalyticsBrowser {
  constructor(options = {}) {
    super();
    this.options = options;
    this.element = this._createBox();
    this._teste()
  }

  _teste() {
    //const analytics = new AnalyticsBrowser()
    //console.log(analytics.getClient())
  }

  _createBox() {
    let box = document.createElement('div');

    Object.assign(box.style, {
      width: this.options.width || '300px',
      height: this.options.height || '250px',
      background: this.options.background || 'white',
      boxSizing: 'border-box',
      position: 'relative',
      border: '1px solid rgba(0,0,0,.1)',
      margin: 'auto',
      overflow: 'hidden'
    });

    const div = document.createElement('div');
    Object.assign(div.style, {
      height: '75%',
      width: '100%'
    });

    const img = document.createElement('img');
    Object.assign(img.style, {
      height: '100%',
      width: '100%',
      objectFit: 'cover'
    });
    img.src = this.options.src || '';

    div.appendChild(img);

    const options = this._options();
    const details = this._details();

    box.appendChild(div);
    box.appendChild(options);
    box.appendChild(details);
    return box;
  }

  _options() {
    const options = document.createElement('div');
    Object.assign(options.style, {
      height: '25px',
      margin: '2px',
      position: 'absolute',
      top: '0',
      right: '0',
      display: 'flex',
      color: 'rgba(0,0,0,.5)',
      overflow: 'hidden'
    });

    const close = this._createOptionBtn(closeIcon, () => {
      alert('close ad');
    });

    const help = this._createOptionBtn(infoIcon);

    options.appendChild(help);
    options.appendChild(close);
    return options;
  }

  _details() {
    const details = document.createElement('div');
    Object.assign(details.style, {
      width: '100%',
      height: '25%',
      padding: '6px 10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxSizing: 'border-box'
    });

    const texts = document.createElement('div');
    Object.assign(texts.style, {
      height: '100%'
    });

    const title = document.createElement('h2');
    title.textContent = 'Fortune tiger';
    Object.assign(title.style, {
      margin: '0',
      color: '#333'
    });
    texts.appendChild(title);

    const siteName = document.createElement('span');
    siteName.textContent = 'galera.bet';
    siteName.style.color = 'rgba(0,0,0,.7)';
    texts.appendChild(siteName);

    const action = document.createElement('div');
    Object.assign(action.style, {
      width: '40px',
      height: '40px',
      borderRadius: '100%',
      background: '#333',
      fontSize: '1.3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      color: 'white'
    });
    action.innerHTML = nextIcon;

    action.addEventListener('click', () => {
      window.open('https://galera.bet', '_blank');
    });

    details.appendChild(texts);
    details.appendChild(action);
    return details;
  }

  _createOptionBtn(icon, onFunction = () => {}) {
    const btn = document.createElement('div');
    Object.assign(btn.style, {
      height: '13px',
      width: '13px',
      padding: '2px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white'
    });
    btn.innerHTML = `
    <svg viewBox="0 0 1024 1024" fill="currentColor" height="1em" width="1em">${icon}</svg>
    `;
    return btn;
  }

  render() {
    const ctn = document.getElementById('adby_ad');
    ctn.innerHTML = '';
    ctn.appendChild(this.element);
  }
}

const ad = new AdBox( {
  src: 'https://i.ibb.co/yS9zBkk/images.jpg'
})

ad.render();