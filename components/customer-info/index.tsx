import React, {useRef, useState} from "react";
import {Button, Card, Tabs, Form, Row, Col} from "antd";
import {WarningOutlined} from '@ant-design/icons'
import _pick from 'lodash/pick'
import HolderMsg from "./holder-msg";
import OtherMsg from "./other-msg";
import FooterToolbar from "../footer-tool-bar";
import {findSameElementInArray} from "../../utils/tools";
import {requireNameObj, allFormList} from "../../data/is-require-name";
import {tabPaneKeyObj} from "../../data/tabpane-key-data";
import {holderMsgNameList, otherMsgNameList} from "../../data/form-item-name";
import {useHolderMsg} from "./holder-msg/store/useHolderMsg";
import {useCustomerInfo} from "./store/useCustomerInfo";
import store from "../../store/store";
import {submitHolderMsg, submitOtherMsg} from "../../api/request";

const { TabPane } = Tabs;
const {Item} = Form

const CustomerInfo = () => {

    const [form] = Form.useForm()
    const [holderMsgErr, setHolderMsgErr] = useState(false)
    const [otherMsgErr, setOtherMsgErr] = useState(false)
    const {updateHolderMsgData, updateOtherMsgData} = useCustomerInfo()

    const handleFinish = (value: any) => {
        // 筛选各表单中的value
        const {customerInfo} = store.getState()
        const originCustomerInfoData = customerInfo.toJS()
        const {holderMsgData, otherMsgData} = originCustomerInfoData
        // 提交持有人信息数据
        submitHolderMsg(holderMsgData)
        submitOtherMsg(otherMsgData)
        // 清除错误提示
        setHolderMsgErr(false)
        setOtherMsgErr(false)
    }

    const handleFinishFailed = () => {
        form.validateFields().then(res => {
        }).catch(err => {
            const errorNameList: any[] = []
            err.errorFields.forEach((item: any) => {
                if(item.errors.length !== 0) {
                    errorNameList.push(item.name[0])
                }
            })
            // 验证不通过的表单
            const hasErrFormList = findSameElementInArray(requireNameObj, errorNameList)
            allFormList.forEach(el => {
                hasErrFormList.forEach(item => {
                    if(el === item && item === 'holderMsg') {
                        setHolderMsgErr(true)
                        return
                    }
                    if(hasErrFormList.indexOf('holderMsg') < 0) {
                        setHolderMsgErr(false)
                        return
                    }
                    if(el === item && item === 'otherMsg') {
                        setOtherMsgErr(true)
                        return
                    }
                    if(hasErrFormList.indexOf('otherMsg') < 0) {
                        setOtherMsgErr(false)
                        return
                    }
                })
            })
        })
    }

    const handleValuesChange = (_: any, allValues: any) => {
        // 当用户改变数据时实时存储到store
        const holderMsgValue = _pick(allValues, holderMsgNameList)
        const otherMsgValue = _pick(allValues, otherMsgNameList)
        updateHolderMsgData(holderMsgValue)
        updateOtherMsgData(otherMsgValue)
    }

    return (
        <>
            <Card title="客户信息">
                <Tabs defaultActiveKey="1">
                    <TabPane forceRender tab={holderMsgErr ? errStyleNode('持有人信息') : '持有人信息'} key="1">
                        <HolderMsg form={form} />
                    </TabPane>
                    <TabPane forceRender tab={otherMsgErr ? errStyleNode('其他信息') : '其他信息'} key="2">
                        <OtherMsg form={form} />
                    </TabPane>
                </Tabs>

            </Card>
            <FooterToolbar>
                <Row>
                    <Col style={{marginRight: '30px'}}>
                        <Button type="default">
                            保存
                        </Button>
                    </Col>
                    <Col>
                        <Form onValuesChange={handleValuesChange} style={{display: 'inline-block', lineHeight: '56px'}} form={form} onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
                            <>
                                <Item>
                                    <Button type="primary" htmlType="submit">
                                        提交
                                    </Button>
                                </Item>
                            </>
                        </Form>
                    </Col>
                </Row>
            </FooterToolbar>
        </>
    )
}

const errStyleNode = (tabTitle: string) => {
    return (
        <span style={{color: 'red'}}>
            <WarningOutlined />
            {tabTitle}
        </span>
    )
}

export default CustomerInfo