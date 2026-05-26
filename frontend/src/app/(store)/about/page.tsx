import { AboutClient } from "./about-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Plantainz",
  description: "Learn about the heritage and tradition behind Plantainz, bringing you the authentic taste of Kerala banana chips.",
};

export default function AboutPage() {
  return <AboutClient />;
}
