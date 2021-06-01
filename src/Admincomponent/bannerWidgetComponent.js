import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom'
import {Helper, Url, Global, Api} from '../config';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from 'react-modal';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MobileBannerModalComponent, WebBannerModalComponent, MobileBannerComponent } from '.';
import InfiniteScroll from "react-infinite-scroll-component";



export default class BannerWidgetComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loader: false,
            webBannerEditMode: false,
            mobileBannerEditMode: false,
            showMobileBannerModal: false,
            showWebBannerModal: false,
            showBannerLayout: true,
            webBannerList: [],
            mobileBannerList: [],
            attribute_list: [],
            editableItem: {},

        }
    }

    componentDidMount = () => {
        this.get_banners()
        this.fetch_attribute_dropdown()
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

    get_banners = () => {
        this.setState({showForm: false, loader: true});
        
        let api = Url.admin_banners;
        Api.get_banners(api).then((res) => {
            this.setState({loader: false})
            let response = JSON.parse(res);
            let data = response.response;
            console.log("Status: ", data);
            if (data.status){
                //this.fetch_top_menu()
                this.setState({webBannerList: data.data.desktop, mobileBannerList: data.data.mobile, loader:false});
                
            }else {
                this.setState({loader:false});
            }
          });
    }

    addWebBanner = () => {

    }

    showWebBannerModal = () =>{
        this.setState({showWebBannerModal: true, showBannerLayout: false})
    }

    showMobileBannerModal = () =>{
        this.setState({showMobileBannerModal: true, showBannerLayout: false, mobileBannerEditMode: false});
    }

    displayAddWebBannerModal = () => {
        const { showWebBannerModal } = this.state;
        if(showWebBannerModal){
          this.setState({showWebBannerModal: false, showBannerLayout: true});
          this.setState({webBannerEditMode: false})
        }else {
          this.setState({showWebBannerModal: true, showBannerLayout: false});
        }
    }

    displayAddMobileBannerModal = () => {
        const { showMobileBannerModal } = this.state;
        if(showMobileBannerModal){
          this.setState({showMobileBannerModal: false, showBannerLayout: true, editableItem: {}});
        }else {
          this.setState({showMobileBannerModal: true, showBannerLayout: false});
        }
    }

    onWebBannerEdit = (e) =>{
        console.log(e);
        this.setState({webBannerEditMode: true, showWebBannerModal: true, editableItem: e, showBannerLayout: false});
        //this.setState({mobileBannerEditMode: false, showMobileBannerModal: false});
    }

    onMobileBannerEdit = (e) =>{
        console.log(e);
        this.setState({mobileBannerEditMode: true, showMobileBannerModal: true, editableItem: e, showBannerLayout: false});
        //this.setState({webBannerEditMode: false, showWebBannerModal: false});
    }

    render(){

        const { webBannerList, mobileBannerList, showWebBannerModal, showMobileBannerModal, webBannerEditMode, mobileBannerEditMode,
        editableItem, showBannerLayout } = this.state;

        return (
            <React.Fragment>

                {this.state.loader && <div id="loader"></div>}
                {showWebBannerModal && <WebBannerModalComponent
                    showForm={showWebBannerModal}
                    handleModal={this.displayAddWebBannerModal.bind(this)}
                    attribute_list={this.state.attribute_list}
                    refresh_menus_list={this.get_banners.bind(this)}
                    isEditModeON={webBannerEditMode}
                    editableItem={editableItem}
                />
                }
                {/* {showMobileBannerModal && <MobileBannerModalComponent
                    showForm={showMobileBannerModal}
                    handleModal={this.displayAddMobileBannerModal.bind(this)}
                    attribute_list={this.state.attribute_list}
                    refresh_menus_list={this.get_banners.bind(this)}
                    isEditModeON={mobileBannerEditMode}
                    editableItem={editableItem}
                />
                } */}

                {showMobileBannerModal && <MobileBannerComponent
                    showForm={showMobileBannerModal}
                    handleModal={this.displayAddMobileBannerModal.bind(this)}
                    attribute_list={this.state.attribute_list}
                    refresh_menus_list={this.get_banners.bind(this)}
                    isEditModeON={mobileBannerEditMode}
                    editableItem={editableItem}
                />
                }

                {showBannerLayout &&
                <div style={{maxWidth:"767px"}}>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Website Banner</h3>
                                        <ul>
                                        
                                        <Link
                                            onClick={this.showWebBannerModal.bind(this)}
                                            className="btn btn-success btn-sm rightyadmin"
                                            //href="#admin-panel/products"
                                        >
                                            <i className="fas fa-plus"></i>
                                            Add
                                        </Link>
                                        {/* {this.state.isOrderChanged && (
                                            <Link
                                            //onClick={this.displayAddMenu.bind(this)}
                                            className="btn btn-success btn-sm rightyadmin"
                                            //href="#admin-panel/products"
                                            style={{marginRight:"20px"}}
                                        >
                                            
                                            Save Changes
                                        </Link>
                                        )} */}

                                        {/* <Link
                                            onClick={this.onMobileBannerEdit.bind(this)}
                                            className="btn btn-success btn-sm rightyadmin"
                                            style={{marginRight:"20px"}}
                                        >
                                            
                                            Save Changes
                                        </Link> */}

                                        
                                        </ul>
                                        
                                    </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-12">

                                                <Carousel plugins={['arrows']}>
                                                {/* <Carousel className="widgetMobileCarousel" autoPlay={true} pause={false} interval={3000}  > */}
                                                 {this.state.webBannerList.map((item, index)=>{
                                                     return (
                                                        <Carousel.Item key={index} onClick={this.onWebBannerEdit.bind(this, item)}>
                                                            <Carousel.Caption>
                                                            <div className="bannerTextwrap carousel-caption text-left"
                                                            style={{marginLeft:"10px"}}>
                                                                <p>{item.banner_offer_title}</p>
                                                                <h2>{item.name}</h2>
                                                                <span>{item.banner_details}</span>
                                                                {/* <a href="#">Shop Now</a> */}
                                                            </div>
                                                            </Carousel.Caption>
                                                            
                                                            <div className="bannerImageWrap">
                                                                <img
                                                                    className="banImage bannerImage d-block w-100 h-100"
                                                                    style={{maxWidth:"100%", maxHeight:"100%"}}
                                                                    src={item.image}
                                                                    alt="Cake"></img>
                                                            </div>
                                                        </Carousel.Item>
                                                     )
                                                 })}
                                                </Carousel>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Mobile Banner</h3>
                                        <ul>
                                        
                                        <Link
                                            onClick={this.showMobileBannerModal.bind(this)}
                                            className="btn btn-success btn-sm rightyadmin"
                                            //href="#admin-panel/products"
                                        >
                                            <i className="fas fa-plus"></i>
                                            Add
                                        </Link>
                                        {/* {this.state.isOrderChanged && (
                                            <Link
                                            //onClick={this.displayAddMenu.bind(this)}
                                            className="btn btn-success btn-sm rightyadmin"
                                            //href="#admin-panel/products"
                                            style={{marginRight:"20px"}}
                                        >
                                            
                                            Save Changes
                                        </Link>
                                        )} */}

                                        
                                        </ul>
                                        
                                    </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-12">
                                                
                                                <Carousel autoPlay={true} pause={false} interval={3000} >
                                                {mobileBannerList.map((item, index)=>{
                                                     
                                                    return (<Carousel.Item key={index} onClick={this.onMobileBannerEdit.bind(this, item)}>
                                                        <div className="bannerTextwrap">
                                                            
                                                        </div>
                                                        <div className="bannerImageWrap">
                                                            <img
                                                                className="d-block w-100"
                                                                src={item.image}
                                                                alt="Cake"></img>
                                                        </div>
                                                    </Carousel.Item>)
                            
                                                })
                                                }

                                                </Carousel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </section>
                </div>
                }
            </React.Fragment>
        );
    }

}