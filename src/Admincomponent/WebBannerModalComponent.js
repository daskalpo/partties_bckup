import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom'
import {Helper, Url, Global, Api} from '../config';
import Modal from 'react-modal';
import WebBannerPicker from './webBannerPickerComponent';


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


const croppedImage = null;
const croppedFilename = "";

export default class WebBannerModalComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            attributeStatus: ["active", "Inactive"],
            selectedStatus: 1,
            bannerName: "",
            bannerOffer: "",
            bannerDetail: "",
            attribute_list: [],
            currentAttribute: {},
            selectedAttributeIndex: 0,
        }
    }

componentDidMount = () => {
  try {
    if (this.props.isEditModeON){
      let currentItem = this.props.editableItem;
      this.setState({bannerName: currentItem.name, bannerOffer: currentItem.banner_offer_title, bannerDetail: currentItem.banner_details, selectedStatus: currentItem.status});

      //console.log(currentItem);
      this.props.attribute_list.map((attribute, index)=> {
        if (attribute.id == currentItem.attribute_id){
          this.setState({selectedAttributeIndex: index});
        }
      });
    }
  } catch (error) {
    console.log(error); 
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

handleCropImage = (image, fileName) => {

  croppedImage = image;
  croppedFilename = fileName;
  // if (isProperImage) {

  // }else {
  //   alert("Use a proper image to proceed to next. "+isProperImage);
  // }
    
}

onNameChange = (name) => {
    console.log("Name changed: "+name.target.value);
    this.setState({bannerName: name.target.value});
}

onOfferChange = (offer)=> {
    this.setState({bannerOffer: offer.target.value});
}
onDetailChange = (detail)=> {
    this.setState({bannerDetail: detail.target.value});
}

onSave = () => {
  console.log("Saving.....", this.props.attribute_list)
  try{
    const { bannerName, bannerOffer, bannerDetail, currentAttribute, attribute_list, selectedAttributeIndex, 
      selectedStatus } = this.state;
      if (bannerName.length<1 && bannerOffer.length<1 && bannerDetail.length<1){
        alert('Please enter form details first to proceed to the next.')
      }
      if (bannerName.length>30){
        alert('Banners should be under 30 characters.');
        return false;
      }
      if (bannerOffer.length>50){
        alert('Banners should be under 50 characters.');
        return false;
      }
      else {
        var formdata = new FormData();    
        if (!this.props.isEditModeON){
          //alert("new banner");
            if (croppedImage == null || croppedImage == undefined){
                alert("Please select an image first!");
            }else {

                let attribute_id = this.props.attribute_list[selectedAttributeIndex].id;

                formdata.append("name", bannerName);
                formdata.append("banner_offer_title", bannerOffer);
                formdata.append("banner_details", bannerDetail);
                formdata.append("location", "desktop");
                formdata.append("status", "1");
                formdata.append("attribute_id", attribute_id);
                formdata.append("image", croppedImage, croppedFilename);
            }
            //alert('calling api');
            let api = Url.admin_add_new_banner;
            Api.add_edit_admin_banner(api, formdata).then((res) => {
                let response = JSON.parse(res);
                let data = response;
                if (data.status == "OK"){
                  this.props.refresh_menus_list();
                  this.props.handleModal();
                }
              });

        }else {
            //alert("edit banner");
            let currentItem = this.props.editableItem
            let attribute_id = "";
                if(currentAttribute.id == undefined){
                    attribute_id = currentItem.attribute_id;
                }else {
                    attribute_id = this.props.attribute_list[selectedAttributeIndex].id;
                }
            if (croppedImage == null || croppedImage == undefined){
              formdata.append("name", bannerName);
              formdata.append("banner_offer_title", bannerOffer);
              formdata.append("banner_details", bannerDetail);
              formdata.append("location", "desktop");
              formdata.append("status", selectedStatus);
              formdata.append("attribute_id", attribute_id);
              
            }else {
                formdata.append("name", bannerName);
                formdata.append("banner_offer_title", bannerOffer);
                formdata.append("banner_details", bannerDetail);
                formdata.append("location", "desktop");
                formdata.append("status", selectedStatus);
                formdata.append("attribute_id", attribute_id);
                formdata.append("image", croppedImage, croppedFilename);
            }
            let api = Url.admin_edit_banner+currentItem.id;
            Api.add_edit_admin_banner(api, formdata).then((res) => {
                let response = JSON.parse(res);
                let data = response;
                console.log(data);
                if (data.status == "OK"){
                  this.props.refresh_menus_list();
                  this.props.handleModal();
                }
              });
        }
      }
    }catch(error){
      console.log(error);
    }
}

onDelete = () => {
  try {
    
    this.props.handleModal();
    let currentItem = this.props.editableItem;
    console.log(currentItem);
    let api = Url.admin_delete_banner+currentItem.id;
      Api.delete_admin_banner(api).then((res) => {
          let response = JSON.parse(res);
          let data = response.response;
          console.log(data);
          if (data.status == "OK"){
            this.props.refresh_menus_list();
          }
        });
  } catch (error) {
    //console.log(error);
  }
}

render(){


    const {bannerName, bannerOffer, bannerDetail, currentAttribute, selectedAttributeIndex, attribute_list, selectedStatus} = this.state;
    //this.setState({attribute_list:this.props.attribute_list})

    
    

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
                            <label>Banner Offer Title : 
                            <input name="offer" type="text" value={bannerOffer} onChange={this.onOfferChange.bind(this)}/>
                            </label>
                        </ul>
                        <ul>
                            <label>Banner Details : 
                            <input name="detail" type="text" value={bannerDetail} onChange={this.onDetailChange.bind(this)}/>
                            </label>
                        </ul>

                      {this.props.isEditModeON && 
                        <ul>
                          <div className="form-group">
                            <label>Status: </label>

                            <select
                              value={selectedStatus}
                              onChange={this.handleStatusChange.bind(this)}
                              // className={`form-control pro_fon ${
                              //   this.state.error_text_attribute_status ? "errorval" : ""
                              // }`}
                            >
                              <option value="1">Active</option>
                              <option value="0">Inactive</option>
                            </select>
                            {/* {this.state.error_text_attribute_status && (
                              <span className="errorText">
                                {this.state.error_text_attribute_status}
                              </span>
                            )} */}
                          </div>
                        </ul>
                      }

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
                
                        
                        <ul>
                            <WebBannerPicker
                                handleCropImage={this.handleCropImage.bind(this)}
                                handleModal={this.props.handleModal}
                            />
                        </ul>
                
                        <ul style={{display:'inline'}}>
                        {this.props.isEditModeON && 
                          <button onClick={this.onDelete.bind(this)}>Delete</button>
                        }
                            <button type="button" onClick={this.onSave.bind(this)}>Save</button>
                            <button type="button" onClick={() => this.props.handleModal()}>Cancel</button>
                        </ul>
                    </form>
                </div>
           </Modal>
    );
}

}