import React from "react";
import {Col, DatePicker, Form, Input, Row, Select} from "antd";
import {riskDisclosure, riskLevel} from "../../../data/select-data";

const {Item} = Form
const {Option} = Select

const OtherMsg = (props: any) => {

    const {form} = props

    return (
        <Form form={form} layout="vertical" >
            <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                    <Item  label="是否已风险披露"
                           name="riskDisclosure"
                           rules={[
                               {
                                   required: true,
                                   message: '请选择风险披露'
                               }
                           ]}
                    >
                        <Select>
                            {
                                riskDisclosure.map((item: any) => {
                                    return <Option key={item.id} value={item.value}>{item.value}</Option>
                                })
                            }
                        </Select>
                    </Item>
                </Col>
                <Col lg={6} md={12} sm={24}>
                    <Item  label="见证人"
                           name="witness"
                           rules={[
                               {
                                   required: true,
                                   message: '请输入见证人姓名'
                               }
                           ]}
                    >
                        <Input style={{ width: '100%' }}
                               placeholder="请输入见证人姓名"
                        />
                    </Item>
                </Col>
                <Col lg={6} md={12} sm={24}>
                    <Item  label="证件地址"
                           name="address"
                    >
                        <Input style={{ width: '100%' }}
                               placeholder="请输入证件地址"
                        />
                    </Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                    <Item label="开户日期" name="openAccountDate">
                        <DatePicker style={{ width: '100%' }} />
                    </Item>
                </Col>
                <Col lg={6} md={12} sm={24}>
                    <Item label="销户日期" name="closeAccountDate">
                        <DatePicker style={{ width: '100%' }} />
                    </Item>
                </Col>
                <Col lg={6} md={12} sm={24}>
                    <Item  label="客户风险等级"
                           name="riskLevel"
                    >
                        <Select>
                            {
                                riskLevel.map((item: any) => {
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
export default OtherMsg