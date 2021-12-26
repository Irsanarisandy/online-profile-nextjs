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
  ]
});
