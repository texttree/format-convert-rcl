import React from 'react';
import PropTypes from 'prop-types';

export default function MdToZip() {
  return <></>;
}

MdToZip.defaultProps = {
  // markdown: '',
  filename: 'document.md',
};

MdToZip.propTypes = {
  /** string in Markdown format */
  markdown: PropTypes.string,
  /** the name of the file to be created inside the ZIP archive */
  filename: PropTypes.string,
};
