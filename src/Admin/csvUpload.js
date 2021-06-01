import React, { Component } from "react";
import { Helper, Url, Global, Api } from "../config";
import { AdminHeader, SideBar, AdminFooter } from "../Admincomponent";
import { Link, NavLink } from "react-router-dom";
import swal from "sweetalert2";

class CsvUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin_user_name: "",
      file: "",
      loader: false,
    };
  }
  admin_assign_common_variables = () => {
    this.setState({
      admin_user_name: window.localStorage.getItem("ADMIN_LOGGED_USER"),
    });
  };
  componentDidMount = () => {
    this.admin_assign_common_variables();
    Helper.project_script_css_manager("admin");
  };

  submit = () => {
    let local_file = this.state.file;
    const formData = new FormData();
    formData.append("file", local_file);
    this.import_product_csv(formData);
  };

  downloadCsv = () => {
    let api = Url.admin_product_csv_fetch;
        Api
            .fetch_csv(api)
            .then(res => {
                //this.setState({loader: false})
                let data = JSON.parse(res);
                console.log(data)
                if (data.response.status) {
                    //this.setState({admin_product_attribute: data.data})
                    console.log('Response : ',data.response.data);
                    const link = document.createElement('a');
                    link.href = data.response.data;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    this.toast('Downloaded Successfully')
                }else {
                  this.toast('Downloaded Failed!')
                }
                
            });
   
  };

  onChange(e) {
    this.setState({ file: e.target.files[0] });
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
  import_product_csv = (formData) => {
    let api = Url.admin_import_product;
    this.setState({ loader: true });
    Api.admin_import_product(api, formData).then((res) => {
      this.setState({ loader: false });
      let data = JSON.parse(res);
      if (data.code == "200") {
        this.setState({file:""});
        this.toast(data.message);
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="hold-transition sidebar-mini layout-fixed">
          <div className="wrapper">
            <AdminHeader history={this.props.history} />
            <SideBar
              history={this.props.history}
              headerTitle="csvupload"
              admin_user_name={this.state.admin_user_name}
            />
            <div className="content-wrapper">
              <section className="content-header">
                <div className="container-fluid">
                  <div className="row mb-2"></div>
                </div>
              </section>
              <section className="content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <div className="card">
                        <div className="card-header">
                          <h3 className="card-title">Upload Product CSV</h3>
                        </div>
                        <div className="card-body">
                          <input
                            type="file"
                            onChange={this.onChange.bind(this)}
                          />
                          <Link
                            onClick={this.submit.bind(this)}
                            className="btn btn-primary btn-sm"
                            to="#"
                          >
                            <i class="fas fa-folder"></i> Upload Csv
                          </Link>
                          <span className="downlodcsv" style={{ marginLeft: '10px' }}>
                            <Link 
                              onClick={this.downloadCsv.bind(this)}
                              className="btn btn-primary btn-sm"
                              to="#"
                            >
                            <i class="fas fa-folder"></i> Download Csv
                          </Link>
                          </span>
                          
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {this.state.loader && <div id="loader"></div>}
            <AdminFooter history={this.props.history} />
            <aside className="control-sidebar control-sidebar-dark"></aside>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CsvUpload;
