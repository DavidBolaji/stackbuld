import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: "https://https://bolaji-stackbuld-test.netlify.app/sitemap.xml"
    }
}