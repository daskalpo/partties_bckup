import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom'
import {Helper, Url, Global, Api} from '../config';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from 'react-modal';
import Carousel from 'react-bootstrap/Carousel';
import { AddEditTileComponent } from '../Admin';
import swal from "sweetalert2";

const reorder = (list, startIndex, endIndex) => {
    console.log("Start Index: "+{startIndex}+"  End Index: "+{endIndex})
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
  
  const grid = 8;
  
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });
  
  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "white" : "white",
    padding: grid,
    width: 600
  });

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      //marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      height                : '300px',
      width                 : '30%',
    }
  };

  const croppedImage = null

export default class TileWidgetComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loader: false,
            menuList: [],
            attribute_list: [],
            widget_list: [],
            admin_product_list: [],
            isOrderChanged: false,
            showForm: false,
            showWidgetList: true,
            showAddWidgetComponent: false,
            selectedStatus: 0,
            widgetName: "",
            editModeOn: false,
            widget_id: 0,
            current_widget: {},
            clickedTileItemIndex:0,

        }
        this.onDragEnd = this.onDragEnd.bind(this);
    }


    componentDidMount = () => {

        //this.fetch_top_menu();
        this.fetch_attribute_dropdown();
        this.fetch_widget_list();
        this.fetch_product_list();
    }

    fetch_top_menu = () => {

        this.setState({loader: true, isOrderChanged: false})
        //https://www.partties.com/api/public/index.php/api/v1/admin/menus
        let api = Url.admin_top_menu_list;
        Api.fetch_admin_top_menus(api).then((res) => {
            this.setState({loader: false})
            let response = JSON.parse(res);
            let data = response.response;
            if (data.status){
                this.setState({menuList: data.data});
                console.log("MenusList", this.state.menuList);
            }
          });
    };

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

    fetch_widget_list = () => {
        let api = Url.admin_widget_list;
        Api.fetch_widget_list(api).then((res) => {
            let data = JSON.parse(res);
            let response = data.response;
            console.log(response);
            if (response.status == "OK") {
              response.data.map((widget) => {
                // let single_attribute_object = {
                //   id: attribute.id,
                //   name: attribute.name,
                //   isChecked: false,
                // };
                // local_attribute.push(single_attribute_object);
                console.log(widget);
              });
              this.setState({ widget_list: response.data });
            }
          });
    }

    fetch_product_list = () => {
        const {showAddWidgetComponent} = this.state;
        this.setState({loader: true})
        let api = Url.admin_product_lists_list;
        Api
            .fetch_product_lists_list(api)
            .then(res => {
                this.setState({loader: false})
                let data = JSON.parse(res);
                let response = data;
                if (response.status == "OK") {
                    console.log('Catch Admin : ', response.data)
                    // data.data.map(prod=> {
                    //     prod.image.map(img=> {
                            
                    //     })
                    // })
                    this.setState({admin_product_list: response.data})
                    
                }
            });
    }


    onDragEnd(result) {
        // dropped outside the list
        console.log("--------Dragging---------")
        if (!result.destination) {
          return;
        }

        let list = this.state.menuList
        const items = reorder(
            this.state.widget_list,
          result.source.index,
          result.destination.index
        );
    
        this.setState({
          widget_list: items,
          isOrderChanged: true
        });
    };

    handleClick = (provided, snapshot) => {
        console.log(provided);
        console.log(snapshot);
    };

    handleCropImage = (image) => {
        console.log(image);
        //this.setState({selectedImage: image});
        croppedImage = image;
    };

    checkStatus = (e) => {

        console.log(e);
          if (e == 0){
              return "inactive";
          }else {
              return "active";
          }
    };


    onNameChange = (name) => {
        console.log("Name changed: "+name.target.value);
        this.setState({widgetName: name.target.value});
    }

    openDialog = (e) => {
        console.log(e);
        this.setState({showForm: false, editModeOn: true, widget_id: e.id, current_widget: e, 
            showWidgetList: false, showAddWidgetComponent: true});
    };

    showAddWidget = () => {
        this.setState({showForm: true, editModeOn: false, showWidgetList: false})
    }

    handleSwitch = () =>{
        console.log("---------switching view-------")
        this.fetch_widget_list();
        this.setState({editModeOn: false, widget_id: 0, current_widget: {}, showWidgetList: true, showAddWidgetComponent: false});
    }

    showForm = () => {
        const { widgetName, showForm } = this.state;
        return (
            <Modal
                isOpen={showForm}
                style={customStyles}>
                <ul>
                    <li>
                        <p>Create New Widget</p>
                    </li>
                </ul>
                <ul>
                <label>Enter Widget Title : 
                    <input name="widget_title" type="text" 
                        value={widgetName} onChange={this.onNameChange.bind(this)}
                    />
                </label>
                </ul>
                <ul style={{display:'inline'}}>
                    <button 
                        type="button"
                        onClick={this.onSave.bind(this)}
                    >
                        Save
                    </button>
                    <button type="button" onClick={() => this.setState({showForm: false, showWidgetList: true, showAddWidgetComponent: false})}>Cancel</button>
                </ul>
            </Modal>
        )
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
        const { widgetName } = this.state;
        console.log(widgetName);
        if (widgetName.length<1){
            alert('Enter a widget name please.');
        }else {
            this.setState({showForm: false})
            //this.props.history.push("widgets/add-edit-widget");
            // api call
            let api =  Url.admin_add_widget;
            Api.admin_add_widget(api, widgetName).then((res) => {
            let response = JSON.parse(res);
            let data = response;
            this.setState({widgetName: ""});
                if (data.status == "OK"){
                    //this.props.refresh_menus_list();
                    this.toast(data.message);
                    this.fetch_widget_list();
                    this.setState({widget_id: data.data.id, widgetName:data.data.name, showAddWidgetComponent: true})
                }
            });
        }
    }

    widgetOrderSave = () => {
        let request = [];
        this.state.widget_list.map((widget, index)=> {
            let order_id = index+1;
            request.push({
                "widget_id": widget.id,
                "order_id": order_id,
            });
        });
        console.log("OrderRequest: ", request);
        let body = {
            "neworder": request,
        }
        let api =  Url.admin_widget_ordering;
      Api.admin_widget_order_save(api, body).then((res) => {
          let response = JSON.parse(res);
          let data = response;
          if (data.status == "OK"){
            //this.props.refresh_menus_list();
          }

        });
    }

    render(){

        const { showAddWidgetComponent, editModeOn, attribute_list, menuList, widget_id, current_widget, showWidgetList } = this.state;

        return(
            <React.Fragment>

                {this.state.loader && <div id="loader"></div>}

                <div>

                {this.state.showForm ? this.showForm() : null}

                {showAddWidgetComponent && <AddEditTileComponent
                    attribute_list={attribute_list}
                    menuList={menuList}
                    widget_id={widget_id}
                    current_widget={current_widget}
                    editModeOn={editModeOn}
                    handleVisibility={this.handleSwitch.bind(this)}
                    refresh_widget_list= {this.fetch_widget_list.bind(this)}
                    admin_product_list={this.state.admin_product_list}
                />}

                {showWidgetList && 
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
                                                <h3 className="card-title">Widget List</h3>
                                                <ul>
                                                
                                                <Link
                                                    onClick={this.showAddWidget.bind(this)}
                                                    className="btn btn-success btn-sm rightyadmin"
                                                    //href="#admin-panel/products"
                                                >
                                                    <i className="fas fa-plus"></i>
                                                    Add Widget
                                                </Link>
                                                {this.state.isOrderChanged && (
                                                    <Link
                                                    onClick={this.widgetOrderSave.bind(this)}
                                                    className="btn btn-success btn-sm rightyadmin"
                                                    //href="#admin-panel/products"
                                                    style={{marginRight:"20px"}}
                                                >
                                                    Save Order Changes
                                                </Link>
                                                )}
                                                
                                                </ul>
                                                
                                            </div>
                                                <div className="card-body">
                                                    <DragDropContext onDragEnd={this.onDragEnd}>
                                                        <Droppable droppableId="droppable">
                                                        {(provided, snapshot) => (
                                                            <div
                                                            {...provided.droppableProps}
                                                            ref={provided.innerRef}
                                                            style={getListStyle(snapshot.isDraggingOver)}
                                                            >
                                                            {this.state.widget_list.map((item, index) => (
                                                                //console.log(item)
                                                                <Draggable 
                                                                    key={"key-"+item.id} draggableId={"key-"+item.id} index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style
                                                                        )}
                                                                        onClick={this.handleClick.bind(this, provided, snapshot)}
                                                                        >
                                                                        {/* //{item.content} */}

                                                                        <ul>
                                                                            <li style={{display:"inline"}}>
                                                                                {/* //<div className="widget_circular_image_admin_menu">
                                                                                //    <img src={item.image}/>
                                                                                //</div> */}
                                                                                <span style={{marginLeft:"20px"}}>{item.name}</span>
                                                                                
                                                                                <span className="badge badge-success"
                                                                                    style={{right:"100px", position:"absolute"}}
                                                                                >
                                                                                    {this.checkStatus(item.status)}
                                                                                </span>
                                                                                <div className="inner"  
                                                                                    onClick={this.openDialog.bind(this, item)}
                                                                                    style={{right:"10px", position:"absolute", marginTop:"-7px"}}
                                                                                    >
                                                                                    <Link className="btn btn-info btn-sm" >
                                                                                        <i className="fas fa-pencil-alt"></i>Edit
                                                                                    </Link>
                                                                                    {/* //onClick={() => this.setState({showForm: true})} */}
                                                                                </div>

                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                                </Draggable>
                                                            ))}
                                                            {provided.placeholder}
                                                            </div>
                                                        )}
                                                        </Droppable>
                                                    </DragDropContext>


                                                </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                }
                </div>
            </React.Fragment>
        );
    }

}