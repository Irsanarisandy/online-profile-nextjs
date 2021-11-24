const SEO = {
  defaultTitle: "Irsan's Online Profile",
  // description: "This is my Next.js TypeScript Tailwind Site",
  favicon: "/favicon.ico",
  additionalMetaTags: [
    {
      property: "author",
      content: "Irsan Arisandy"
    },
    {
      property: "keywords",
      content: "irsan arisandy, online profile, online portfolio, online cv"
    }
  ],
  // twitter: {
  //   cardType: "summary",
  //   handle: "jhooks",
  //   site: "jhooks"
  // },
  openGraph: {
    title: "Irsan's Online Profile",
    type: "website",
    site_name: "Irsan's Online Profile",
    profile: {
      firstName: "Irsan",
      lastName: "Arisandy",
      gender: "male"
    },
    // images: [
    //   {
    //     url: "/images/og.jpg",
    //     width: 1280,
    //     height: 720
    //   }
    // ]
  }
};

export default SEO;
