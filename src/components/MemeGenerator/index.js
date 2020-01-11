import * as React from 'react';
import domtoimage from 'dom-to-image-more';
import { saveAs } from 'file-saver';
import './style.css';

function MemeGenerator() {
  let contentContainerRef = React.useRef(null)
  
  const [images, setImages] = React.useState([]);
  const [activeImage, setActiveImage] = React.useState('');
  const [textTop, setTextTop] = React.useState('');
  const [textBottom, setTextBottom] = React.useState('');
  const [isMemeGenerated, setIsMemeGenerated] = React.useState(false);
  // let imageNames = images.map((data) => <option className="is-clipped" value={data.name} key={data.name}>{data.name}</option>);
  

  async function fetchImage() {
    // Get the memes
    const imgData = await fetch('https://api.imgflip.com/get_memes').then(res => res.json()).catch(err => console.error(err))
    const { memes } = await imgData.data

    // Update images state
    await setImages(memes)
    // console.log(memes.map((data) => { return data.name} ));

    // Update activeImage state
    await setActiveImage(memes[16].url)
  }

  function handleImageChange() {
    // Choose image
    
    // Update activeImage state
    // setActiveImage(image.url)
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
      // Update state for isMemeGenerated
      setIsMemeGenerated(true)
    })
  }

  React.useEffect(() => {
    // Call fetchImage method
    fetchImage()
  }, [])

  return (
    <div>
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
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">
              Upload image
            </span>
            <input id="fileInput" name="fileInput" type="file" accept=".jpg, .jpeg, .png" onChange={handleImageInputChange} hidden />
          </label>
          {/* Download Meme Button */}
          <button
            className="button is-success"
            type="button"
            onClick={handleMemeGeneration}
          >
            Generate meme
          </button>
        </div>
        {/* Meme Name Dropdown */}
        {/* <div className="select is-small dropdown">
            <select onClick={handleImageChange}>
              <option>Pick a Meme</option>
              {imageNames}
            </select>
        </div> */}
      </form>

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
  )
}
export default MemeGenerator;