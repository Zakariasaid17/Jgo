import { Metadata, MetadataRoute } from "next";
import { userAgent } from "next/server";

export default function robots(): MetadataRoute.Robots {

    return {

        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: "/admin"

            }
        ],
        sitemap: 'https://jihawigo.com/sitemap.xml'
    }
}