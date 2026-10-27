# PixelGallery 📸

A responsive photo gallery built with **React, TypeScript, Vite, and Tailwind CSS**. Browse photos, search by author, and save your favourite images across page refreshes.

## ✨ Features

- **Photo Gallery:** Fetches 30 photos from the [Picsum Photos API](https://picsum.photos/v2/list?limit=30).
- **Real-Time Search:** Filter photos by author name without additional API requests.
- **Favourites:** Add or remove photos from favourites using React's `useReducer`.
- **Persistent Storage:** Saves favourite photo IDs in browser `localStorage`.
- **Custom Hook:** Uses `useFetchPhotos` to manage photo fetching, loading, and error states.
- **Responsive Design:** Displays 1 column on mobile, 2 on tablet-sized screens, and 4 on desktop.
- **Loading and Error States:** Provides feedback while photos load or if fetching fails.

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Hooks: `useState`, `useEffect`, `useReducer`, `useCallback`, and `useMemo`
- Picsum Photos API
- Browser `localStorage`

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) or Node.js with npm installed.
- Git.

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd pixel-gallery
   ```

3. Install dependencies:

   ```bash
   bun install
   ```

4. Start the development server:

   ```bash
   bun run dev
   ```

5. Open the local URL shown in your terminal.

### Production Build

Create a production build:

```bash
bun run build
```

Preview the production build:

```bash
bun run preview
```

## 📁 Project Structure

```text
src/
├── components/
│   └── PhotoCard.tsx
├── hooks/
│   └── useFetchPhotos.ts
├── reducers/
│   └── favouriteReducer.ts
├── App.tsx
├── index.css
└── main.tsx
```

## 🧠 Implementation Highlights

### Custom Hook

`useFetchPhotos` handles API requests and exposes `photos`, `loading`, and `error` to the application.

### Favourite State Management

`favouriteReducer` handles the `TOGGLE` action to add or remove photo IDs. Favourite IDs are persisted in `localStorage`.

### Search Optimization

`useCallback` memoizes the search handler, while `useMemo` caches the filtered photo list until its dependencies change.

## 📱 Responsive Layout

The gallery adapts to different screen sizes:

- **Mobile:** 1 column
- **Tablet:** 2 columns
- **Desktop:** 4 columns

## 📄 Assignment

Built as a frontend React internship pre-screening assignment for Celebrare.

---

Built with React and Tailwind CSS.
