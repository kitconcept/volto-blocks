import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';

export function getTeaserImageURL(data) {
  if (
    typeof data.preview_image === 'object' &&
    (data.preview_image['content-type'] === 'image/gif' ||
      data.preview_image['content-type'] === 'image/svg+xml')
  ) {
    return flattenToAppURL(data.preview_image.download);
  } else if (
    data.preview_image.scales?.teaser.download &&
    typeof data.preview_image === 'object'
  ) {
    // If we are using the current image in preview_image in the source object
    // then we have the scale UID at hand and we can use it right away
    return flattenToAppURL(data.preview_image.scales.teaser.download);
  } else if (typeof data.preview_image === 'string') {
    // We've manually overriden the image pointing to an image content type,
    // then we have a string, we get it via URL shorthand
    // TODO: get the actual image scale UUID for better caching
    if (isInternalURL(data.preview_image)) {
      return flattenToAppURL(`${data.preview_image}/@@images/image/teaser`);
    } else {
      return data.preview_image;
    }
  } else {
    // Guard for edge cases
    return flattenToAppURL(`${data.href}/@@images/preview_image/teaser`);
  }
}
