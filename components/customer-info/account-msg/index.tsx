import React from "react";
import {Col, DatePicker, Form, Input, Row, Select} from "antd";
import {accountType, riskDisclosure, riskLevel, settlementMethod} from "../../../data/select-data";

const {Item} = Form
const {Option} = Select

const AccountMsg = (props: any) => {

    const {form} = props

    return (
        <Form form={form} layout="vertical" >
            <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                    <Item  label="账户类别"
                           name="accountType"
                           rules={[
                               {
                                   required: true,
                                   message: '请选择账户类别'
                               }
                           ]}
                    >
                        <Select>
                            {
                                accountType.map((item: any) => {
                                    return <Option key={item.id} value={item.value}>{item.value}</Option>
                                })
                            }
                        </Select>
                    </Item>
                </Col>
                <Col lg={6} md={12} sm={24}>
                    <Item  label="账户名称"
                           name="accountName"
                           rules={[
                               {
                                   required: true,
                                   message: '请输入账户名称'
                               }
                           ]}
                    >
                        <Input style={{ width: '100%' }}
                               placeholder="请输入账户名称"
                        />
                    </Item>
                </Col>
                <Col lg={6} md={12} sm={24}>
                    <Item  label="开户地址"
                           name="accountAddress"
                    >
                        <Input style={{ width: '100%' }}
                               placeholder="请输入开户地址"
                        />
                    </Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                    <Item label="交易额度到期日" name="transactionLimitExpirationDate">
                        <DatePicker style={{ width: '100%' }} />
                    </Item>
                </Col>
                <Col lg={6} md={12} sm={24}>
                    <Item label="保证金户常设授权到期日" name="transactionLimitAuthDate">
                        <DatePicker style={{ width: '100%' }} />
                    </Item>
                </Col>
                <Col lg={6} md={12} sm={24}>
                    <Item  label="结算方式"
                           name="settlementMethod"
                    >
                        <Select>
                            {
                                settlementMethod.map((item: any) => {
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
export default AccountMsg