import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom'
import {Helper, Url, Global, Api} from '../config';
import Modal from 'react-modal';
import MobileBannerPicker from './mobileBannerPickerComponent';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      //marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      //height                : '50%',
      width                 : '50%',
    }
};

export default class SliderComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectedStatus: 0,
            bannerName: "",
            attribute_list: [],
            currentAttribute: {},
            selectedAttributeIndex: 0,
            src: null,
            crop: {
            unit: "px",
            height: 240,
            width: 840,
            aspect: 16 / 9,
            circularCrop: false
            },
            cropFilename: "",
            cropImage: null,
        }
    }
    
    componentDidMount = () => {
        if (this.props.isEditModeON){
            
            let currentItem = this.props.editableItem;
            if (currentItem.name == undefined || currentItem.name == null){
                this.setState({selectedStatus: currentItem.status, bannerName: ""});
            }else {
                this.setState({selectedStatus: currentItem.status, bannerName: currentItem.name});
            }
            this.props.attribute_list.map((attribute, index)=> {
                if (attribute.id == currentItem.attribute_id){
                    this.setState({selectedAttributeIndex: index});
                }
            });
        }
    }

    fetch_attribute_dropdown = () => {
        let api = Url.admin_product_attributes_list;
        Api.fetch_product_attributes_list(api).then((res) => {
          let data = JSON.parse(res);
          if (data.code == "200") {
            let local_attribute = [];
            data.data.map((attribute) => {
              let single_attribute_object = {
                id: attribute.id,
                name: attribute.name,
                isChecked: false,
              };
              local_attribute.push(single_attribute_object);
            });
            this.setState({ attribute_list: local_attribute });
          }
        });
    };

    handleAttributeChange = (e) => {
        console.log(this.props.attribute_list[e.target.value]);
        this.setState({selectedAttributeIndex: e.target.value});
        this.setState({currentAttribute: this.props.attribute_list[e.target.value]});
    }
    
    
    handleStatusChange = (e) =>{
      this.setState({selectedStatus: e.target.value});
    }
    onNameChange = (name) => {
        console.log("Name changed: "+name.target.value);
        this.setState({bannerName: name.target.value});
    }

    onCancel = () =>{
        this.setState({bannerName:"", selectedStatus: 1, selectedAttributeIndex: 0, cropFilename: "", cropImage: null});
        this.props.handleModal();
    }

    onDelete = () => {
        try {
          
            this.props.handleModal();
            let currentItem = this.props.editableItem;
            console.log(currentItem);
            // let api = Url.admin_delete_banner+currentItem.id;
            // Api.delete_admin_banner(api).then((res) => {
            //     let response = JSON.parse(res);
            //     let data = response.response;
            //     console.log(data);
            //     if (data.status == "OK"){
            //         this.props.refresh_menus_list();
            //     }
            // });
        } catch (error) {
          //console.log(error);
        }
    }

    onSave = () => {
        const { bannerName, currentAttribute, selectedAttributeIndex, selectedStatus, cropImage, cropFilename } = this.state;
        
        if (bannerName.length<1) {
            alert("Please enter name first");
            return false;
        }
        if (bannerName.length>0 && bannerName.length<5) {
            alert("Please enter proper name.");
            return false;
        }
        if (cropImage == null || cropImage == undefined){
            alert('Please select image first!');
            return false;
        }else {
            var formdata = new FormData(); 
            if (!this.props.isEditModeON){ 
                if (this.props.attribute_list != undefined && this.props.attribute_list.length>0){
                    let attribute_id = this.props.attribute_list[selectedAttributeIndex].id;
                    formdata.append("name", bannerName);
                    formdata.append("status", "1");
                    formdata.append("widget_id", this.props.widget_id);
                    formdata.append("attribute_id", attribute_id);
                    formdata.append("location", "sliderbox");
                    formdata.append("image", cropImage, cropFilename);

                    
                    let api = Url.admin_add_widget_slider;
                    Api.add_edit_admin_banner(api, formdata).then((res) => {
                        let response = JSON.parse(res);
                        let data = response;
                        if (data.status == "OK"){
                        this.setState({bannerName:"", selectedStatus: 1, selectedAttributeIndex: 0, cropImage: null, cropFilename: ""});
                        this.props.handleModal();
                        this.props.refresh_menus_list();
                        }
                    });
                }
            }else {

                let currentItem = this.props.editableItem
                let attribute_id = this.props.attribute_list[selectedAttributeIndex].id;
                    
                formdata.append("name", bannerName);
                formdata.append("status", selectedStatus);
                formdata.append("widget_id", this.props.widget_id);
                formdata.append("attribute_id", attribute_id);
                formdata.append("location", "sliderbox");
                if (cropImage != null || cropImage != undefined){
                    formdata.append("image", cropImage, cropFilename);
                }
                

                let api =  Url.admin_edit_widget_slider+currentItem.id;
                Api.add_edit_admin_banner(api, formdata).then((res) => {
                    let response = JSON.parse(res);
                    let data = response;
                    if (data.status == "OK"){
                    this.setState({bannerName:"", selectedStatus: 1, selectedAttributeIndex: 0, cropImage: null, cropFilename: ""});
                    this.props.handleModal();
                    this.props.refresh_menus_list();
                    }
                });

            }
        }
        
    }

    onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            this.setState({ src: reader.result });
            
            let image = new Image();
            image.src = reader.result;
            image.onload = function(){
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
        this.setState({cropFilename: "Img_" + dformat + ".jpeg"})
        return "Img_" + dformat + ".jpeg";
      }
    
      async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
          const croppedImageUrl = await this.getCroppedImg(
            this.imageRef,
            crop,
            this.getFileName()
          );
          //this.props.handleCropImage(croppedImageUrl)
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
          }, "image/jpeg");
        });
      }


    render(){
        const { bannerName, crop, croppedImageUrl, src, cropFilename, cropImage, selectedAttributeIndex,
            selectedStatus } = this.state;
        return(
            <Modal 
                isOpen={this.props.showForm}
                style={customStyles}>
                <div style={{alignContent:'center'}}> 
                    <form id= "add-app">
            
                        <ul>
                            <label>Name : 
                            <input name="name" type="text" value={bannerName} onChange={this.onNameChange.bind(this)}/>
                            </label>
                        </ul>
                        

                        <ul>
                            <label> Select Attribute :
                                <div>
                                {/* <i className="fas fa-sort-down"></i> */}
                                      <select
                                        className="menuStatusSelect"
                                        onChange={this.handleAttributeChange.bind(
                                          this
                                        )}
                                        value={selectedAttributeIndex}
                                        >
                                        {this.props.attribute_list.map(
                                          (stateAttribute, index) => (
                                            <option 
                                              key={index} 
                                              value={index}>
                                              {stateAttribute.name}
                                            </option>
                                          )
                                        )}
                                      </select>
                                </div>
                            </label>
                        </ul>
                
                        {this.props.isEditModeON && 
                        <ul>
                          <div className="form-group">
                            <label>Status: </label>

                            <select
                              value={selectedStatus}
                              onChange={this.handleStatusChange.bind(this)}
                            
                            >
                              <option value="1">Active</option>
                              <option value="0">Inactive</option>
                            </select>
                          </div>
                        </ul>
                      }
                        <ul>
                        <div className="MobileBannerPicker">
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
                                      ruleOfThirds={true}
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
                            {/* <ul style={{marginTop:"15px", marginBottom:"15px"}}>
                                {croppedImageUrl && this.props.handleCropImage(cropImage, cropFilename)}
                            </ul> */}
                            
                        </div>
                        </ul>
                
                        <ul style={{display:'inline'}}>
                            {false && 
                              <button onClick={this.onDelete.bind(this)}>Delete</button>
                            }
                            <button type="button" onClick={this.onSave.bind(this)}>Save</button>
                            <button type="button" onClick={() => this.onCancel()}>Cancel</button>
                        </ul>
                    </form>
                </div>
           </Modal>
            
        );
    };
}
