// @flow

import React, { useCallback } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";

import { FormActions } from "Store/actions/formActions";
import s from "./NewEmployeeForm.module.css";

const formRules = [
  { required: true, message: "Please input new employee name!" },
];

export default () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = useCallback(({ name }) => {
    dispatch(
      FormActions.addNewItem({
        name,
        timestamp: new Date(),
        id: Math.random(),
      })
    );

    form.resetFields();
  }, []);

  return (
    <div className={s.container}>
      <Form
        form={form}
        name="newEmployee"
        layout="vertical"
        size="large"
        onFinish={onFinish}
      >
        <Form.Item label="New employee" name="name" rules={formRules}>
          <Input placeholder="Input employee name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
