import { defineConfig } from '@playwright/test';

export default defineConfig({
    projects: [
        {
            name: 'chrome',
            use: {
            browserName: 'chromium',
            channel: 'chrome',
            },
        },
        ],
    testDir: './src/tests/e2e',
    use: {
        headless: false,
        baseURL: 'http://localhost:5173/',
        viewport: { width: 1280, height: 720 },
        screenshot: 'on',
        trace: 'on',
    },
    fullyParallel: true,
    workers: 4,
    retries: 1,
});
