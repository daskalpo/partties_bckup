import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom'
import {Helper, Url, Global, Api} from '../config';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from 'react-modal';
import { AddMenuComponent, MenuPicker } from '../Admincomponent';


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
      height                : '500px',
      width                 : '50%',
    }
  };
  const croppedImage = null


export default class TopMenuComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            menuList: [],
            loader: false,
            showForm: false,
            showAddForm: false,
            showTopMenuLayout: true,
            attributeStatus: ["active", "Inactive"],
            selectedStatus: "inactive",
            currentItem: {},
            attribute_list: [],
            isOrderChanged: false,
            selectedAttributeIndex: 0,
        }
        this.onDragEnd = this.onDragEnd.bind(this);

    }


    componentDidMount = () => {
        this.fetch_top_menu()
        this.fetch_attribute_dropdown()
        console.log("Top Menu"+this.props.menulist)
    }

    fetch_top_menu = () => {

        this.setState({loader: true, isOrderChanged: false})
        //https://www.partties.com/api/public/index.php/api/v1/admin/menus
        const { showTopMenuLayout, showForm, showAddForm } = this.state;
        let api = Url.admin_top_menu_list;
        Api.fetch_admin_top_menus(api).then((res) => {
            this.setState({loader: false})
            let response = JSON.parse(res);
            let data = response.response;
            if (data.status){
                this.setState({menuList: data.data});
                console.log("MenusList", this.state.menuList);
                if (showTopMenuLayout){
                    
                }else {
                    this.setState({showTopMenuLayout: true});
                    if (showForm){
                        this.setState({showForm: false});
                    }
                    if (showAddForm){
                        this.setState({showAddForm: false});
                    }
                }
            }
          });
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

    onDragEnd(result) {
        // dropped outside the list
        console.log("--------Dragging---------")
        if (!result.destination) {
          return;
        }

        let list = this.state.menuList
        const items = reorder(
            this.state.menuList,
          result.source.index,
          result.destination.index
        );
    
        this.setState({
          menuList: items,
          isOrderChanged: true
        });
    }

    handleClick = (provided, snapshot) => {
        console.log(provided);
        console.log(snapshot);
    }

    openDialog = (e) => {
        console.log(e);
        this.state.attribute_list.map((attribute, index)=> {
            if (attribute.id == e.attribute_id){
              this.setState({selectedAttributeIndex: index});
            }
        })
        this.setState({currentItem: e});
        this.setState({showForm: true, showAddForm: false, showTopMenuLayout: false});
    }

    handleStatusChange = (e) => {
        console.log("Before "+JSON.stringify(this.state.currentItem));
        this.setState({selectedStatus: e.target.value});
        const {currentItem} = this.state;
        let item = currentItem;
        if(e.target.value == "active"){
            item.status = 1;
            item.attribuite.status = 1;
        }else {
            item.status = 0;
            item.attribuite.status = 0;
        }
        this.setState({currentItem: item});
        console.log("After"+JSON.stringify(this.state.currentItem));
    }
    
    handleCropImage = (image) => {
        console.log(image);
        //this.setState({selectedImage: image});
        croppedImage = image;
    }

    onNameChange = (name) => {
        console.log("Name changed: "+name.target.value);
        let item = this.state.currentItem;
        item.name = name.target.value;
        item.attribuite.name = name.target.value;
        this.setState({currentItem: item});
    }

    onSave = () => {
        const { currentItem, selectedAttributeIndex } = this.state;
        let body = {};
        var formdata = new FormData();
        if (currentItem.name.length<1){
            alert('Please enter a menu name.');
            return false;
        }
        if (currentItem.name.length>12){
            alert('Name should be within 12 character.');
            return false;
        }else {    
            if (croppedImage == null || croppedImage == undefined){
                // body = JSON.stringify({
                //     name: currentItem.name,
                //     attribute_id: currentItem.attribute_id,
                //     status: currentItem.status,
                // });
                formdata.append("name", currentItem.name);
                formdata.append("attribute_id", this.state.attribute_list[selectedAttributeIndex].id);
                formdata.append("status", currentItem.status);
            }else {
                formdata.append("name", currentItem.name);
                formdata.append("attribute_id", this.state.attribute_list[selectedAttributeIndex].id);
                formdata.append("status", currentItem.status);
                formdata.append("image", croppedImage);
            }

            let api = Url.admin_top_menu_list_edit+currentItem.id;
            Api.edit_admin_top_menus(api, formdata).then((res) => {
                this.setState({loader: false})
                let response = JSON.parse(res);
                let data = response;
                if (data.status == "OK"){
                    this.fetch_top_menu()
                }
            });
        }
    }

    handleAttributeChange = (e) => {
        console.log(this.state.attribute_list[e.target.value].id);
        this.setState({selectedAttributeIndex: e.target.value});
        //alert(this.state.attribute_list[e.target.value]);
        //this.setState({currentAttribute: this.props.attribute_list[e.target.value]});
    }

    showForm = () => {
        const {currentItem, selectedStatus, selectedAttributeIndex} = this.state;

        if(currentItem.status==1){
            this.handleStatusChange.bind(this, "active");
        }else {
            this.handleStatusChange.bind(this, "inactive");
        }
        return (
            <Modal 
                isOpen={this.state.showForm}
                style={customStyles}>
                <div style={{alignContent:'center'}}> 
                    <form id= "add-app">
            
                        <ul>
                            <label>Attribute Name : 
                            <input name="attribute" type="text" value={currentItem.name} onChange={this.onNameChange.bind(this)}/>
                            </label>
                        </ul>

                        <ul>
                            <label> Status :
                                <div>
                                {/* <i className="fas fa-sort-down"></i> */}
                                      <select
                                        className="menuStatusSelect"
                                        onChange={this.handleStatusChange.bind(
                                          this
                                        )}
                                        value={this.state.selectedStatus}
                                        >
                                        {this.state.attributeStatus.map(
                                          (stateAttribute, index) => (
                                            <option 
                                              key={index} 
                                              value={stateAttribute}>
                                              {stateAttribute}
                                            </option>
                                          )
                                        )}
                                      </select>
                                </div>
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
                                        {this.state.attribute_list.map(
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
                            <button type="button" onClick={() => this.setState({showForm: false, showTopMenuLayout: true})}>Cancel</button>
                        </ul>
                    </form>
                </div>
           </Modal>
          );
      }


      displayAddMenu = () => {
          const { showAddForm } = this.state;
          if(showAddForm){
            this.setState({showForm: false, showAddForm: false, showTopMenuLayout: true});
          }else {
            this.setState({showForm: false, showAddForm: true, showTopMenuLayout: false});
          }
      }


      checkStatus = (e) => {

        console.log(e);
          if (e == 0){
              return "inactive";
          }else {
              return "active";
          }
      }

      menuOrderSave = (e) => {
        console.log(e);
        const {menuList} = this.state
        let tempList = [];

        menuList.map((item, index) => {
            let order_id = index + 1;
            let menu = {
                "menu_id": item.id,
                "order_id": order_id
            };
            tempList.push(menu);
        });

        let body = {
            "neworder": tempList
        }
        console.log("Request wil be:", JSON.stringify(body));  
        
        let api = Url.admin_top_menu_list_order_changes;
        Api.save_top_menu_order_changes(api, body).then((res) => {
            //this.setState({loader: false})
            let response = JSON.parse(res);
            let data = response;
            if (data.status == "OK"){
                this.fetch_top_menu()
            }
          });
      }

    render(){
        const { currentItem, selectedStatus, showTopMenuLayout } = this.state;
        

        return(

            <React.Fragment>

                {this.state.loader && <div id="loader"></div>}
                {this.state.showForm && this.showForm()}

                {this.state.showAddForm && 
                    <AddMenuComponent
                        showForm={this.state.showAddForm}
                        handleModal={this.displayAddMenu.bind(this)}
                        attribute_list={this.state.attribute_list}
                        refresh_menus_list={this.fetch_top_menu.bind(this)}
                    />}

                {showTopMenuLayout && 
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
                                            <h3 className="card-title">Menu List</h3>
                                            <ul>
                                            
                                            <Link
                                                onClick={this.displayAddMenu.bind(this)}
                                                className="btn btn-success btn-sm rightyadmin"
                                                //href="#admin-panel/products"
                                            >
                                                <i className="fas fa-plus"></i>
                                                Add
                                            </Link>
                                            {this.state.isOrderChanged && (
                                                <Link
                                                onClick={this.menuOrderSave.bind(this)}
                                                className="btn btn-success btn-sm rightyadmin"
                                                //href="#admin-panel/products"
                                                style={{marginRight:"20px"}}
                                            >
                                                {/* <i className="fas fa-plus"></i> */}
                                                Save Changes
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
                                                        {this.state.menuList.map((item, index) => (
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
                                                                    {/* {item.content} */}

                                                                    <ul>
                                                                        <li style={{display:"inline"}}>
                                                                            <div className="widget_circular_image_admin_menu">
                                                                                <img src={item.image}/>
                                                                            </div>
                                                                            <span style={{marginLeft:"20px"}}>{item.name}</span>
                                                                            
                                                                            <span className="badge badge-success widgetStatusMenu">
                                                                                {this.checkStatus(item.status)}
                                                                            </span>
                                                                            <div className="inner innerWidget"  onClick={this.openDialog.bind(this, item)}>
                                                                                <Link className="btn btn-info btn-sm" >
                                                                                    <i className="fas fa-pencil-alt"></i>Edit
                                                                                </Link>
                                                                                {/* onClick={() => this.setState({showForm: true})} */}
                                                                            </div>

                                                                            {/* {this.state.showForm ? this.showForm() : null} */}
                                                                            
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
            </React.Fragment>
                
        );
    }

}