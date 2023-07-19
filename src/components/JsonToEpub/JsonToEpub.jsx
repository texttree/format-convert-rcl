import React from 'react';
import PropTypes from 'prop-types';

export default function JsonToEpub() {
  return <></>;
}

JsonToEpub.defaultProps = {
  showImages: true,
  bookIntroBack: {},
  fileName: 'obs.epub',
  imageUrl: 'https://cdn.door43.org/obs/jpg/360px/',
};

JsonToEpub.propTypes = {
  /** is an array of objects representing individual verses or blocks of text in a book */
  data: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  /** used to determine the path to the image. This option allows you to select the picture quality and address */
  imageUrl: PropTypes.string,
  /** an object for specifying the content of the intro and back pages in the generated e-book */
  bookIntroBack: PropTypes.shape({
    /** An object containing information about the introductory part of the book */
    intro: PropTypes.shape({
      content: PropTypes.string,
      title: PropTypes.string,
    }),
    /** An object containing information about the back of the book */
    back: PropTypes.shape({
      content: PropTypes.string,
      title: PropTypes.string,
    }),
  }) /** an object containing the settings for creating an e-book */,
  options: PropTypes.object,
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
  /** option that disables the display of images in e-book */
  showImages: PropTypes.bool,
  /** a string representing the filename of the e-book to be saved */
  fileName: PropTypes.string,
};
