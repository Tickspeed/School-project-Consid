import { defineConfig } from 'astro/config';
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    server: {
        host: '0.0.0.0'
      },
    integrations: [icon()],
});