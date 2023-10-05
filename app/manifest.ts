import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Moneytor",
    short_name: "Moneytor",
    description: "Manage your finances with ease using Moneytor.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#1d1d1d",
    theme_color: "#1d1d1d",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-large.png",
        sizes: "600x600",
        type: "image/png",
      },
    ],
  };
}
