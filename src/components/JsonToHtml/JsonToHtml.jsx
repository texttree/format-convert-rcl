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
  jsonData: PropTypes.object,
  /** styles object through which we can change styles */
  styleObj: PropTypes.object,
};
