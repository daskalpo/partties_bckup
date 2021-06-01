
import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom'
import {Helper, Url, Global, Api} from '../config';
import Modal from 'react-modal';
import MenuPicker from './menuPickerComponent';


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

export default class AddMenuComponent extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            attributeStatus: ["active", "Inactive"],
            selectedStatus: "inactive",
            itemName: "",
            attribute_list: [],
            currentAttribute: {},
            selectedAttributeIndex: 0,
        }

    }

    componentDidMount = () =>{
        //this.fetch_attribute_dropdown()
        
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
    
    handleCropImage = (image, fileName) => {
      croppedImage = image;
      croppedFilename = fileName;
    }

    onNameChange = (name) => {
        this.setState({itemName: name.target.value});
    }

    onSave = () => {
        const { itemName, currentAttribute, selectedAttributeIndex } = this.state;

        
        try {
          var formdata = new FormData(); 
          if (itemName.length<1){
            alert("Please enter a menu name first.");
            return false;
          }
          if (itemName.length>12){
            alert('Menu name should be within 12 character.');
            return false;
          }else {   
            if (croppedImage == null || croppedImage == undefined){
                alert("Please select an image first!");
                return false;
            }else {
                formdata.append("name", itemName);
                formdata.append("attribute_id",  this.props.attribute_list[selectedAttributeIndex].id);
                formdata.append("image", croppedImage, croppedFilename);
            }
            // console.log(itemName,);
            // alert(formdata);
            // return false;
            let api = Url.admin_top_menu_add_new;
            Api.add_admin_top_menus(api, formdata).then((res) => {
                let response = JSON.parse(res);
                let data = response;
                if (data.status == "OK"){
                  this.props.refresh_menus_list();
                  croppedImage = null;
                  croppedFilename = "";
                }
              });
          }
        } catch (error) {
          console.error(error);
        }
        
    }

    render(){
        const {itemName, currentAttribute, selectedAttributeIndex, attribute_list} = this.state;
        return (
            <Modal 
                isOpen={this.props.showForm}
                style={customStyles}>
                <div style={{height:"600px", width:"60%", alignContent:'center'}}> 
                    <form id= "add-app">
            
                        <ul>
                            <label>Attribute Name : 
                            <input name="attribute" type="text" value={itemName} onChange={this.onNameChange.bind(this)}/>
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
                
                        {/* <label>Server details : 
                        <input ></input>
                        </label> */}
                        <ul>
                            <MenuPicker
                                handleCropImage={this.handleCropImage.bind(this)}
                            />
                        </ul>
                
                        <ul style={{display:'inline'}}>
                            <button type="button" onClick={this.onSave.bind(this)}>Save</button>
                            {/* <Link
                                onClick={this.onSave.bind(this)}
                                className="btn btn-success btn-sm rightyadmin"
                                //href="#admin-panel/products"
                            >
                                <i className="fas fa-plus"></i>
                                Save
                            </Link> */}
                            <button onClick={() => this.props.handleModal()}>Cancel</button>
                        </ul>
                    </form>
                </div>
           </Modal>
          );
    }




}