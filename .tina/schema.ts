import { defineSchema } from '@tinacms/cli';

export default defineSchema({
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
        },
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
          name: 'title'
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
            },
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
        },
      ]
    },
  ]
});
