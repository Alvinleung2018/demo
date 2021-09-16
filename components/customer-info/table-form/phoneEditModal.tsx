import React from "react";
import {Modal, Input, Form, Select} from "antd";
import {areaCodeList, isDefaultList} from "../../../data/select-data";
import handler from "../../../pages/api/hello";

const {Item} = Form
const {Option} = Select

const PhoneEditModal = ({children, visible, title, handleCancel, onOk, mode}) => {

    const [form] = Form.useForm()

    function handlerOk() {
        const value = form.getFieldsValue()
        onOk(value)
    }

    let Comp = null;

    switch (mode) {
        case 'phone':
            Comp = (
                <>
                    <Item label="区号" name="areaCode">
                        <Select>
                            {
                                areaCodeList.map((item: any) => {
                                    return <Option key={item.id} value={item.value}>{item.value}</Option>
                                })
                            }
                        </Select>
                    </Item>
                    <Item label="手机号" name="phoneNumber">
                        <Input />
                    </Item>
                    <Item label="默认" name="isDefault">
                        <Select>
                            {
                                isDefaultList.map((item: any) => {
                                    return <Option key={item.id} value={item.value}>{item.value}</Option>
                                })
                            }
                        </Select>
                    </Item>
                </>
            )
            break;
        case 'email':
            Comp = (
                <>
                    <Item label="邮箱" name="email">
                        <Input />
                    </Item>
                    <Item label="默认" name="emailIsDefault">
                        <Input />
                    </Item>
                </>
            )
            break;
        default:
            Comp = null
    }

    return (
        <>
            <Modal visible={visible} onCancel={handleCancel} onOk={handlerOk} title={title}>
                <Form form={form}>
                    {Comp}
                </Form>
            </Modal>
            {children}
        </>
    )
}

export default PhoneEditModal
