import LazyVideo from '../../elements/LazyVideo';
import { filter } from '../../elements/HtmlToReactConverter/filter';

export default {
  test: ({ tagName, children, attributes }) =>
    (tagName === 'p' || tagName === 'div') &&
    children &&
    children[0] &&
    children[0].tagName === 'iframe' &&
    /youtube/.test(children[0].attributes.src) &&
    !attributes['data-lazy'],
  converter: element => {
    const { attributes, ...rest } = element.children[0];

    let height;
    let width;

    if (attributes.height && attributes.width) {
      width = '100vw';
      height = `${(attributes.height * 100) / attributes.width}vw`; // prettier-ignore
    } else {
      height = '120px';
      width = '120px';
    }

    const youtubeId = attributes.src.match(/\/embed\/([\d\w]+)/)[1] || '';

    return {
      type: 'Element',
      tagName: LazyVideo,
      attributes: {
        width,
        height,
        youtubeId,
        offset: 400,
        throttle: 50,
        imgProps: filter(attributes),
      },
      children: [{ ...rest, attributes: { ...attributes, 'data-lazy': true } }],
    };
  },
};
