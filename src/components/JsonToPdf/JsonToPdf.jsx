import React from 'react';
import PropTypes from 'prop-types';

export default function JsonToPdf() {
  return <></>;
}

JsonToPdf.defaultProps = {
  fileName: 'file.pdf',
  imageUrl: 'https://cdn.door43.org/obs/jpg/360px/',
  showImages: true,
  combineVerses: false,
  showVerseNumber: false,
};

JsonToPdf.propTypes = {
  /** an object containing the data to generate the PDF */
  data: PropTypes.object,
  /** an object containing custom styles for the PDF document */
  styles: PropTypes.object,
  /** PDF file name to download */
  fileName: PropTypes.string,
  /** is used to add some data to the PDF file's content book. */
  bookPropertiesObs: PropTypes.shape({
    /** project title */
    projectTitle: PropTypes.string,
    /** book title */
    title: PropTypes.string,
    /** book introduction */
    intro: PropTypes.string,
    /** endpaper */
    back: PropTypes.string,
  }),
  /** used to determine the path to the image. This option allows you to select the picture quality and address */
  imageUrl: PropTypes.string,
  /** option that disables the display of images in PDF */
  showImages: PropTypes.bool,
  /** option combines verses into one line */
  combineVerses: PropTypes.bool,
  /** parameter that determines whether verse numbers should be displayed when creating a PDF document */
  showVerseNumber: PropTypes.bool,
};
