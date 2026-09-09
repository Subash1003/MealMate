// Shared, case-insensitive search helpers for the Home and RestaurantMenu pages.
// All matching is lower-cased substring matching so partial queries work
// (e.g. "bir" / "BIR" / "biryani" all match "Biryani").

export const normalize = (value) => (value || "").toString().toLowerCase().trim();

// --- Menu traversal -------------------------------------------------------

// Every restaurant's menu lives under
//   entry.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards
// where each group card is either an ItemCategory (has `itemCards`) or a
// NestedItemCategory (has `categories`, each with its own `itemCards`).
const getMenuGroupCards = (menuEntry) =>
  menuEntry?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

const getItemName = (item) => item?.card?.info?.name || "";

// Collect every dish name in a restaurant's menu (flattened, incl. nested
// categories) as a single lower-cased string for fast substring checks.
const collectDishText = (menuEntry) => {
  const parts = [];

  for (const group of getMenuGroupCards(menuEntry)) {
    const card = group?.card?.card;
    if (!card) continue;

    if (Array.isArray(card.itemCards)) {
      for (const item of card.itemCards) parts.push(getItemName(item));
    }

    if (Array.isArray(card.categories)) {
      for (const category of card.categories) {
        for (const item of category.itemCards || []) parts.push(getItemName(item));
      }
    }
  }

  return parts.join(" ").toLowerCase();
};

// --- Home: filter restaurants by dish ----------------------------------

// Built once (lazily) and reused for every keystroke: Map<restaurantId, string>
// where the string is all of that restaurant's dish names + name + cuisines,
// lower-cased. Keeps per-keystroke filtering O(number of restaurants).
let restaurantSearchIndex = null;

const buildRestaurantSearchIndex = (resMenuData) => {
  if (restaurantSearchIndex) return restaurantSearchIndex;

  restaurantSearchIndex = new Map();

  for (const entry of resMenuData || []) {
    const info = entry?.data?.cards?.[2]?.card?.card?.info;
    if (!info?.id) continue;

    const extra = [info.name, ...(info.cuisines || [])].join(" ").toLowerCase();
    restaurantSearchIndex.set(info.id, `${collectDishText(entry)} ${extra}`);
  }

  return restaurantSearchIndex;
};

export const filterRestaurantsByDish = (restaurants, resMenuData, rawQuery) => {
  const query = normalize(rawQuery);
  if (!query) return restaurants;

  const index = buildRestaurantSearchIndex(resMenuData);

  return restaurants.filter((restaurant) => {
    const haystack = index.get(restaurant?.info?.id);
    return haystack ? haystack.includes(query) : false;
  });
};

// --- RestaurantMenu: filter one restaurant's menu items ----------------

const itemMatchesQuery = (item, query) =>
  getItemName(item).toLowerCase().includes(query);

// Returns a new array of group cards with `itemCards` (and nested
// `categories[].itemCards`) narrowed to items whose name matches the query.
// Group cards / categories with no remaining items are dropped. The object
// shape is preserved so the existing render code keeps working unchanged.
export const filterMenuGroupCards = (groupCards, rawQuery) => {
  const query = normalize(rawQuery);
  if (!query) return groupCards;

  const result = [];

  for (const entry of groupCards || []) {
    const card = entry?.card?.card;
    if (!card) continue;

    const hasItems = Array.isArray(card.itemCards);
    const hasCategories = Array.isArray(card.categories);
    if (!hasItems && !hasCategories) continue; // license / address cards

    const itemCards = hasItems
      ? card.itemCards.filter((item) => itemMatchesQuery(item, query))
      : undefined;

    const categories = hasCategories
      ? card.categories
          .map((category) => ({
            ...category,
            itemCards: (category.itemCards || []).filter((item) =>
              itemMatchesQuery(item, query)
            ),
          }))
          .filter((category) => category.itemCards.length > 0)
      : undefined;

    const keptItems = itemCards && itemCards.length ? itemCards : undefined;
    const keptCategories =
      categories && categories.length ? categories : undefined;

    if (!keptItems && !keptCategories) continue;

    result.push({
      ...entry,
      card: {
        ...entry.card,
        card: { ...card, itemCards: keptItems, categories: keptCategories },
      },
    });
  }

  return result;
};
