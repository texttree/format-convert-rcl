<div id="top"></div>

[![Contributors](https://img.shields.io/github/contributors/texttree/obs-format-convert-rcl.svg?style=for-the-badge)](https://github.com/texttree/obs-format-convert-rcl/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/texttree/obs-format-convert-rcl.svg?style=for-the-badge)](https://github.com/texttree/obs-format-convert-rcl/network/members)
[![Stargazers](https://img.shields.io/github/stars/texttree/obs-format-convert-rcl.svg?style=for-the-badge)](https://github.com/texttree/obs-format-convert-rcl/stargazers)
[![Issues](https://img.shields.io/github/issues/texttree/obs-format-convert-rcl.svg?style=for-the-badge)](https://github.com/texttree/obs-format-convert-rcl/issues)
[![MIT License](https://img.shields.io/github/license/texttree/obs-format-convert-rcl.svg?style=for-the-badge)](https://github.com/texttree/obs-format-convert-rcl/blob/master/LICENSE)

<h2><div align="center">obs-format-convert-rcl</div></h2>
<br />

<center><strong><a href="https://obs-format-convert-rcl.netlify.app">Explore the docs and code playground »</a></strong></center>
<br />
<br />
<center>
  <a href="https://github.com/texttree/obs-format-convert-rcl/issues">Report Bug · </a>
  <a href="https://github.com/texttree/obs-format-convert-rcl/issues">Request Feature</a>
</center>

<br />
<br />
<details>
  <summary>Table of Contents ↧</summary>
  <ul>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

The React component library includes six components.
The name **obs-format-convert-rcl** reflects the main function of the library - converting data from one format to another.

**1. JsonToEpub** provides functionality to create an EPUB file from JSON data. It takes in various parameters including data, styles, options, as well as parameters for handling images.

**2. JsonToHtml** transforms input data from JSON format into HTML, using various CSS styles and options for displaying the title and images. It takes an object as an argument, which can have the following properties: **jsonData, styleObj, showImages, showTitle, and imageUrl**. The structure of the JSON object expected as input must contain the following properties:

- **title** (String): content title;
- **reference** (String): link or information about the origin of the content;
- **verseObjects** (Array of verse objects): An array containing objects representing verses, each with the following properties:

  - **path** (String): Represents the path to any additional resource associated with the verse, such as an audio file or video URL.

  - **text** (String): Contains the textual content of the verse.

  - **verse** (String): Represents the verse number or any identifier associated with the verse.

**3. JsonToMd** transforms input data from JSON format into Markdown format. It takes an object as an argument, which may have the following properties: title, reference, verseObjects, and imageUrl.

If the ref object has a title property, it will be displayed as a first-level title (#). If the reference property is present, it will be displayed in italics (\_ \_).

The function then loops through the verseObjects array and for each verse object adds the text of the verse in Markdown format. If the verse object contains a urlImage property, it will be rendered as a Markdown image.

**4. JsonToPdf** serves to convert JSON data into a PDF document. It imports the libraries pdfmake and file-saver for creating and saving PDF files respectively. It takes various properties to customize the PDF's content and style, including a title, introductory text, back content, styles, and data to be inserted into the PDF. After obtaining all necessary data, it generates a PDF document using a pdfmake document definition. It then saves the document in a specified location on your device.

**5. MdToJson** transforms input data in Markdown format into JSON format. It takes a string with Markdown data as an argument.

Breaks the input string into blocks based on the empty lines in between. The first block is considered a title, the last block is a link or information about the origin of the content. The remaining blocks are considered verses.
If an error occurs while converting Markdown to JSON, an exception will be thrown with an error message.

**6. MdToZip** takes a string in Markdown format and creates a ZIP archive containing a file with the given content. The component uses the jszip library to create and manage ZIP archives, and the saveAs function from the file-saver library to load the archive.
The component accepts props:

- fileName (default document.md) - the name of the file to be created inside the ZIP archive;
- markdown - a string containing the contents of the file in Markdown format.

### Built With

- [@texttree/epub-gen-memory](https://www.npmjs.com/package/@texttree/epub-gen-memory)
- [pdfmake](http://pdfmake.org/#/)
- [file-saver](https://www.npmjs.com/package/file-saver)
- [jszip](https://www.npmjs.com/package/jszip)
- [React Styleguidist](https://react-styleguidist.js.org/)

<a style="text-align: right; display: block" href="#top">(back to top)</a>

<!-- GETTING STARTED -->

## Getting Started

### Installation

Add the library to your React app

- yarn

```bash
yarn add @texttree/obs-format-convert-rcl
```

- npm

```bash
npm install @texttree/obs-format-convert-rcl
```

<a style="text-align: right; display: block" href="#top">(back to top)</a>

<!-- USAGE EXAMPLES -->

## Usage

_For examples, please refer to the [Styleguidist link](https://obs-format-convert-rcl.netlify.app)_

<a style="text-align: right; display: block" href="#top">(back to top)</a>

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/texttree/obs-format-convert-rcl/issues) for a full list of proposed features (and known issues).

<a style="text-align: right; display: block" href="#top">(back to top)</a>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. [Guidelines for external contributions.](https://forum.door43.org)

You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

If you would like to fork the repo and create a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<a style="text-align: right; display: block" href="#top">(back to top)</a>

<!-- LICENSE -->

## License

Distributed under the MIT License. See [LICENSE](https://github.com/texttree/obs-format-convert-rcl/blob/master/LICENSE) for more information.

<a style="text-align: right; display: block" href="#top">(back to top)</a>

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/texttree/obs-format-convert-rcl](https://github.com/texttree/obs-format-convert-rcl)

<a style="text-align: right; display: block" href="#top">(back to top)</a>
