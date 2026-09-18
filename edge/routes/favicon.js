import favrat from '../favicon-discover.js';

function errorResponse(error) {
  return Response.json(error, { status: 500 });
}

function findIcon(url) {
  return new Promise((resolve, reject) => {
    favrat(url, (error, iconUrl) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(iconUrl);
    });
  });
}

export async function handleFavicon(url) {
  const pageUrl = url.searchParams.get('url');

  if (!pageUrl) {
    return Response.json({ error: 'Missing URL' }, { status: 400 });
  }

  try {
    const iconUrl = await findIcon(pageUrl);
    return Response.json(iconUrl);
  } catch (error) {
    return errorResponse(error);
  }
}
