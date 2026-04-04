import { useEffect } from 'react';
import { Outlet, useMatches } from 'react-router-dom';

interface RouteHandle {
  title?: string;
}

export default function TitleHandler() {
  const matches = useMatches();

  useEffect(() => {
    const match = matches.findLast((m) => (m.handle as RouteHandle)?.title);
    const title = (match?.handle as RouteHandle)?.title;

    document.title = title ? `Roomly — ${title}` : 'Roomly';
  }, [matches]);

  return <Outlet />;
}
