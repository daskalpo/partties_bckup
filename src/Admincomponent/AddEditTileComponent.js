import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom'
import {Helper, Url, Global, Api} from '../config';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from 'react-modal';
import Carousel from 'react-bootstrap/Carousel';
import { AddEditProductModalComponent, AddTilesModalComponent, SliderComponent } from '.';


const attribObject = {
    "psoition": 0,
    "widget_id": null,
    "attribute_id": null,
    "name": null,
    "image": null
};


export default class AddEditTileComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loader: false,
            showMobileBannerModal: false,
            sliderEditMode: false,
            attribEditMode: false,
            prodEditMode: false,
            isEditModeON: false,
            
            sliderList: [],
            attribList: [],
            prodList: [],
            editableItem: {},

            showAddEditTilesModal: false,
            clickedTileItemIndex:0,
            clickedProductItemIndex:0,
            showAddEditProductModal: false,


        }
    }


    componentDidMount = () => {
        const { attribList } = this.state; 
        let current_widget = this.props.current_widget;
        console.log(current_widget);
        if (this.props.editModeOn) {
            this.setState({sliderList: current_widget.sliderboxs, attribList: current_widget.attrboxs, prodList: current_widget.proboxs,
                isEditModeON: this.props.editModeOn});
            //this.setState({isEditModeON: this.props.editModeOn, sliderEditMode: this.props.editModeOn, attribEditMode: this.props.editModeOn});
        }
    }

    fetch_widget_details = () => {
        const { showMobileBannerModal, showAddEditProductModal, showAddEditTilesModal } = this.state;
        let api =  Url.admin_widget_details+this.props.widget_id;
      Api.fetch_widget_details(api).then((res) => {
          let response = JSON.parse(res);
          let data = response.response;
          if (data.status){
            //this.props.refresh_menus_list();
            this.setState({attribList: data.data.attrboxs, attribEditMode: false});
            this.setState({prodList: data.data.proboxs, prodEditMode: false});
            this.setState({sliderList: data.data.sliderboxs, prodEditMode: false});
            if(showAddEditTilesModal){
                this.setState({showAddEditTilesModal: false});
            }
            if(showAddEditProductModal){
                this.setState({showAddEditProductModal: false});
            }
            if(showMobileBannerModal){
                this.setState({showMobileBannerModal: false});
            }
          }

        });
    }

    displayAddMobileBannerModal = () => {
        const { showMobileBannerModal } = this.state;
        if(showMobileBannerModal){
          this.setState({showMobileBannerModal: false, sliderEditMode: false});
        }else {
          this.setState({showMobileBannerModal: true, sliderEditMode: false});
        }
    }

    displayAddTilesModal = () => {
        const { showAddEditTilesModal } = this.state;
        if(showAddEditTilesModal){
          this.setState({showAddEditTilesModal: false, attribEditMode: false});
        }else {
          this.setState({showAddEditTilesModal: true, attribEditMode: false});
        }
    }

    displayAddProductModal = () => {
        const { showAddEditProductModal } = this.state;
        if(showAddEditProductModal){
          this.setState({showAddEditProductModal: false, prodEditMode: false});
        }else {
          this.setState({showAddEditProductModal: true, prodEditMode: false});
        }
    }

    loadSlider = (e) => {
        console.log(e);
        this.fetch_widget_details();
    }

    addSlider = () => {
        let menuList = this.props.menuList;
        let attribute_list = this.props.attribute_list;
        console.log("Widget ID: ", this.props.widget_id);
        console.log(attribute_list);
        this.setState({showMobileBannerModal: true, sliderEditMode: false});
    }

    handleAttributeOnSave = (e) => {
        //arr.splice(2, 0, "Lene");
        console.log(e);
        this.fetch_widget_details();
    }

    openAddAttribute = (position, item) => {
        console.log(position);
        if (item != undefined) {
            this.setState({clickedTileItemIndex: position, showAddEditTilesModal: true, attribEditMode: true});
        }else {
            this.setState({clickedTileItemIndex: position, showAddEditTilesModal: true, attribEditMode: false});
        }
    }

    openTilesAddingModal = (e) => {

    }

    onSliderEdit = (e) =>{
        console.log(e);
        this.setState({sliderEditMode: true, showMobileBannerModal: true, editableItem: e});
    }

    openAddProduct = (position, item) => {
        console.log(position);
        if (item != undefined || item != null) {
            this.setState({clickedProductItemIndex: position, showAddEditProductModal: true, prodEditMode: true});
            let jsonItem = JSON.stringify(item);
            //alert("Json is : "+ item);
        }else {
            this.setState({clickedProductItemIndex: position, showAddEditProductModal: true, prodEditMode: false});
            //alert("Item is null");
        }
    }

    onDeleteWidget = () => {
        const {widget_id} = this.state;
        let api =  Url.admin_widget_delete+this.props.widget_id;
      Api.delete_widget(api).then((res) => {
          let response = JSON.parse(res);
          let data = response.response;
          if (data.status=="OK"){
            this.props.refresh_widget_list();
            this.props.handleVisibility();
          }

        });
    }


    onSaveWidget =()=> {
        const {attribList} = this.state;
        if (attribList.length<4){
            alert("This widget is inactive untill there is 4 attribute.")
            this.props.refresh_widget_list();
            this.props.handleVisibility();
            return false
        }
        let body = {
            "status": "1",
        }
        let api =  Url.admin_widget_edit+this.props.widget_id;
        Api.edit_widget(api, body).then((res) => {
            let response = JSON.parse(res);
            let data = response;
            if (data.status=="OK"){
                this.props.refresh_widget_list();
                this.props.handleVisibility();
            }

        });
    }

    getAtributeTiles = (position) => {
        const {attribList} = this.state;
        //if (position == 0){
            try {
                let item = attribList[position];
                //alert(item.image);
                return(
                    <div onClick={this.openTilesAddingModal.bind(this, position)}>
                        <div className="tileWidgetName"> 
                            <img src={item.image} alt="Cake" className="widget_tile_image"/> 
                        </div>
                        
                        <div className="tileWidgetName">
                            <p className="tileWidgetName" onClick={this.openAddAttribute.bind(this, position, item)}><strong>{item.name}</strong></p>
                        </div>
                    </div>
                )
            } catch (error) {
                return(
                    <div onClick={this.openTilesAddingModal.bind(this, position)}>
                        <div className="tileWidgetName"> 
                            <img src={require("../assets/img/sample_cake.jpg")} alt="Cake" className="widget_tile_image"/> 
                        </div>
                        
                        <div className="tileWidgetName">
                            <p className="tileWidgetName" onClick={this.openAddAttribute.bind(this, position)}><strong>Add Attribute</strong></p>
                        </div>
                    </div>
                )
            }
        //}
    }

    getProductView = (position) => {
        const {isEditModeON, prodList} = this.state;
        try {
            let item = prodList[position];
            return (
                <li style={{display:"inline"}}>
                    <div className="widget_circular_image">
                        <img src={item.image}/>
                    </div>
                    <span style={{marginLeft:"20px"}}>{item.name}</span>
                    
                    {/* <span className="badge badge-success widgetStatusMenu">
                        active
                    </span> */}

                    <div className="inner innerWidget"  
                        //onClick={this.openDialog.bind(this, item)}
                    >
                        <Link className="btn btn-info btn-sm" 
                            onClick={this.openAddProduct.bind(this, position, item)}
                        >
                            <i className="fas fa-pencil-alt"></i>
                            Edit
                        </Link>
                        {/* onClick={() => this.setState({showForm: true})} */}
                    </div>
                    
                </li>
            )
        } catch (error) {
            return (
                <li style={{display:"inline"}}>
                    <div className="widget_circular_image">
                        <img src={require("../assets/img/sample_cake.jpg")}/>
                    </div>
                    <span style={{marginLeft:"20px"}}>Add New Products</span>
                    
                    {/* <span className="badge badge-success widgetStatusMenu">
                        active
                    </span> */}
                    <div className="inner innerWidget"  
                        //onClick={this.openDialog.bind(this, item)}
                    >
                        <Link className="btn btn-info btn-sm" 
                            onClick={this.openAddProduct.bind(this, position, undefined)}
                        >
                            <i className="fas fa-plus"></i>
                            Add
                        </Link>
                        
                    </div>
                </li>
            )
        }
    }

    render(){

        const { sliderList, attribList, showMobileBannerModal, sliderEditMode, attribEditMode, showAddEditTilesModal, 
            clickedTileItemIndex, isEditModeON, showAddEditProductModal, prodEditMode, clickedProductItemIndex, editableItem } = this.state;
        return(
            <React.Fragment>
                {this.state.loader && <div id="loader"></div>}

                {/* {showMobileBannerModal && <MobileBannerModalComponent
                    showForm={showMobileBannerModal}
                    handleModal={this.displayAddMobileBannerModal.bind(this)}
                    attribute_list={this.props.attribute_list}
                    refresh_menus_list={this.loadSlider.bind(this)}
                    isEditModeON={sliderEditMode}
                    //editableItem={editableItem}
                    type="widget"
                    widget_id={this.props.widget_id}
                /> } */}
                {showMobileBannerModal && <SliderComponent
                    showForm={showMobileBannerModal}
                    handleModal={this.displayAddMobileBannerModal.bind(this)}
                    attribute_list={this.props.attribute_list}
                    refresh_menus_list={this.loadSlider.bind(this)}
                    isEditModeON={sliderEditMode}
                    editableItem={editableItem}
                    widget_id={this.props.widget_id}
                />
                }
                
                {showAddEditTilesModal && <AddTilesModalComponent
                        showForm={showAddEditTilesModal}
                        handleModal={this.displayAddTilesModal.bind(this)}
                        attribute_list = {this.props.attribute_list}
                        isEditModeON={attribEditMode}
                        refresh_widget_list={this.loadSlider.bind(this)}
                        clickedTileItemIndex={clickedTileItemIndex}
                        widget_id={this.props.widget_id}
                        current_widget={this.props.current_widget}
                        attribBoxs={this.state.attribList}
                        handleAttributeOnSave={this.handleAttributeOnSave.bind(this)}
                    />
                }
                {showAddEditProductModal && <AddEditProductModalComponent
                        showForm={showAddEditProductModal}
                        handleModal={this.displayAddProductModal.bind(this)}
                        attribute_list = {this.props.attribute_list}
                        isEditModeON={prodEditMode}
                        refresh_widget_list={this.loadSlider.bind(this)}
                        clickedItemIndex={clickedProductItemIndex}
                        widget_id={this.props.widget_id}
                        current_widget={this.state.current_widget}
                        handleAttributeOnSave={this.handleAttributeOnSave.bind(this)}
                        admin_product_list={this.props.admin_product_list}
                        prodBoxs={this.state.prodList}
                    />
                }
                
                <div> 
                    <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row bannerAlignment widgetsMarginTop" >
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        Widget Details
                                    </h3>
                                    <ul>

                                    <Link
                                        onClick={this.onSaveWidget.bind(this)}
                                        className="btn btn-success btn-sm rightyadmin"
                                        //href="#admin-panel/products"
                                    >
                                        <i className="fas fa-done"></i>
                                        Save
                                    </Link>
                                    <Link
                                        onClick={this.props.handleVisibility.bind(this)}
                                        className="btn btn-success btn-sm rightyadmin"
                                        //href="#admin-panel/products"
                                        style={{marginRight:"20px"}}
                                    >
                                        <i className="fas fa-done"></i>
                                        Cancel
                                    </Link>
                                    {isEditModeON && (
                                        <Link
                                            onClick={this.onDeleteWidget.bind(this)}
                                            className="btn btn-success btn-sm rightyadmin"
                                            //href="#admin-panel/products"
                                            style={{marginRight:"20px"}}
                                        >
                                            Delete This Widget
                                        </Link>
                                        )}
                                    </ul>
                                    
                                </div>
                                    <div className="card-body">
                                        <div className="row" style={{maxWidth:"767px"}}>
                                            <div className="col-md-12 bannerAlignment">
                                                <div className="row_widget_banner">
                                                    {sliderList.length>0 &&
                                                    <Carousel autoPlay={true} pause={false} interval={3000} >
                                                        {sliderList.map((item, index)=>{
                                                            return (
                                                                <Carousel.Item key={index} onClick={this.onSliderEdit.bind(this, item)}>
                                                                    <div className="bannerTextwrap">
                                                                        
                                                                    </div>
                                                                    <div className="bannerImageWrap">
                                                                        <img
                                                                            className="d-block w-100 bannerWidget"
                                                                            src={item.image}
                                                                            alt="Cake"></img>
                                                                    </div>
                                                                </Carousel.Item>
                                                            );
                                                        })}
                                                    </Carousel>
                                                    }
                                                    {sliderList.length<1 && (
                                                        <div className="bannerImageWrap">
                                                            <img
                                                                className="d-block w-100 bannerWidget"
                                                                src={require("../assets/img/admin_banner_placeholder_img.png")}
                                                                alt="Cake"></img>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-md-12 widgetsMarginTop bannerAlignment">
                                                <button className="fas fa-plus" onClick={this.addSlider.bind(this)}>
                                                    Add Slider
                                                </button>
                                            </div>
                                            <div className="col-md-12 widgetsMarginTop">
                                                <div className="ourTopCategory">
                                                    <div className="col-md-6">
                                                        <Link className="color_chng" >
                                                            <div className=""
                                                                //onClick={this.onHandleEvent.bind(this, "Birthdays")}
                                                                >
                                                                {this.getAtributeTiles(0)}
                                                                
                                                            </div>
                                                        </Link>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Link className="color_chng" >
                                                            <div className=""
                                                                //onClick={this.onHandleEvent.bind(this, "Birthdays")}
                                                                >
                                                                {this.getAtributeTiles(1)}
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12 widgetTilesColumn">
                                                <div className="ourTopCategory">
                                                    <div className="col-md-6">
                                                        <Link className="color_chng" >
                                                            <div className=""
                                                                //onClick={this.onHandleEvent.bind(this, "Birthdays")}
                                                                >
                                                                {this.getAtributeTiles(2)}
                                                            </div>
                                                        </Link>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Link className="color_chng" >
                                                            <div className=""
                                                                //onClick={this.onHandleEvent.bind(this, "Birthdays")}
                                                                >
                                                                {this.getAtributeTiles(3)}
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="widgetsMarginTop">
                                            <ul>
                                                {this.getProductView(0)}
                                            </ul>
                                            <ul>
                                                {this.getProductView(1)}        
                                            </ul>

                                            <ul>
                                                {this.getProductView(2)}        
                                            </ul>

                                            <ul>
                                                {this.getProductView(3)}        
                                            </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div> 
                
            </React.Fragment>
        );
    }

}