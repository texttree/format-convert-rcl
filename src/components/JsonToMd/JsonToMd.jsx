import React from 'react';
import PropTypes from 'prop-types';

export default function JsonToMd() {
  return <></>;
}

JsonToMd.defaultProps = {
  imageUrl: 'https://cdn.door43.org/obs/jpg/360px/',
};

JsonToMd.propTypes = {
  /** an object that contains structured data in JSON format */
  object: PropTypes.shape({
    /** content title; */
    title: PropTypes.string,
    /** link or information about the origin of the content; */
    reference: PropTypes.string,
    /** array of verse objects. Each array element has two properties: path and text */
    verseObjects: PropTypes.array,
  }),
  /** provides a basic link to images */
  imageUrl: PropTypes.string,
};
