import React from 'react';
import PropTypes from 'prop-types';

export default function JsonToMd() {
  return <></>;
}

JsonToMd.propTypes = {
  /** an object that contains structured data in JSON format */
  object: PropTypes.shape({
    /** content title; */
    title: PropTypes.string,
    /** link or information about the origin of the content; */
    reference: PropTypes.string,
    /** array of verse objects. */
    verseObjects: PropTypes.object,
  }),
};
