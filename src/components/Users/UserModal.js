import styles from './UserModal.css';
import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class UserEditModal extends Component {
  constructor(props) {
    super(props);
    this.showModalHandler = this.showModalHandler.bind(this);
    this.hideModalHandler = this.hideModalHandler.bind(this);
    this.okHandler = this.okHandler.bind(this);
    this.state = {
      visible: false,
    };
  }
  showModalHandler(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      visible: true,
    });
  }
  hideModalHandler() {
    this.setState({
      visible: false,
    });
  }
  okHandler() {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModalHandler();
        this.props.form.resetFields();
      }
    });
  }
  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name, email, website } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModalHandler} >
          { children }
        </span>
        <Modal
          title="Edit User"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModalHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="Name">
              {
                getFieldDecorator('name', {
                  initialValue: name,
                })(<Input />)
            }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Email"
            >
              {
                getFieldDecorator('email', {
                  initialValue: email,
                })(<Input />)
            }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="WebSite"
            >
              {
                getFieldDecorator('website', {
                  initialValue: website,
                })(<Input />)
            }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }

}
export default Form.create()(UserEditModal);
