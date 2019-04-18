import React from 'react';
import { Button, Form, Input, Checkbox, Divider } from 'antd';
import { connect } from 'react-redux';
import { createSite } from '../actions/actionsCreators'

const CreateSiteForm = ({ form: { getFieldDecorator, validateFields, resetFields }, createSite }) => {
  return (
    <Form onSubmit={(e) => {
      e.preventDefault();
      validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }

        createSite(fieldsValue);
        resetFields();
      });
    }}>
      <Form.Item label="Name">
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Please enter site name!', whitespace: true }],
        })(
          <Input />
        )}
      </Form.Item>
      <Form.Item>
        <Divider orientation="left">CSS</Divider>
        {getFieldDecorator('css-bundle', {
          valuePropName: 'checked',
          initialValue: true
        })(
          <Checkbox>Bundle</Checkbox>
        )}
        {getFieldDecorator('css-minify', {
          valuePropName: 'checked',
          initialValue: true
        })(
          <Checkbox>Minify</Checkbox>
        )}
        <Divider orientation="left">JavaScript</Divider>
        {getFieldDecorator('js-bundle', {
          valuePropName: 'checked',
          initialValue: true
        })(
          <Checkbox>Bundle</Checkbox>
        )}
        {getFieldDecorator('js-minify', {
          valuePropName: 'checked',
          initialValue: true
        })(
          <Checkbox>Minify</Checkbox>
        )}
        <Divider orientation="left">HTML</Divider>
        {getFieldDecorator('pretty', {
          valuePropName: 'checked',
          initialValue: true
        })(
          <Checkbox>Pretty URLs</Checkbox>
        )}
        {getFieldDecorator('canonical', {
          valuePropName: 'checked',
          initialValue: true
        })(
          <Checkbox>Canonical URls</Checkbox>
        )}
        <Divider orientation="left">Images</Divider>
        {getFieldDecorator('image', {
          valuePropName: 'checked',
          initialValue: true
        })(
          <Checkbox>Optimize</Checkbox>
        )}
      </Form.Item>
      <Button type="primary" htmlType="submit">Create site</Button>
    </Form>
  );
};

const WrappedCreateSiteFormForm = Form.create({ name: 'new-site' })(CreateSiteForm);

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  createSite: values => dispatch(createSite(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedCreateSiteFormForm);
