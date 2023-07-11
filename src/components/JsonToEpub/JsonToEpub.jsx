import React from 'react';
import PropTypes from 'prop-types';

export default function JsonToEpub() {
  return <></>;
}

JsonToEpub.defaultProps = {
  object: {
    title: '',
    reference: '',
    verseObjects: [],
  },
  imageUrl: 'https://cdn.door43.org/obs/jpg/360px/',
};

JsonToEpub.propTypes = {
  /** an object that contains structured data in JSON format */
  object: PropTypes.shape({
    /** content title; */
    title: PropTypes.string,
    /** link or information about the origin of the content; */
    reference: PropTypes.string,
    /** array of verse objects. Each array element has three properties: path, text, and verse. */
    verseObjects: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string,
        text: PropTypes.string,
        verse: PropTypes.string,
      })
    ),
  }),
  /** used to determine the path to the image. This option allows you to select the picture quality and address */
  imageUrl: PropTypes.string,
};
