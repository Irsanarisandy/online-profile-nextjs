import { defineConfig, defineSchema } from 'tinacms';

const schema = defineSchema({
  collections: [
    {
      label: 'Home',
      name: 'home',
      path: 'content/home',
      fields: [
        {
          type: 'string',
          label: 'Intro',
          name: 'intro',
          list: true
        }
      ]
    },
    {
      label: 'About',
      name: 'about',
      path: 'content/about',
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
          ui: {
            validate: (val) => {
              if (val == null || val.trim().length === 0) {
                return 'Title must not be empty!';
              }
            }
          }
        },
        {
          type: 'rich-text',
          label: 'Body',
          name: 'body',
          isBody: true
        },
        {
          type: 'object',
          label: 'Overall Web Skills',
          name: 'overallWebSkills',
          list: true,
          fields: [
            {
              type: 'string',
              label: 'Name',
              name: 'name'
            },
            {
              type: 'number',
              label: 'Percentage',
              name: 'percentage'
            },
            {
              type: 'string',
              label: 'Color',
              name: 'color',
              ui: {
                component: 'color'
              }
            }
          ]
        },
        {
          type: 'string',
          label: 'Frontend Skills',
          name: 'frontend',
          list: true
        },
        {
          type: 'string',
          label: 'Backend Skills',
          name: 'backend',
          list: true
        },
        {
          type: 'string',
          label: 'General Coding Skills',
          name: 'generalCoding',
          list: true
        },
        {
          type: 'string',
          label: 'Other Skills',
          name: 'others',
          list: true
        }
      ]
    },
    {
      label: 'Blog Posts',
      name: 'post',
      path: 'content/posts',
      format: 'mdx',
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
          ui: {
            validate: (val) => {
              if (val == null || val.trim().length === 0) {
                return 'Title must not be empty!';
              }
            }
          }
        },
        {
          type: 'datetime',
          label: 'Post Date & Time',
          name: 'postDateTime',
          ui: {
            dateFormat: 'DD/MM/YYYY h:mm a',
            validate: (val) => {
              if (val == null || val.trim().length === 0) {
                return 'Datetime must not be empty!';
              }
            }
          }
        },
        {
          type: 'string',
          label: 'Tags',
          name: 'tags',
          list: true
        },
        {
          type: 'string',
          label: 'Excerpt',
          name: 'excerpt',
          ui: {
            component: 'textarea',
            validate: (val) => {
              if (val == null || val.trim().length === 0) {
                return 'Excerpt must not be empty!';
              }
            }
          }
        },
        {
          type: 'image',
          label: 'Hero Image',
          name: 'heroImage'
        },
        {
          type: 'rich-text',
          label: 'Body',
          name: 'body',
          isBody: true
        }
      ]
    }
  ]
});

// https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
const branch = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || 'main';
const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const apiURL =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:4001/graphql'
    : `https://content.tinajs.io/content/${clientId}/github/${branch}`;

export const tinaConfig = defineConfig({
  apiURL,
  schema,
  documentCreatorCallback: {
    onNewDocument: ({ collection: { slug }, breadcrumbs }) => {
      const relativeUrl = `/${slug}s/${breadcrumbs.join('/')}`;
      return (window.location.href = relativeUrl);
    },
    filterCollections: (options) => {
      return options.filter((option) => option.label === 'Blog Posts');
    }
  },
  mediaStore: async () => {
    const pack = await import('next-tinacms-cloudinary');
    return pack.TinaCloudCloudinaryMediaStore;
  }
  // cmsCallback: (cms) => {
  //   /**
  //    * Enables experimental branch switcher
  //    */
  //   cms.flags.set("branch-switcher", true);
  //   /**
  //    * When `tina-admin` is enabled, this plugin configures contextual editing for collections
  //    */
  //   import("tinacms").then(({ RouteMappingPlugin }) => {
  //     const RouteMapping = new RouteMappingPlugin((collection, document) => {
  //       if (["authors", "global"].includes(collection.name)) {
  //         return undefined;
  //       }
  //       if (["pages"].includes(collection.name)) {
  //         if (document.sys.filename === "home") {
  //           return `/`;
  //         }
  //         if (document.sys.filename === "about") {
  //           return `/about`;
  //         }
  //         return undefined;
  //       }
  //       return `/${collection.name}/${document.sys.filename}`;
  //     });
  //     cms.plugins.add(RouteMapping);
  //   });
  //   return cms;
  // },
  // formifyCallback: ({ formConfig, createForm, createGlobalForm }) => {
  //   if (formConfig.id === "content/global/index.json") {
  //     return createGlobalForm(formConfig);
  //   }
  //   return createForm(formConfig);
  // },
});

export default schema;
