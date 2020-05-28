/* eslint-disable max-len */
export const userState = {
  userID: 1000,
  username: 'admin',
};

export const recipeState = {
  all: [
    {
      id: 4,
      recipeName: 'Mahi-Mahi in Tomato Olive Sauce',
      recipeAuthor: 'Anonymous',
      rating: 5.000,
      numberOfRatings: 1,
      description: // 'The Sicilian-style tomato sauce has tons of Mediterranean flavor, thanks to the orange peel, olives, and oregano.',
                   'Classic spoon bread is a savory pudding served as a side dish. In this dessert version, the slightly sweetened batter is baked in individual ramekins, then topped with strawberry preserves.',
      dateAdded: '2009-03-27 04:00:00',
    },
    {
      id: 6,
      recipeName: 'The Best Blts',
      recipeAuthor: 'Anonymous',
      rating: 4.375,
      numberOfRatings: 1,
      description: 'This recipe can be prepared in 45 minutes or less.',
      dateAdded: '2004-08-20 04:00:00',
    },
  ],
  current: {
    id: 4,
    recipeName: 'Mahi-Mahi in Tomato Olive Sauce',
    recipeAuthor: 'Anonymous',
    rating: 5.000,
    numberOfRatings: 1,
    description: 'The Sicilian-style tomato sauce has tons of Mediterranean flavor, thanks to the orange peel, olives, and oregano.',
    dateAdded: '2009-03-27 04:00:00',
    categories: [
      'Tree Nut Free',
      'Tomato',
      'Soy Free',
      'Simmer',
      'Sauté',
      'Pescatarian',
      'Peanut Free',
      'Olive',
      'Low Fat',
      'Low Cal',
      'Kosher',
      'High Fiber',
      'Healthy',
      'Fish',
      'Dinner',
      'Dairy Free',
      'Bon Appétit',
    ],
    ingredients: [
      '1 cup chopped onion',
      '1 cup dry white wine',
      '1 teaspoon (packed) finely grated orange peel',
      '1 teaspoon anchovy paste',
      '1/2 cup large green olives, quartered, pitted',
      '2 14 1/2-ounce cans diced tomatoes with garlic, basil, and oregano in juice',
      '2 tablespoons extra-virgin olive oil',
      '3 teaspoons chopped fresh oregano, divided',
      '4 6-ounce mahi-mahi fillets',
      'country-style white bread cut into 1/2-inch-thick slices, toasted',
    ],
    directions: [
      'Heat oil in heavy large skillet over medium-high heat. Add onion; sauté until translucent and beginning to brown, about 4 minutes. Add wine and anchovy paste. Boil until reduced to 3/4 cup, about 3 minutes. Add tomatoes with juice; bring to boil.',
      'Sprinkle fish with salt and pepper. Add fish to skillet atop tomato mixture. Reduce heat to low, cover, and simmer until fish is cooked through, about 9 minutes. Using slotted metal spatula, transfer fish to plate and tent with foil to keep warm. Mix olives, 2 teaspoons oregano, and orange peel into sauce in skillet. Increase heat to high and boil until sauce is reduced and thickened, about 6 minutes. Season to taste with salt and pepper. Place 1 fish fillet on each of 4 plates. Pour sauce over and around fish, sprinkle with remaining 1 teaspoon oregano, and serve with warm toasted bread.',
    ],
  },
};

export const noteState = {
  all: [
    {
      id: 4,
      title: 'Dinner with Stephen',
      notes: 'Worked on front-end',
      dateAdded: '2009-03-27 04:00:00',
    },
    {
      id: 6,
      title: 'Dinner with JT',
      notes: 'It was great!',
      dateAdded: '2009-03-27 04:00:00',
    },
    {
      id: 8,
      title: 'Dinner with Shik',
      notes: 'Yummy. The food was really good. asdfYummy. The food was really good.Yummy. The food was really good.Yummy. The food was really good.Yummy. The food was really good.Yummy. The food was really good.Yummy. The food was really good.Yummy. The food was really good.Yummy. The food was really good.Yummy. The food was really good.Yummy. The food was really good. Yummy. The food was really good.Yummy. The food was really good.Yummy. The food was really good.Yummy. The food was really good.Yummy. The food was really good.',
      dateAdded: '2009-03-27 04:00:00',
    },
  ],
  current: {
    id: 4,
    title: 'Dinner on Stephen',
    notes: 'Worked on front-end',
    dateAdded: '2009-03-27 04:00:00',
  },
};
