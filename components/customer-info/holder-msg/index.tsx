import React from "react";
import {Form, Input, Select, Row, Col, DatePicker} from "antd";
import {identityType, marriageType} from "../../../data/select-data";


const {Item} = Form
const {Option} = Select



const HolderMsg = (props: any) => {

    const {form} = props

    return (
        <Form form={form} layout="vertical" >
            <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                    <Item  label="人员/实体类型"
                           name="peopleType"
                           rules={[
                               {
                                   required: true,
                                   message: '请选择人员类型'
                               }
                           ]}
                    >
                        <Select>
                            {
                                identityType.map((item: any) => {
                                    return <Option key={item.id} value={item.value}>{item.value}</Option>
                                })
                            }
                        </Select>
                    </Item>
                </Col>
                <Col lg={6} md={12} sm={24}>
                    <Item  label="姓名（中文）"
                           name="chineseName"
                           rules={[
                               {
                                   required: true,
                                   message: '请输入姓名'
                               }
                           ]}
                    >
                       <Input style={{ width: '100%' }}
                              placeholder="请输入姓名"
                       />
                    </Item>
                </Col>
                <Col lg={6} md={12} sm={24}>
                    <Item  label="QQ"
                           name="qq"
                    >
                        <Input style={{ width: '100%' }}
                               placeholder="请输入QQ号码"
                        />
                    </Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                    <Item label="证件有效期开始日期" name="idCardStartDate">
                        <DatePicker style={{ width: '100%' }} />
                    </Item>
                </Col>
                <Col lg={6} md={12} sm={24}>
                    <Item label="证件有效期结束日期" name="idCardEndDate">
                        <DatePicker style={{ width: '100%' }} />
                    </Item>
                </Col>
                <Col lg={6} md={12} sm={24}>
                    <Item  label="婚姻状况"
                           name="marriage"
                    >
                        <Select>
                            {
                                marriageType.map((item: any) => {
                                    return <Option key={item.id} value={item.value}>{item.value}</Option>
                                })
                            }
                        </Select>
                    </Item>
                </Col>
            </Row>
        </Form>
    )
}

export default HolderMsg