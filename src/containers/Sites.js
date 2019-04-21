import React, { Component } from "react";
import { Modal, Button } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSites, deleteSite, toggleModal } from "../actions/actionsCreators";
import { siteType } from '../types';
import { push } from "connected-react-router";
import SitePreview from "../components/SitePreview";
import CreateSiteForm from "../components/CreateSiteForm";
import Loader from "../components/Loader";

class Sites extends Component {
  componentDidMount() {
    this.props.getSites();
  }

  render() {
    const {
      sites,
      modalVisible,
      showModal,
      hideModal,
      sitesLoading
    } = this.props;

    if (sitesLoading) {
      return <Loader />;
    }

    return (
      <div style={{ width: "100vw" }}>
        <div style={{ margin: "20px" }}>
          <Button onClick={() => showModal()}>New site</Button>
          <Button
            type="danger"
            onClick={() => this.setState({ modalVisivle: true })}
          >
            Logout
          </Button>
        </div>
        <div
          style={{
            margin: "0 auto",
            maxWidth: 1280,
            height: "100vh",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gridGap: 15
          }}
        >
          {sites.map(site => (
            <SitePreview key={site.id} site={site} />
          ))}
          <Modal
            title="Create new Netlify site"
            visible={modalVisible}
            onOk={() => hideModal()}
            onCancel={() => hideModal()}
          >
            <CreateSiteForm />
          </Modal>
        </div>
      </div>
    );
  }
}

Sites.propTypes = {
  sites: PropTypes.arrayOf(
    PropTypes.shape(siteType)
  ),
  modalVisible: PropTypes.bool,
  sitesLoading: PropTypes.bool,
  getSites: PropTypes.func,
  showModal: PropTypes.func,
  hideModal: PropTypes.func
};

const mapStateToProps = state => ({
  sites: state.sites,
  modalVisible: state.settings.newSiteModalVisible,
  sitesLoading: state.settings.sitesLoading
});

const mapDispatchToProps = dispatch => {
  return {
    getSites: () => dispatch(getSites()),
    showModal: () => dispatch(toggleModal(true)),
    hideModal: () => dispatch(toggleModal(false))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sites);
