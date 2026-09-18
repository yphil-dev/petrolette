import feedrat from 'feedrat';

function errorResponse(error) {
  return Response.json(error, { status: 500 });
}

export function handleDiscover(url) {
  const target = url.searchParams.get('url');
  const searchPrefix = url.searchParams.get('searchPrefix') || '';

  if (!target) {
    return Response.json({ error: 'Missing URL' }, { status: 400 });
  }

  try {
    new URL(target);
  } catch {
    return Response.json([searchPrefix + target.split(' ')]);
  }

  return new Promise((resolve) => {
    feedrat(target, (error, feeds) => {
      if (error) {
        resolve(errorResponse(error));
        return;
      }

      resolve(Response.json(feeds || { error: 'error' }));
    });
  });
}
