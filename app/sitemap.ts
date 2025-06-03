import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nirveonx.com";

  // Main routes from your navigation
  const routes = ["", "/pet-ai", "/healthmate", "/goldencare", "/mindease"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  return [...routes];
}
