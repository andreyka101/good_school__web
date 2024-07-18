import {resolve} from 'path'
export default {
  // base: '/y/',
  build: {
    rollupOptions: {
      input: {
        // @ts-ignore
        main: resolve('index.html'),
        entrance: resolve('entrance.html'),
        items: resolve('items.html'),
        prices: resolve('prices.html'),
        registration: resolve('registration.html'),
        tutors: resolve('tutors.html'),
      }
    }
  }
}