import React from 'react';
import PropTypes from 'prop-types';

export default function MdToZip() {
  return <></>;
}

MdToZip.defaultProps = {
  fileName: 'document.zip',
};

MdToZip.propTypes = {
  /** a data structure that contains information about the files and folders to be added to the ZIP archive */
  fileData: PropTypes.shape({
    /** file or folder name */
    name: PropTypes.string,
    /** file content or folder content array (other fileData objects) */
    content: PropTypes.arrayOf(PropTypes.object),
    /** flag indicating whether the item is a folder (true) or a file (false) */
    isFolder: PropTypes.bool,
  }),
  /** the name of the file to be created inside the ZIP archive */
  fileName: PropTypes.string,
};
