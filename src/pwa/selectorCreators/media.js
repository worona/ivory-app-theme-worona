import { dep } from 'worona-deps';
import he from 'he';

export const getAlt = id => state => {
  const media = dep('connection', 'selectorCreators', 'getMediaById')(id)(state);
  return (media && media.alt_text) || '';
};

export const getSrc = id => state => {
  const media = dep('connection', 'selectorCreators', 'getMediaById')(id)(state);
  return (media && media.source_url) || '';
};

export const getSizes = id => state => {
  const media = dep('connection', 'selectorCreators', 'getMediaById')(id)(state);
  const sizes = (media && media.media_details && media.media_details.sizes) || null;

  return sizes
    ? Object.keys(sizes)
        .reduce((a, b) => {
          if (a.every(item => sizes[item].width !== sizes[b].width)) a.push(b);
          return a;
        }, [])
        .map(
          (key, index, array) =>
            index < array.length - 1
              ? `${sizes[key].width}px`
              : `${sizes[key].width}px`,
        )
        .join(', ')
    : '';
};

export const getSrcSet = id => state => {
  const media = dep('connection', 'selectorCreators', 'getMediaById')(id)(state);
  const sizes = (media && media.media_details && media.media_details.sizes) || null;

  return sizes
    ? he.decode(
        Object.keys(sizes)
          .reduce((a, b) => {
            if (a.every(item => sizes[item].width !== sizes[b].width)) a.push(b);
            return a;
          }, [])
          .map(key => `${sizes[key].source_url} ${sizes[key].width}`)
          .reduce((total, current) => `${total}${current}w, `, ''),
      )
    : '';
};
