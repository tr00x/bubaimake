import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToAnchor() {
  const { pathname, hash } = useLocation();
  const lastHash = useRef('');

  useEffect(() => {
    if (hash) {
      lastHash.current = hash;
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Use a small timeout to ensure layout is settled, especially for cross-page navigation
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      // Scroll to top if no hash, but only if we are not just removing the hash on the same page
      // Actually, standard router behavior is to keep scroll on push, or scroll to top.
      // We'll enforce scroll to top on new pages.
      if (lastHash.current !== '' && pathname === window.location.pathname) {
          // If we just removed the hash, do nothing or scroll to top?
          // Usually we don't want to scroll to top if just removing hash via history.
      } else {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      lastHash.current = '';
    }
  }, [pathname, hash]);

  return null;
}
