import React from "react";
import { Card, Button, Popconfirm } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { siteType } from '../types';
import { deleteSite } from "../actions/actionsCreators";
const { Meta } = Card;

const SitePreview = ({ site, deleteSite }) => (
  <div>
    <Card
      hoverable
      style={{ width: 400 }}
      cover={<img alt={site.name} src={site.screenshot_url} />}
    >
      <Meta title={site.name} />
      <div style={{ marginTop: 10 }}>
        <Link to={`/site/${site.id}`}>
          <Button style={{ marginRight: 10 }}>Edit</Button>
        </Link>
        <Popconfirm
          title="Are you sure you want to delete this site?"
          onConfirm={() => {
            deleteSite(site.id);
          }}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">Delete</Button>
        </Popconfirm>
      </div>
    </Card>
  </div>
);

SitePreview.propTypes = {
  site: PropTypes.shape(siteType),
  deleteSite: PropTypes.func,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  deleteSite: id => dispatch(deleteSite(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SitePreview);
