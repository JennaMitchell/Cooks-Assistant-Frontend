export interface ButtonDataInterface {
  title: string;
  iconLocation: string;
  id: string;
  altText: string;
}

export const databaseUrl = "https://cooks-assistant-app.herokuapp.com/";
export const capitalLettersArray = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
export const backgroundImageData = [
  {
    imageUrl:
      "assets/images/recipe-creator/backdrops/blue-gold-marble-textured-background.jpg",
    altText: "Blue-Gold Marble",
    id: "background-changer-popup-choice-0",
  },
  {
    imageUrl:
      "assets/images/recipe-creator/backdrops/close-up-black-marble-textured-background.jpg",
    altText: "Black White Marble",
    id: "background-changer-popup-choice-1",
  },
  {
    imageUrl:
      "assets/images/recipe-creator/backdrops/silver-metallic-textured-background.jpg",
    altText: "Stainless Steel Background",
    id: "background-changer-popup-choice-2",
  },
  {
    imageUrl:
      "assets/images/recipe-creator/backdrops/wooden-plank-textured-background-material.jpg",
    altText: "Dark Textured Wooden Plank",
    id: "background-changer-popup-choice-3",
  },
  {
    imageUrl:
      "assets/images/recipe-creator/backdrops/wooden-wall-scratched-material-background-texture-concept.jpg",
    altText: "Medium Textured Wooden Plank",
    id: "background-changer-popup-choice-4",
  },
  {
    imageUrl:
      "assets/images/recipe-creator/backdrops/wooden-wood-backgrounds-textured-pattern-wallpaper-concept.jpg",
    altText: "Light Textured Wooden Plank",
    id: "background-changer-popup-choice-5",
  },
];
export const preferenceButtonData = [
  {
    title: "Chicken",
    iconLocation: "assets/images/icons/food/chicken-icon.png",
    id: "category-chicken-button",
    altText: "chicken icon",
  },
  {
    title: "Beef",
    iconLocation: "assets/images/icons/food/beef-icon.png",
    id: "category-beef-button",
    altText: "beef icon",
  },
  {
    title: "Pork",
    id: "category-pork-button",
    iconLocation: "assets/images/icons/food/pork-icon.png",
    altText: "pork icon",
  },
  {
    title: "Seafood",
    id: "category-seafood-button",
    iconLocation: "assets/images/icons/food/seafood-icon.png",
    altText: "seafood icon",
  },
  {
    title: "Vegan",
    iconLocation: "assets/images/icons/food/vegan-icon.png",
    id: "category-vegan-button",
    altText: "vegan icon",
  },
  {
    title: "Vegetarian",
    iconLocation: "assets/images/icons/food/vegetarian-icon.png",
    id: "category-vegetarian-button",
    altText: "vegetarian icon",
  },
];

export const nationalityButtonData = [
  {
    title: "Chinense",
    iconLocation: "assets/images/icons/flags/chinese-flag.png",
    id: "category-chinense-button",
    altText: "chinese icon",
  },
  {
    title: "French",
    iconLocation: "assets/images/icons/flags/france-flag.png",
    id: "category-french-button",
    altText: "french icon",
  },
  {
    title: "Indian",
    iconLocation: "assets/images/icons/flags/india-flag.png",
    id: "category-indian-button",
    altText: "india icon",
  },
  {
    title: "Japanense",
    iconLocation: "assets/images/icons/flags/japan-flag.png",
    id: "category-japanense-button",
    altText: "japanense icon",
  },
  {
    title: "Mexican",
    iconLocation: "assets/images/icons/flags/mexico-flag.png",
    id: "category-mexican-button",
    altText: "mexican icon",
  },
  {
    title: "Russian",
    iconLocation: "assets/images/icons/flags/russia-flag.png",
    id: "category-russian-button",
    altText: "russisa icon",
  },
  {
    title: "Korean",
    iconLocation: "assets/images/icons/flags/south-korea-flag.png",
    id: "category-korean-button",
    altText: "korea icon",
  },
  {
    title: "USA",
    iconLocation: "assets/images/icons/flags/usa-flag.png",
    id: "category-usa-button",
    altText: "usa icon",
  },
];
export const mealsTimesButtonData = [
  {
    title: "Breakfast",
    iconLocation: "assets/images/icons/meal-times/breakfast.png",
    id: "category-breakfast-button",
    altText: "breakfast icon",
  },
  {
    title: "Lunch",
    iconLocation: "assets/images/icons/meal-times/lunch.png",
    id: "category-lunch-button",
    altText: "lunch icon",
  },
  {
    title: "Dinner",
    iconLocation: "assets/images/icons/meal-times/dinner.png",
    id: "category-dinner-button",
    altText: "dinner icon",
  },
  {
    title: "Beverage",
    iconLocation: "assets/images/icons/meal-times/beverages.png",
    id: "category-beverage-button",
    altText: "beverage icon",
  },
];

export const recipeCourseTagData = [
  {
    title: "Entree",
    id: "category-entree-button",
    iconLocation: "assets/images/icons/meal-times/entree.png",
    altText: "entree icon",
  },
  {
    title: "Sides",
    id: "category-sides-button",
    iconLocation: "assets/images/icons/meal-times/side-dish.png",
    altText: "main course icon",
  },
  {
    title: "Appetizers",
    id: "category-appetizers-button",
    iconLocation: "assets/images/icons/meal-times/appetizers.png",
    altText: "appetizer icon",
  },
  {
    title: "Desserts",
    id: "category-desserts-button",
    iconLocation: "assets/images/icons/meal-times/dessert.png",
    altText: "desserts icon",
  },
];

export const mainIngredientsData = [
  {
    title: "Beans",
    id: "category-beans-button",
    iconLocation: "assets/images/icons/food/bean-icon.png",
    altText: "bean icon",
  },
  {
    title: "Vegetables",
    id: "category-vegetables-button",
    iconLocation: "assets/images/icons/food/vegetable-icon.png",
    altText: "vegetable icon",
  },
  {
    title: "Pork",
    id: "category-pork-button",
    iconLocation: "assets/images/icons/food/pork-icon.png",
    altText: "pork icon",
  },
  {
    title: "Beef",
    id: "category-beef-button",
    iconLocation: "assets/images/icons/food/beef-icon.png",
    altText: "beef icon",
  },
  {
    title: "Grains",
    id: "category-grains-button",
    iconLocation: "assets/images/icons/food/grain-icon.png",
    altText: "wheat icon",
  },

  {
    title: "Cheese",
    id: "category-cheese-button",
    iconLocation: "assets/images/icons/food/cheese-icon.png",
    altText: "cheese icon",
  },
  {
    title: "Pasta",
    id: "category-pasta-button",
    iconLocation: "assets/images/icons/food/pasta-icon.png",
    altText: "pasta icon",
  },
  {
    title: "Seafood",
    id: "category-seafood-button",
    iconLocation: "assets/images/icons/food/seafood-icon.png",
    altText: "seafood icon",
  },
  {
    title: "Chicken",
    id: "category-chicken-button",
    iconLocation: "assets/images/icons/food/chicken-icon.png",
    altText: "chicken icon",
  },
  {
    title: "Rice",
    id: "category-rice-button",
    iconLocation: "assets/images/icons/food/rice-icon.png",
    altText: "rice icon",
  },
];
