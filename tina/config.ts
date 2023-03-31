import { defineConfig } from 'tinacms';

const config = defineConfig({
  schema: {
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
        ],
        ui: {
          router: () => {
            return '/';
          }
        }
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
              validate: (value: string) => {
                if (value == null || value.trim().length === 0) {
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
            label: 'Overall Dev Skills',
            name: 'overallDevSkills',
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
        ],
        ui: {
          router: () => {
            return '/about';
          }
        }
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
              validate: (value: string) => {
                if (value == null || value.trim().length === 0) {
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
              validate: (value: string) => {
                if (value == null || value.trim().length === 0) {
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
              validate: (value: string) => {
                if (value == null || value.trim().length === 0) {
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
        ],
        ui: {
          router: ({ document }) => {
            return `/posts/${document._sys.filename}`;
          }
        }
      }
    ]
  },
  // https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
  branch: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || 'main',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID as string,
  token: process.env.TINA_TOKEN as string,
  media: {
    loadCustomStore: async () => {
      const pack = await import('next-tinacms-cloudinary');
      return pack.TinaCloudCloudinaryMediaStore as any;
    }
  },
  build: {
    publicFolder: 'public',
    outputFolder: 'admin'
  }
});

export default config;
