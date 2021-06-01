import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom'
import {Helper, Url, Global, Api} from '../config';
import Modal from 'react-modal';
import MobileBannerPicker from './mobileBannerPickerComponent';


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      //marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      height                : '500px',
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
            selectedStatus: 0,
            bannerName: "",
            attribute_list: [],
            currentAttribute: {},
            selectedAttributeIndex: 0,
        }
    }

componentDidMount = () => {
  try {
    if (this.props.isEditModeON){
      if (this.props.type == "widget"){
        console.log("Widget slider picker");
        return;
      }
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

handleCropImage = (image, fileName, isProperImage) => {
  croppedImage = image;
  croppedFilename = fileName;
    // if (isProperImage) {
    // }else {
    //   alert("Please select a valid Image.")
    // }
    //this.setState({selectedImage: image});
}

onNameChange = (name) => {
    console.log("Name changed: "+name.target.value);
    this.setState({bannerName: name.target.value});
}

onCancel = () =>{
  croppedImage = null;
  croppedFilename = "";
  this.setState({bannerName:"", selectedStatus: 1, selectedAttributeIndex: 0});
  this.props.handleModal();
}

onSave = () => {
  console.log("Saving.....")
    const { bannerName, currentAttribute, selectedAttributeIndex, selectedStatus } = this.state;
    if (this.props.type == "widget"){
      this.onWidgetSliderSave()
    }else {

      if (bannerName.length<2) {
        alert("Please enter name first");
      }else {
        var formdata = new FormData(); 
        try {
            
          if (!this.props.isEditModeON){ 
            if (croppedImage == null || croppedImage == undefined){
                console.log("Cannot add this menu");
                alert("Please select an image first!");
                return;
            }else {
                let attribute_id = this.props.attribute_list[selectedAttributeIndex].id;
                formdata.append("name", bannerName);
                formdata.append("status", "1");
                formdata.append("attribute_id", attribute_id);
                formdata.append("location", "mobile");
                formdata.append("image", croppedImage, croppedFilename);
            }
            let api = Url.admin_add_new_banner;
            Api.add_edit_admin_banner(api, formdata).then((res) => {
                let response = JSON.parse(res);
                let data = response;
                if (data.status == "OK"){
                  croppedImage = null;
                  croppedFilename = "";
                  this.setState({bannerName:"", selectedStatus: 1, selectedAttributeIndex: 0});
                  this.props.handleModal();
                  this.props.refresh_menus_list();
                }
              });
          }else {

            let currentItem = this.props.editableItem
            let attribute_id = "";
                if(currentAttribute.id == undefined){
                    attribute_id = currentItem.attribute_id;
                }else {
                    attribute_id = this.props.attribute_list[selectedAttributeIndex].id;
                }
            if (croppedImage == null || croppedImage == undefined){
              
              formdata.append("name", bannerName);
              formdata.append("status", selectedStatus);
              formdata.append("attribute_id", attribute_id);
              formdata.append("location", "mobile");
            }else {
                formdata.append("name", bannerName);
                formdata.append("status", selectedStatus);
                formdata.append("attribute_id", attribute_id);
                formdata.append("location", "mobile");
                formdata.append("image", croppedImage, croppedFilename);
            }

            let api =  Url.admin_edit_banner+currentItem.id;
            Api.add_edit_admin_banner(api, formdata).then((res) => {
                let response = JSON.parse(res);
                let data = response;
                if (data.status == "OK"){
                  croppedImage = null;
                  croppedFilename = "";
                  this.setState({bannerName:"", selectedStatus: 1, selectedAttributeIndex: 0});
                  this.props.handleModal();
                  this.props.refresh_menus_list();
                }
              });

          }
        } catch (error) {
            console.log(error);
        }
      }
    }
}

onWidgetSliderSave = () => {
  const { bannerName, currentAttribute, selectedAttributeIndex, selectedStatus } = this.state;
  if (bannerName==undefined || bannerName == ""){
    alert("Please enter a name");
    return;
  }
  var formdata = new FormData();   
    if (!this.props.isEditModeON){ 
      if (croppedImage == null || croppedImage == undefined || croppedFilename.length<5){
          alert("Please select an image first!");
      }else {
          let attribute_id = this.props.attribute_list[selectedAttributeIndex].id;
          formdata.append("name", bannerName);
          formdata.append("widget_id", this.props.widget_id);
          formdata.append("status", "1");
          formdata.append("attribute_id", attribute_id);
          formdata.append("location", "sliderbox");
          formdata.append("image", croppedImage, croppedFilename);
      }
      let api = Url.admin_add_widget_slider;
      Api.add_edit_admin_slider(api, formdata).then((res) => {
          let response = JSON.parse(res);
          let data = response;
          if (data.status == "OK"){
            croppedImage = null;
            croppedFilename = "";
            this.setState({bannerName:""});
            this.props.refresh_menus_list();
            //this.props.handleModal();
          }
        });
    }else {

      let currentItem = this.props.editableItem
      let attribute_id = this.props.attribute_list[selectedAttributeIndex].id;
          
      if (croppedImage == null || croppedImage == undefined || croppedFilename.length<5){
        
        formdata.append("name", bannerName);
        formdata.append("widget_id", this.props.widget_id);
        formdata.append("status", selectedStatus);
        formdata.append("attribute_id", attribute_id);
        formdata.append("location", "sliderbox");
      }else {
          formdata.append("name", bannerName);
          formdata.append("widget_id", this.props.widget_id);
          formdata.append("status", selectedStatus);
          formdata.append("attribute_id", attribute_id);
          formdata.append("location", "sliderbox");
          formdata.append("image", croppedImage, croppedFilename);
      }

      let api =  Url.admin_add_widget_slider; //+currentItem.id;
      Api.add_edit_admin_slider(api, formdata).then((res) => {
          let response = JSON.parse(res);
          let data = response;
          if (data.status == "OK"){
            croppedImage = null;
            croppedFilename = "";
            this.setState({bannerName:""});
            this.props.refresh_menus_list();
            //this.props.handleModal();
          }
        });

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


    const {bannerName, currentAttribute, selectedAttributeIndex, attribute_list, selectedStatus} = this.state;

    return(
            <Modal 
                isOpen={this.props.showForm}
                style={customStyles}>
                <div style={{maxWidth:"1024px", alignContent:'center'}}> 
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
                            <MobileBannerPicker
                                handleCropImage={this.handleCropImage.bind(this)}
                                handleModal={this.props.handleModal}
                            />
                        </ul>
                
                        <ul style={{display:'inline'}}>
                            {this.props.isEditModeON && 
                              <button onClick={this.onDelete.bind(this)}>Delete</button>
                            }
                            <button type="button" onClick={this.onSave.bind(this)}>Save</button>
                            <button type="button" onClick={() => this.onCancel()}>Cancel</button>
                        </ul>
                    </form>
                </div>
           </Modal>
    );
}

}