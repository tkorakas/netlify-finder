import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
import { getSites, deleteSite, toggleModal } from '../actions/actionsCreators'
import { push } from 'connected-react-router';
import { createSite as createSiteRequest } from '../netlify/api';
import SitePreview from '../components/SitePreview';
import CreateSiteForm from '../components/CreateSiteForm';
import Loader from '../components/Loader';

class Sites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisivle: false,
      loading: false
    }
  }

  componentDidMount() {
    this.props.getSites();
  }

  handleSubmit = (fieldsValue) => {
    const { name, ...rest } = fieldsValue;
    const payload = {
      name,
      processing_settings: {
        css: { bundle: rest['css-bundle'], minify: rest['css-minify'] },
        js: { bundle: rest['js-bundle'], minify: rest['js-minify'] },
        html: {
          pretty_urls: rest['pretty'], canonical_urls: rest['canonical']
        },
        images: { optimize: rest['image'] }
      }
    };
    createSiteRequest(payload)
      .then(res => console.log(res))
      .catch(console.log);
  }

  render() {
    const { sites, modalVisivle, showModal, hideModal } = this.props;
    console.log(sites);
    const { loading } = this.state;
    if (loading) {
      return (<Loader />)
    }
    return (
      <div>
        <div style={{ margin: '20px' }}>
          <Button onClick={() => showModal()}>New site</Button>
          <Button type="danger" onClick={() => this.setState({ modalVisivle: true })}>Logout</Button>

        </div>
        <div style={{ width: '100vw', height: '100vh', display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gridGap: 15, justifyContent: 'center', justifyItems: 'center' }}>
          {sites.map(site => <SitePreview key={site.id} site={site} />)}
          <Modal
            title="Create new Netlify site"
            visible={modalVisivle}
            onOk={() => hideModal()}
            onCancel={() => hideModal()}
          >
            <CreateSiteForm handleSubmit={this.handleSubmit} />
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sites: state.sites,
  modalVisivle: state.settings.newSiteModalVisible
});

const mapDispatchToProps = dispatch => {
  return {
    getSites: () => dispatch(getSites()),
    deleteSite: id => dispatch(deleteSite(id)),
    showModal: () => dispatch(toggleModal(true)),
    hideModal: () => dispatch(toggleModal(false))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sites);
