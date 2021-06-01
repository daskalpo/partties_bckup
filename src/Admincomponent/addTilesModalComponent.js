import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom'
import {Helper, Url, Global, Api} from '../config';
import Modal from 'react-modal';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import swal from "sweetalert2";


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

export default class AddTilesModalComponent extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            selectedStatus: 1,
            tileName: "",
            attribute_list: [],
            currentAttribute: {},
            selectedAttributeIndex: 0,
            widget_id:0,
            current_widget: {},

            src: null,
            crop: {
                unit: "px",
                height: 320,
                width: 320,
                aspect: 1 / 1,
                circularCrop: false
            },
            cropFilename: "",
            cropImage: null,
            isProperImage: false,
        }
    }

    componentDidMount = () => {
      this.setState({widget_id: this.props.widget_id, current_widget: this.props.current_widget});
      console.log(this.props.current_widget);
      if(this.props.attribBoxs.length>0){
        this.props.attribBoxs.map((item, index) => {
          if (index == this.props.clickedTileItemIndex){
            this.setState({ tileName: item.name})
            this.props.attribute_list.map((attribute, attrIndex)=> {
              if (item.attribute_id == attribute.id){
                this.setState({selectedAttributeIndex: attrIndex});
              }
            })
          }
        });
      }
    }

    onNameChange = (name) => {
        console.log("Name changed: "+name.target.value);
        this.setState({tileName: name.target.value});
    };

    handleStatusChange = (e) =>{
        this.setState({selectedStatus: e.target.value});
    }

    handleAttributeChange = (e) => {
        console.log(this.props.attribute_list[e.target.value]);
        this.setState({selectedAttributeIndex: e.target.value});
        this.setState({currentAttribute: this.props.attribute_list[e.target.value]});
    }


    onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            this.setState({ src: reader.result });
            // let image = new Image();
            // image.src = reader.result;
            // image.onload = function(){
              
            //   this.setState({isProperImage: true});
            // }
            
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

      handleCropImage = () => {
        
      }

      toast = (message) => {
        const Toast = swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener("mouseenter", swal.stopTimer);
            toast.addEventListener("mouseleave", swal.resumeTimer);
          },
        });
        Toast.fire({ type: "success", title: message });
    };

      onSave = () => {
        const { tileName, current_widget, attribute_list, widget_id, selectedStatus, cropImage, cropFilename,
           selectedAttributeIndex, isProperImage } = this.state;
        if (cropImage == null || cropImage == undefined || cropFilename.length<5){
            alert("Please select an image first");
            return false;
        }

        if (tileName.length<4) {
          alert("Please enter a name first.");
        }else {
          let attribox_id = 0;
          let attribute_id = this.props.attribute_list[selectedAttributeIndex].id;
          var formdata = new FormData();
          formdata.append("name", tileName);
          formdata.append("widget_id", this.props.widget_id);
          formdata.append("status", selectedStatus);
          formdata.append("location", "attrbox");
          formdata.append("attribute_id", attribute_id);
          formdata.append("order", this.props.clickedTileItemIndex);
          if (cropImage != null || cropImage != undefined){
              formdata.append("image", cropImage, cropFilename);
          }
//this.props.attribBoxs.length
          let index = Number(this.props.clickedTileItemIndex) + 1;
          if (this.props.attribBoxs.length>0 && index == 1){
            attribox_id = this.props.attribBoxs[0].id;
          }else if (this.props.attribBoxs.length>1 && index == 2){
            attribox_id = this.props.attribBoxs[1].id;
          }else if (this.props.attribBoxs.length>2 && index == 3){
            attribox_id = this.props.attribBoxs[2].id;
          }else if (this.props.attribBoxs.length>3 && index == 4){
            attribox_id = this.props.attribBoxs[3].id;
          }
          let api = Url.admin_widget_add_attribute_tile;
          if (attribox_id>0){
            api = Url.admin_widget_edit_attribute_tile+attribox_id;
          }
          
          Api.add_edit_admin_banner(api, formdata).then((res) => {
            let response = JSON.parse(res);
            let data = response;
            console.log(data);
            if (data.status == "OK"){
              //this.props.refresh_widget_list();
              //this.props.handleModal();
              this.setState({cropImage: null, cropFilename: ""});
              this.props.handleAttributeOnSave(this.props.clickedTileItemIndex);
              this.toast(data.message);
            }
          });

          
        }
      }

      onDelete = () => {

      }

    render(){


        const {tileName, current_widget, widget_id, attribute_list, selectedStatus} = this.state;

        const { crop, croppedImageUrl, src, cropFilename, cropImage, selectedAttributeIndex, isProperImage } = this.state;
    
        return(
                <Modal 
                    isOpen={this.props.showForm}
                    style={customStyles}>
                    <div style={{alignContent:'center'}}> 
                        <form id= "add-app">
                
                            <ul>
                                <label>Name : 
                                <input name="name" type="text" value={tileName} onChange={this.onNameChange.bind(this)}/>
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
                    
                            {/* {this.props.isEditModeON && 
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
                          } */}
                            
                            <ul>
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
                                    minHeight={512}
                                    minWidth={512}
                                    maxHeight={1024}
                                    maxWidth={1024}
                                    locked={true}
                                    ruleOfThirds
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
                                    {croppedImageUrl && this.handleCropImage.bind(this)}
                                </ul>
                                
                            </div>
                            </ul>
                    
                            <ul style={{display:'inline'}}>
                                {/* {this.props.isEditModeON && 
                                  <button onClick={this.onDelete.bind(this)}>Delete</button>
                                } */}
                                <button type="button" onClick={this.onSave.bind(this)}>Save</button>
                                <button onClick={() => this.props.handleModal()}>Cancel</button>
                            </ul>
                        </form>
                    </div>
               </Modal>
        );
    }


}