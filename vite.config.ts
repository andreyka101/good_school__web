import {resolve} from 'path'
export default {
  base: '/lesson-3j/',
  build: {
    rollupOptions: {
      input: {
        // @ts-ignore
        main: resolve(__dirname, 'index.html'),
      }
    }
  }
}