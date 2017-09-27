import { dep } from 'worona-deps';
import readingTime from 'reading-time';
import fecha from 'fecha';

export const getTitle = id => state =>
  dep('connection', 'selectorCreators', 'getPostById')(id)(state).title.rendered;

export const getMedia = id => state =>
  dep('connection', 'selectorCreators', 'getPostById')(id)(state).featured_media;

export const getDate = id => state =>
  dep('connection', 'selectorCreators', 'getPostById')(id)(state).date;

export const getFormattedDate = id => state => {
  const date = dep('connection', 'selectorCreators', 'getPostById')(id)(state).date;
  return fecha.format(new Date(date), 'DD.MM.YYYY - HH:mm[h]');
};

export const getContent = id => state =>
  dep('connection', 'selectorCreators', 'getPostById')(id)(state).content.rendered;

export const getUrl = id => state =>
  dep('connection', 'selectorCreators', 'getPostById')(id)(state).link;

export const getGlobalId = id => state =>
  dep('connection', 'selectorCreators', 'getPostById')(id)(state).guid.rendered;

export const getReadingTime = id => state => {
  const content = dep('connection', 'selectorCreators', 'getPostById')(id)(state).content.rendered;
  return Math.round(readingTime(content).minutes);
};

export const getAuthor = id => state => {
  const authorId = dep('connection', 'selectorCreators', 'getPostById')(id)(state).author;
  return dep('connection', 'selectorCreators', 'getUserById')(authorId)(state).name;
};

export const getAuthorId = id => state =>
  dep('connection', 'selectorCreators', 'getPostById')(id)(state).author;

export const getCategoryList = id => state =>
  dep('connection', 'selectorCreators', 'getPostById')(id)(state).categories;

export const getTagList = id => state =>
  dep('connection', 'selectorCreators', 'getPostById')(id)(state).tags;

export const getCategoryName = id => state =>
  dep('connection', 'selectorCreators', 'getCategoryById')(id)(state).name;

export const getTagName = id => state =>
  dep('connection', 'selectorCreators', 'getTagById')(id)(state).name;
