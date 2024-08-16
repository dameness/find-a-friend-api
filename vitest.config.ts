import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
export default defineConfig({
  test: {
    globals: true,
    reporters: 'verbose',
    //environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
    dir: 'src',
  },
  plugins: [tsconfigPaths()],
});
