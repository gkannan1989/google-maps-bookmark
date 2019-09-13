export default function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      if (
        process.env.NODE_ENV === 'production' &&
        'serviceWorker' in navigator
      ) {
        navigator.serviceWorker
          .register('sw.js')
          .then(
            registration => {
              // Registration was successful
              console.log(
                'ServiceWorker registration successful with scope: ',
                registration.scope,
              );
            },
            err => {
              // registration failed :disappointed:
              console.log('ServiceWorker registration failed: ', err);
            },
          )
          .catch(err => {
            console.log(err);
          });
      }
    });
  } else {
    console.log('service worker is not supported');
  }
}
