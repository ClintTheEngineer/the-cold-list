export const Constants = {
    SERVER_URL: (() => {
        const currentBaseUrl = window.location.hostname;
        if (currentBaseUrl === 'the-cold-list.netlify.app') {
            return 'https://ice-server.onrender.com';
        } else {
            return 'http://localhost:8080';
        }
    })(),
    APP_NAME: 'CanderDB'
}