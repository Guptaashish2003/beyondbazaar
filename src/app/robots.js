export default function robots() {

    return {
      rules: {
        userAgent: '*',
        allow: ['/single-product/*','/about/*', '/','/login','/refister','/forgot-password'],
        disallow: ['/adminstrative/*','/address/*','/checkout/*','/review/*','/user/*'],
      },
      sitemap: `${process.env.FrontendURL}/sitemap.xml`,
    }
  }