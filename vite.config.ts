import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default {
  plugins: [react()],
  base: '/Text2Book/',
  test: {
    globals: true,
    environment: 'jsdom',
  },
};
