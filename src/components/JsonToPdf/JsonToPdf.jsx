import React from 'react';
import PropTypes from 'prop-types';

export default function JsonToPdf() {
  return <></>;
}

JsonToPdf.defaultProps = {
  data: {},
  styles: {},
  filename: 'file.pdf',
};

JsonToPdf.propTypes = {
  /** an object containing the data to generate the PDF */
  data: PropTypes.object,
  /** an object containing custom styles for the PDF document */
  styles: PropTypes.object,
  /** PDF file name to download */
  filename: PropTypes.string,
};
