import React from 'react';
import PropTypes from 'prop-types';

export default function JsonToHtml() {
  return <></>;
}

JsonToHtml.defaultProps = {
  jsonData: {},
  styleObj: {},
};

JsonToHtml.propTypes = {
  /** JSON object to convert to HTML markup */
  jsonData: PropTypes.shape({
    /** array of verse objects. Each array element has three properties: path, text, and verse. */
    verseObjects: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string,
        text: PropTypes.string,
        verse: PropTypes.string,
      })
    ),
    /** content title; */
    title: PropTypes.string,
    /** link or information about the origin of the content; */
    reference: PropTypes.string,
  }),
  /** styles object through which we can change styles */
  styleObj: PropTypes.shape({
    verse: PropTypes.string,
    verseImage: PropTypes.string,
    image: PropTypes.string,
    verseText: PropTypes.string,
    paragraph: PropTypes.string,
    contentWrapper: PropTypes.string,
    title: PropTypes.string,
    verses: PropTypes.string,
    reference: PropTypes.string,
  }),
};
