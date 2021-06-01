import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";


export default class WebBannerPicker extends React.Component{
    state = {
        src: null,
        crop: {
          unit: "%",
          height: 100,
          width: 100,
          aspect: 16 / 9,
          circularCrop: false
        },
        cropFilename: "",
        cropImage: null,
        isProperImage: false,

      };
    
      onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            this.setState({ src: reader.result});
            let image = new Image();
            image.src = reader.result;
            image.onload = () =>{
              //alert(image.width+"x"+image.height);
              // if (Number(image.width)>840 && Number(image.height)>240) {
              //   this.setState({ src: reader.result, isProperImage: true });
              // }
            }
          });
          reader.readAsDataURL(e.target.files[0]);
        }
      };
    
      // If you setState the crop in here you should return false.
      onImageLoaded = (image) => {
        this.imageRef = image;
      };
    
      onCropComplete = (crop) => {
        this.makeClientCrop(crop);
      };
    
      onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
      };

      getFileName() {
        let d = new Date();
        let dformat = `${d.getFullYear()}_${d.getMonth()}_${d.getDate()}_${d.getHours()}_${d.getMinutes()}_${d.getSeconds()}`;
    
        console.log("getCurrentDate : ", dformat);
        this.setState({cropFilename: "Img_" + dformat + ".png"})
        return "Img_" + dformat + ".png";
      }
    
      async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
          const croppedImageUrl = await this.getCroppedImg(
            this.imageRef,
            crop,
            this.getFileName()
          );
          //this.props.handleCropImage(croppedImageUrl, this.state.cropFilename);
          this.setState({ croppedImageUrl });
        }
      }
    
      getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        //ctx.clearRect(0, 0, canvas.height, canvas.width);
    
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
    
        return new Promise((resolve, reject) => {
          canvas.toBlob((blob) => {
            if (!blob) {
              //reject(new Error('Canvas is empty'));
              console.error("Canvas is empty");
              return;
            }
            blob.name = fileName;
            this.setState({cropImage: blob});
            window.URL.revokeObjectURL(this.fileUrl);
            this.fileUrl = window.URL.createObjectURL(blob);
            resolve(this.fileUrl);
          }, "image/png");
        });
      }
    
      render() {
        const { crop, croppedImageUrl, src, cropFilename, cropImage, isProperImage } = this.state;
    
        return (
          <div className="menuPicker">
            <div style={{marginTop:"15px", marginBottom:"15px", maxHeight:"1024px"}}>
              <input type="file" accept="image/*" onChange={this.onSelectFile} />
            </div>
            {src && (
              <div 
              style={{display: 'block', maxWidth:'1280px', height:'300px',
              overflow:'hidden',overflowX:'scroll', overflowY:'scroll'}}
                >
              <ReactCrop
                src={src}
                crop={crop}
                circularCrop={false}
                locked={true}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
                style={{display: 'block', width:'1280px', maxWidth:'1280px'}}
                imageStyle={{maxWidth:"1280px"}}
              />
              </div>
            )}
            {/* {croppedImageUrl && (
              <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
            )} */}
            <ul style={{marginTop:"15px", marginBottom:"15px"}}>
                {croppedImageUrl && this.props.handleCropImage(cropImage, cropFilename)}
            </ul>
            
          </div>
        );
    }
}