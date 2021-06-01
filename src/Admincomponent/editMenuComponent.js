
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

const croppedImage = null

export default class EditMenuComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            itemName: "",
            currentAttribute: {},
            selectedAttributeIndex: 0,
        }



    }

    componentDidMount =()=> {

    }

    handleAttributeChange = (e) => {
        console.log(this.props.attribute_list[e.target.value]);
        this.setState({selectedAttributeIndex: e.target.value});
        this.setState({currentAttribute: this.props.attribute_list[e.target.value]});
    }
    
    handleCropImage = (image) => {
        console.log(image);
        //this.setState({selectedImage: image});
        croppedImage = image;
    }

    onNameChange = (name) => {
        console.log("Name changed: "+name.target.value);
        this.setState({itemName: name.target.value});
    }



}