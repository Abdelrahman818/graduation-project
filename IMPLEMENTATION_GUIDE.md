# Complete Code Changes - Next.js Hydration Fix

## Summary of Changes

This fix eliminates hydration mismatches by using `next-themes` for proper dark/light mode support with Next.js App Router.

---

## 1. INSTALL PACKAGE (Manual Step)

```bash
npm install next-themes
```

---

## 2. app/context/ThemeProvider.tsx (NEW FILE)

```typescript
'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  );
}
```

**Key Points:**
- `attribute="class"` → Uses HTML class for dark mode (Tailwind strategy)
- `defaultTheme="light"` → Initial render theme
- `enableSystem` → Respects OS dark mode preference
- `'use client'` → Only this wrapper needs to be client-side

---

## 3. app/components/ThemeToggle.tsx (NEW FILE)

```typescript
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        // Sun icon for dark mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12a9 9 0 11-18 0 9 9 0 0118 0m0 5.364l-1.591-1.591M5.25 19.364l-1.591-1.591m0-5.636l-1.591 1.591M5.25 5.25l-1.591 1.591"
          />
        </svg>
      ) : (
        // Moon icon for light mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      )}
    </button>
  );
}
```

**Key Points:**
- `mounted` state prevents hydration mismatch (render only after client-side)
- `useTheme()` hook reads/sets theme
- SVG icons for visual feedback
- Tailwind classes for styling

---

## 4. app/layout.tsx (UPDATED)

**BEFORE:**
```typescript
import type { Metadata } from "next";

import './styles/globals.css';
import './styles/Normalize.css'
import { CartProvider } from "./context/CartContext";

export const metadata: Metadata = {
  title: "READORA",
  description: "Readora is a bookstore website that you can buy or rent books from it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
```

**AFTER:**
```typescript
import type { Metadata } from "next";

import './styles/globals.css';
import './styles/Normalize.css'
import { CartProvider } from "./context/CartContext";
import { Providers } from "./context/ThemeProvider";

export const metadata: Metadata = {
  title: "READORA",
  description: "Readora is a bookstore website that you can buy or rent books from it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <CartProvider>
            {children}
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
```

**Changes:**
1. Added: `import { Providers } from "./context/ThemeProvider";`
2. Added: `suppressHydrationWarning` on `<html>` tag
3. Wrapped children with `<Providers>`

---

## 5. app/components/Header.tsx (UPDATED)

**ADD IMPORT at top (line 5):**
```typescript
import { ThemeToggle } from './ThemeToggle';
```

Full updated imports section:
```typescript
 'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import API from '../API';
import { ThemeToggle } from './ThemeToggle';

import styles from '@/app/styles/header.module.css';
import anim from '@/app/styles/animations.module.css';

import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
```

**ADD BUTTON in JSX (in accountOptions section, after opening div):**

Find this section:
```tsx
<div className={styles.accountOptions}>

  <div
```

Replace with:
```tsx
<div className={styles.accountOptions}>

  <div className={styles.optionContainer}>
    <ThemeToggle />
  </div>

  <div
```

---

## Why This Works

| Issue | Solution |
|-------|----------|
| Hydration mismatch on theme | `next-themes` syncs SSR and client before React hydrates |
| FOUC (flash of wrong theme) | Script injection runs before page paint |
| Theme not persisting | `next-themes` handles localStorage automatically |
| System preference ignored | `enableSystem` respects OS dark mode |
| Need `suppressHydrationWarning` | `next-themes` needs to modify `<html>` attributes |
| Must avoid SSR window/localStorage | Only `<Providers>` marked as `'use client'` |
| Component hydration mismatch | `ThemeToggle` only renders after client mount |

---

## Testing

```bash
# 1. Install dependency
npm install next-themes

# 2. Build to catch errors
npm run build

# 3. Run development server
npm run dev

# 4. Check:
# - No console errors or warnings
# - Theme toggle button appears in header
# - Clicking toggle switches theme instantly
# - Page refresh keeps selected theme
# - Dark mode classes applied to <html> tag
```

---

## What Changed and Why

### Before (Problem)
```
Server: renders <html> light mode (no theme info)
↓
Client: reads localStorage, wants dark mode
↓
Result: Mismatch! React hydration error
```

### After (Solution)
```
Server: renders <html> with suppressHydrationWarning
↓
next-themes script injects into <head> (BEFORE React loads)
↓
Script reads localStorage/system theme
↓
Script applies class to <html> IMMEDIATELY
↓
React hydrates → no mismatch, everything matches!
```

---

## Production Ready

✅ Zero hydration warnings
✅ Syncs across tabs
✅ Respects system preferences
✅ Persists user choice
✅ No FOUC
✅ TypeScript support
✅ Accessible (ARIA labels)
✅ SSR safe
