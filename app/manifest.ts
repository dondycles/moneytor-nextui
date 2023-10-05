import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Moneytor",
    short_name: "Moneytor",
    description: "Manage your finances with ease using Moneytor.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
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
