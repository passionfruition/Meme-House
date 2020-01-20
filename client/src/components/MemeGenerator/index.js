import * as React from 'react';
import domtoimage from 'dom-to-image-more';
import FakeFooter from '../FakeFooter';
import './style.css';
import axios from 'axios'

// eslint-disable-next-line
import { saveAs } from 'file-saver';

function MemeGenerator() {
  let contentContainerRef = React.useRef(null)
  
  const [images, setImages] = React.useState([]);
  const [activeImage, setActiveImage] = React.useState('');
  const [textTop, setTextTop] = React.useState('');
  const [textBottom, setTextBottom] = React.useState('');

  async function fetchImage() {
    // Get the memes
    const imgData = await fetch('https://api.imgflip.com/get_memes').then(res => res.json()).catch(err => console.error(err))
    const { memes } = await imgData.data
    // Update images state
    await setImages(memes)
    // Update activeImage state
    await setActiveImage(memes[16].url)
  }

  function handleImageChange() {
    // Choose image
    const image = images[Math.floor(Math.random() * images.length)]
    // Update activeImage state
    setActiveImage(image.url)
  }

  function handleImageInputChange(event) {
    // Update activeImage state
    setActiveImage(window.URL.createObjectURL(event.target.files[0]))
  }

  function handleInputChange(event) {
    if (event.target.name === 'text-top') {
      // Update textTop state
      setTextTop(event.target.value)
    } else {
      // Update textBottom state
      setTextBottom(event.target.value)
    }
  }

  function handleMemeGeneration() {
    domtoimage.toPng(contentContainerRef.current).then((dataUrl) => {
      // Save image
      window.saveAs(dataUrl, 'meme.png');
    })
  }


  // Upload Straight to Cloudinary
  const widget = window.cloudinary.createUploadWidget({ 
    cloudName: "traphouse", uploadPreset: "memehouse", tags: ['meme']}, 
    (error, result) => { 
      if (result.event === "success") {
      console.log(`Success! added to your Database -- ${result.info.url}`)
      axios.post('/api/putData', {
        meme: result.info.url
        })
        .then((result) => {
          let newMeme = result.config.data;
          let tempArray = [];
          tempArray.push(newMeme);
          this.setState({ memeArray: tempArray });
        })
        .then(() => {
          this.getDataFromDB();
        })
        .then(() => {
          this.getLeadersFromDB();
        })
        .catch((err) => {
          console.log(err);
        });
      window.location.reload();
      }
    });

  function uploadStraightToCloud() {
    domtoimage.toPng(contentContainerRef.current).then((dataUrl) => {
      widget.open(null, {files: [dataUrl]})})
  }

  React.useEffect(() => {
    // Call fetchImage method
    fetchImage()
  }, [])

  return (
    <div className="columns meme-gen-columns">
      <div className="column">
        <form className="form">
          <div className="formInputs">
            {/* Top Text Input */}
            <input
              name="text-top"
              placeholder="Top Text"
              type="text"
              value={textTop}
              onChange={handleInputChange}
            />
            {/* Bottom Text Input */}
            <input
              name="text-bottom"
              placeholder="Bottom Text"
              type="text"
              value={textBottom}
              onChange={handleInputChange}
            />
          </div>

          <div className="formButtons">
            {/* Upload Meme Button */}
            <label
              className="button is-link"
              htmlFor="fileInput"
            >
              <span className="file-label">
                Add Image
              </span>
              <input id="fileInput" name="fileInput" type="file" accept=".jpg, .jpeg, .png" onChange={handleImageInputChange} hidden />
            </label>
            {/* Randomize Meme Button */}
            <button
              className="button is-danger"
              type="button"
              onClick={handleImageChange}
            >
              Randomize
            </button>
            {/* Download Meme Button */}
            <button
              className="button is-warning"
              type="button"
              onClick={handleMemeGeneration}
            >
              Download
            </button>

            {/* Upload Straight to Cloud */}
            <button
              className="button is-success"
              type="button"
              onClick={uploadStraightToCloud}
            >
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">
                Upload
              </span>
            </button>
          </div>
        </form>
        <hr/>
        <FakeFooter />
      </div>

      <div className="column">
        {/*Content Div */}
        <div className="content" ref={contentContainerRef}>
          {/* Image preview */}
          <img src={activeImage} alt="Meme" />
          {/* Text at the top */}
          <h1 className="textTop">{textTop}</h1>
          {/* Text at the bottom */}
          <h1 className="textBottom">{textBottom}</h1>
        </div>
      </div>
    </div>
  )
}
export default MemeGenerator;