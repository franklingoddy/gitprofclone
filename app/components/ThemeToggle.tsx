'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export const ThemeToggle = () => {
  const {  setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensures the component is mounted on the client-side before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // If not yet mounted, don't render the button (prevents hydration mismatch)
    return null;
  }

  return (
    <Button
      variant="outline"
      className='mb-10'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
};
