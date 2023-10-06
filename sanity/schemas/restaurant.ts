import {defineField, defineType, validation} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string",
      title: "Restaurant name",
      validation: Rule => Rule.required(),
    },
    {
      name: "short_description",
      type: "string",
      title: "Short description",
      validation: Rule => Rule.required(),
    },
    {
      name: "image",
      type: "image",
      title: "Image",
    },
    {
      name: "lat",
      type: "number",
      title: "Latitude of that restaurant",
    },
    {
      name: "long",
      type: "number",
      title: "Longitude of that restaurant",
    },
    {
      name: "address",
      type: "string",
      title: "Address",
    },
    {
      name: "rating",
      type: "number",
      title: "Enter a rating between 1 and 5",
      validation: Rule => Rule.required().min(1).max(5).error('Rating must be between 1 and 5'),
    },
    {
      name: "type",
      title: "category",
      validation: Rule => Rule.required(),
      type: "reference",
      to: [{type: "category"}]
    },
    {
      name: "dishes",
      type: "array",
      title: "Dishes",
      of: [{type: "reference", to: [{type: "dish"}]}]
    }
    
  ],
})