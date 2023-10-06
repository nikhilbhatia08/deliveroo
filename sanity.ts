import SanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = SanityClient({
    projectId: '86cqlxam',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2021-10-21'
});

const build = imageUrlBuilder(client);

export const urlFor = (source: any) => build.image(source);
export default client;