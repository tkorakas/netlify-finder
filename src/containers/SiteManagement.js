import React, { Component } from "react";
import { Tabs, List, Breadcrumb, Button, Icon, Spin } from "antd";
import { connect } from "react-redux";
import { hashFiles } from "../netlify/files";
import { deploySite, uploadFile } from "../netlify/api";
import { Link } from "react-router-dom";
const ipcRenderer = window.require("electron").ipcRenderer;
const glob = window.require("glob");
const fs = window.require("fs");
const TabPane = Tabs.TabPane;

import "./SiteManagement.css";

class SiteManagement extends Component {
  state = {
    uploading: false,
    selectedFolder: "",
    files: []
  };

  componentDidMount() {
    const siteId = this.props.location.pathname.split("/")[2];
    const sitePath = localStorage.getItem(siteId);
    this.setState({ siteId });
    if (sitePath) {
      this.setState({ selectedFolder: sitePath });
      glob(`${sitePath}/**/*.*`, (err, files) => {
        const formattedFiles = files
          .map(file => file.replace(sitePath, ""))
          .filter(file => file !== "");
        this.setState({ files: formattedFiles });
      });
    }

    ipcRenderer.on("file-dialog", (event, data) => {
      if (!data) return;
      const sitePath = data[0];
      localStorage.setItem(siteId, sitePath);
      this.setState({ selectedFolder: sitePath });
      glob(`${sitePath}/**/*.*`, (err, files) => {
        const formattedFiles = files
          .map(file => file.replace(sitePath, ""))
          .filter(file => file !== "");
        this.setState({ files: formattedFiles });
      });
    });
  }

  render() {
    if (!this.state.selectedFolder) {
      return (
        <div>
          <div style={{ margin: "10px" }}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">Sites</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Dance marathon</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div style={{ margin: "10px" }}>
            <Button
              style={{ marginBottom: 10 }}
              onClick={() => ipcRenderer.send("file-dialog")}
            >
              <Icon type="folder" /> Select Project Directory
            </Button>
            <p>{this.state.selectedFolder}</p>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div style={{ margin: "10px" }}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Sites</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Dance marathon</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div style={{ margin: "10px" }}>
          <Button
            style={{ marginBottom: 10 }}
            onClick={() => ipcRenderer.send("file-dialog")}
          >
            <Icon type="folder" /> Select Project Directory
          </Button>
          <p>{this.state.selectedFolder}</p>
        </div>
        <Tabs size="large" defaultActiveKey="1" style={{ width: "100vw" }}>
          <TabPane tab="Files" key="1" style={{ marginBottom: 10 }}>
            <Button
              style={{ marginBottom: 10, marginLeft: 10 }}
              onClick={() => {
                glob(`${this.state.selectedFolder}/**/*.*`, (err, files) => {
                  const formattedFiles = files
                    .map(file => file.replace(this.state.selectedFolder, ""))
                    .filter(file => file !== "");
                  this.setState({ files: formattedFiles });
                });
              }}
            >
              <Icon type="reload" />
              Refresh files
            </Button>
            <Button
              style={{ marginBottom: 10, marginLeft: 10 }}
              onClick={() => {
                const hashedFiles = hashFiles(
                  this.state.selectedFolder,
                  this.state.files
                );
                deploySite({ files: hashedFiles }, this.state.siteId)
                  .then(res => {
                    const deployId = res.data.id;
                    const requiredForUpload = res.data.required;

                    for (const [key, value] of Object.entries(hashedFiles)) {
                      if (requiredForUpload.includes(value)) {
                        fs.readFile(
                          `${this.state.selectedFolder}${key}`,
                          "utf8",
                          function(err, data) {
                            if (err) {
                              return console.log(err);
                            }
                            uploadFile(data, key, deployId)
                              .then(res => console.log(value, "uploaded"))
                              .catch(console.log);
                          }
                        );
                      }
                    }
                  })
                  .catch(console.log);
              }}
            >
              <Icon type="upload" /> Upload
            </Button>
            <Button disabled style={{ marginLeft: 10 }}>
              <Icon type="download" />
              Download Files
            </Button>
            <List
              style={{ height: "100%", minHeight: "350px" }}
              bordered
              dataSource={this.state.files}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a>
                      <Icon title="Upload this file" type="upload" />
                    </a>,
                    false ? (
                      <Spin />
                    ) : (
                      <Icon
                        title="Pending"
                        style={{ color: "orange" }}
                        type="exclamation"
                      />
                    )
                  ]}
                >
                  <List.Item.Meta title={item} />
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="Form" key="2">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Submissions" key="3">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Hooks" key="4">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Snippets" key="5">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Metadata" key="6">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Deploys" key="7">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Account" key="8">
            Content of Tab Pane 1
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => ({
  selectedFolder: settings.selectedPath
});

const mapDispatchToProps = dispatch => ({});

// export default connect(mapStateToProps)(SiteManagement);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteManagement);
