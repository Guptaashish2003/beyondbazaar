import { useGetData } from "@/redux/api/useGetData";

export const dynamic = "force-dynamic";
export default async function sitemap() {
  const baseUrl = process.env.FrontendURL;

  const {data} = await useGetData("/product/sitemapProduct");
  const postUrls = data.map((post) => ({
    url: `${baseUrl}/single-product/${post.slug}`,
    lastModified: post.updatedAt,
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/login`, lastModified: new Date() },
    { url: `${baseUrl}/register`, lastModified: new Date() },
    { url: `${baseUrl}/contact-us`, lastModified: new Date() },
    { url: `${baseUrl}/our-services`, lastModified: new Date() },

    ...postUrls,
  ];
}


