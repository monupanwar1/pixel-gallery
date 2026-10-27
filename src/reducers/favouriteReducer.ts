export type FavouriteAction = {
  type: 'TOGGLE';
  id: string;
};

export function favouriteReducer(
  state: string[],
  action: FavouriteAction,
): string[] {
  switch (action.type) {
    case 'TOGGLE':
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id];

    default:
      return state;
  }
}
