import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from './Input';

import { InputWithPreview } from './InputWithPreview';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basics/InputWithPreview',
  component: InputWithPreview,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof InputWithPreview>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputWithPreview> = (args) => (
  <div className="overflow-hidden m-5">
    <InputWithPreview {...args} />
  </div>
);

export const NoTracks = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NoTracks.args = {
  tracks: [],
};

export const ManyTracks = Template.bind({});
ManyTracks.args = {
  tracks: [
    {
      spotifyTrackId: '464F2a58LTaitVUFKvEm1J',
      trackName: 'Dirty Dancing',
      artistName: 'Glockenbach, ÁSDÍS',
      albumName: 'Dirty Dancing',
      albumImageThumbnailUrl: 'https://i.scdn.co/image/ab67616d00004851062098ba779d17c7da6bc800',
    },
    {
      spotifyTrackId: '0NI1XCV3cefLu9sZ8a61Fg',
      trackName: "Asdasdasdasd (Let's Start a Riotttt)",
      artistName: 'plaksa',
      albumName: 'Asdasdasd',
      albumImageThumbnailUrl: 'https://i.scdn.co/image/ab67616d000048518d0354145f0cab3cd4c806da',
    },
    {
      spotifyTrackId: '42Rzf70H0cM88EDU5YV0cq',
      trackName: 'Andas',
      artistName: 'Noa Sandberg',
      albumName: 'Andas',
      albumImageThumbnailUrl: 'https://i.scdn.co/image/ab67616d00004851f4d088e0accb6abe8b7fd011',
    },
    {
      spotifyTrackId: '1bDVoZRHa9kDOzuH2ZmoXn',
      trackName: 'Asdasd',
      artistName: 'Lisergia',
      albumName: 'La condición humana',
      albumImageThumbnailUrl: 'https://i.scdn.co/image/ab67616d0000485170e9af6391c72e49a382674a',
    },
    {
      spotifyTrackId: '7zoK9VKrhpnm3LAZPgh2au',
      trackName: 'Assassin',
      artistName: 'Bushido',
      albumName: 'Sonny Black 2',
      albumImageThumbnailUrl: 'https://i.scdn.co/image/ab67616d00004851a71f3d3fa654f6f8aa7513fd',
    },
    {
      spotifyTrackId: '6fH5s0B1pfNwZIbSJaeuPZ',
      trackName: 'Asdasd',
      artistName: 'Shonjo Jelvey',
      albumName: 'Traditional Electronic Beat Tape',
      albumImageThumbnailUrl: 'https://i.scdn.co/image/ab67616d000048512e2214d7a0f27049b2d04546',
    },
    {
      spotifyTrackId: '1xjvIE3l0BACb24sF2TpPH',
      trackName: 'Assassin',
      artistName: 'Sultan + Shepard',
      albumName: 'Assassin',
      albumImageThumbnailUrl: 'https://i.scdn.co/image/ab67616d0000485167740f1dd8ad94be561ed9f4',
    },
    {
      spotifyTrackId: '6QIYQkpCr978Od4JmGvFVY',
      trackName: 'Asdasda',
      artistName: 'Martense',
      albumName: "Landlady's Piss/ed",
      albumImageThumbnailUrl: 'https://i.scdn.co/image/ab67616d00004851e4f0c0cfe9b7cf869527e12c',
    },
    {
      spotifyTrackId: '23WI5V2eD4EyGKxSl7Pyeq',
      trackName: 'Andas En Mi Cabeza',
      artistName: 'Chino & Nacho, Daddy Yankee',
      albumName: 'Andas En Mi Cabeza',
      albumImageThumbnailUrl: 'https://i.scdn.co/image/ab67616d000048516df5cc472d61a635abab06cf',
    },
    {
      spotifyTrackId: '7wmdibiIjD2v7WbPO9pH4Z',
      trackName: 'asdasd',
      artistName: 'rito',
      albumName: 'asdasd',
      albumImageThumbnailUrl: 'https://i.scdn.co/image/ab67616d00004851c187a76c47d100917c0dfdd8',
    },
    {
      spotifyTrackId: '6enLk2V2s0M6D6PGLjHxYv',
      trackName: "Assassin's Creed IV Black Flag Main Theme",
      artistName: 'Brian Tyler',
      albumName: "Assassin's Creed 4: Black Flag (Original Game Soundtrack)",
      albumImageThumbnailUrl: 'https://i.scdn.co/image/ab67616d00004851c6d155c7dc4f59e7d61f5859',
    },
    {
      spotifyTrackId: '6iF3o1II7W7VaqHMZG3d04',
      trackName: 'Asdasd',
      artistName: 'LMBECIL',
      albumName: 'Asdasd',
      albumImageThumbnailUrl: 'https://i.scdn.co/image/ab67616d00004851f42504b5150f32e4bfd920dd',
    },
    {
      spotifyTrackId: '2WRA3mg4LgWUqcCYdtWUDi',
      trackName: 'Assassine',
      artistName: 'Kollegah',
      albumName: 'Imperator (Deluxe Edition)',
      albumImageThumbnailUrl: 'https://i.scdn.co/image/ab67616d000048519461f84f3ea1bb2bbb78ea63',
    },
    {
      spotifyTrackId: '2PshAQGxwJvDgVo7AujSqc',
      trackName: 'Asdasdas',
      artistName: 'Cocoamilo',
      albumName: 'Dark Chocolate',
      albumImageThumbnailUrl: 'https://i.scdn.co/image/ab67616d00004851bd63426f0e246a20060f1915',
    },
    {
      spotifyTrackId: '1VYruNWR6k3fKQL5LXtIIK',
      trackName: 'Assassin',
      artistName: 'Au/Ra',
      albumName: 'Assassin',
      albumImageThumbnailUrl: 'https://i.scdn.co/image/ab67616d000048512b75834d11e56200516a1ad2',
    },
    {
      spotifyTrackId: '19YHcGUbKW8J6I3knzjAP5',
      trackName: 'Asdasdasdsasdsdasadsasdsasd',
      artistName: 'Universe City',
      albumName: 'Flange Lion',
      albumImageThumbnailUrl: 'https://i.scdn.co/image/ab67616d000048518829ead3c7647288893d330a',
    },
    {
      spotifyTrackId: '6JnFVmPyJvjnfBag0hhIFa',
      trackName: 'Assassin',
      artistName: 'Muse',
      albumName: 'Black Holes and Revelations',
      albumImageThumbnailUrl: 'https://i.scdn.co/image/ab67616d0000485128933b808bfb4cbbd0385400',
    },
    {
      spotifyTrackId: '3OJvTVUfGSyqPmk0J10Hbp',
      trackName: 'asdasd123',
      artistName: 'MR SK4IRB0T',
      albumName: 'bzbzbzz',
      albumImageThumbnailUrl: 'https://i.scdn.co/image/ab67616d00004851349bc42e0933e08acbbbece5',
    },
    {
      spotifyTrackId: '3Pyb7rYWBsRL24vmdlzlxk',
      trackName: "Assassin's Creed III Main Theme",
      artistName: 'Lorne Balfe',
      albumName: 'Assassin’s Creed 3 (Original Game Soundtrack)',
      albumImageThumbnailUrl: 'https://i.scdn.co/image/ab67616d0000485109b5a361d82bb471d9d38c07',
    },
    {
      spotifyTrackId: '7h9o5FCwhSLt4xt8mIOcrt',
      trackName: 'Asdasdasd',
      artistName: 'Söz gümüşse skürt her zaman altındır',
      albumName: 'Skürrrt',
      albumImageThumbnailUrl: 'https://i.scdn.co/image/ab67616d00004851512a3ed202dbfc6d4bacc475',
    },
  ],
};
