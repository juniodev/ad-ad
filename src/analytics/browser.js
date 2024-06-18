import CryptoBrowser from '../utils/encrypt/encrypt.js'

class AnalyticsBrowser {

  client

  constructor() {}

  getClient() {
    const crypt = new CryptoBrowser()
    return crypt.encrypt(JSON.stringify(
      this.#browserCheck()
    ))
  }

  #browserCheck() {
    let client = {};
    const navigator = window.navigator;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    client.location = {
      href: window.location.href,
      referrer: document.referrer
    };

    client.navigator = {
      cookie_enabled: navigator.cookieEnabled,
      platform: navigator.platform,
      language: navigator.language,
      user_agent: navigator.userAgent,
      app_version: navigator.appVersion,
      screen: {
        width: window.screen.width,
        height: window.screen.height
      },
      window: {
        inner_width: window.innerWidth,
        inner_height: window.innerHeight
      },
      plugins: Array.from(navigator.plugins).map(plugin => plugin.name),
      performance_timing: performance && performance.timing ? performance.timing: null,
      network_info: connection ? {
        downlink: connection.downlink,
        effective_type: connection.effectiveType,
        rtt: connection.rtt,
        save_data: connection.saveData
      }: null,
      cookies: document.cookie
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        client.navigator.geolocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
      });
    }

    window.addEventListener('mousemove', (event) => {
      client.mouse_position = {
        x: event.clientX,
        y: event.clientY
      };
    });

    window.addEventListener('click', (event) => {
      client.last_click = {
        x: event.clientX,
        y: event.clientY,
        element: event.target.tagName
      };
    });

    window.addEventListener('keydown', (event) => {
      client.last_keydown = {
        key: event.key,
        code: event.code
      };
    });

    client.session_start = new Date();
    window.addEventListener('beforeunload', () => {
      client.session_end = new Date();
      client.session_duration = client.session_end - client.session_start;
    });

    window.addEventListener('scroll', () => {
      client.scroll_position = {
        top: window.scrollY,
        left: window.scrollX
      };
    });

    window.addEventListener('focus', () => {
      client.window_focused = true;
    });
    window.addEventListener('blur', () => {
      client.window_focused = false;
    });

    client.latency = {
      start: performance.now(),
      end: null
    };
    window.addEventListener('load', () => {
      client.latency.end = performance.now();
      client.latency.total = client.latency.end - client.latency.start;
    });

    client.navigation_history = [];
    window.addEventListener('popstate', (event) => {
      client.navigation_history.push({
        url: window.location.href,
        timestamp: new Date()
      });
    });

    client.device_type = /Mobi|Tablet|iPad|iPhone/.test(navigator.userAgent) ? 'mobile': 'desktop';
    return client
  }

}

const r = new AnalyticsBrowser()
console.log(r.getClient())

export default AnalyticsBrowser