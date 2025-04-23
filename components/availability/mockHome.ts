import { faker } from "@faker-js/faker";

faker.seed(22);
export const generateFakeHome = () => ({
  key: faker.string.uuid(),
  image: faker.image.urlPicsumPhotos({
    width: 80,
    height: 80,
    blur: 0,
  }),
});

export const generateHomes = () => {
  return [...Array(faker.number.int({ min: 1, max: 5 })).keys()].map(() => {
    return generateFakeHome();
  });
};

export type HomeType = ReturnType<typeof generateFakeHome>;
