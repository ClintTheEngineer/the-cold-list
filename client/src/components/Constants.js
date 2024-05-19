export const Constants = {
    SERVER_URL: (() => {
        const currentBaseUrl = window.location.hostname;
        if (currentBaseUrl === 'https://the-cold-list.netlify.app') {
            return 'https://cander-db.com';
        } else {
            return 'http://localhost:8080';
        }
    })(),
    APP_NAME: 'CanderDB'
}