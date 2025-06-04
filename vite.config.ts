import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/blackjack2/', // ここはリポジトリ名に合わせてください
  plugins: [react()]
})
