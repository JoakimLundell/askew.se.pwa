module.exports = {
    pwa: {
        name: "Askew App",
        themeColor: "#363636",
        msTileColor: "#363636",
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: '#363636',
        display: 'standalone',
        iconPaths: {
            
                faviconSVG: 'img/icons/favicon.svg',
                favicon32: 'img/icons/favicon-32x32.png',
                favicon16: 'img/icons/favicon-16x16.png',
                appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
                maskIcon: 'img/icons/safari-pinned-tab.svg',
                msTileImage: 'img/icons/msapplication-icon-144x144.png'
              
        },
        manifestOptions: {
            background_color: "red"
        }
    }
}