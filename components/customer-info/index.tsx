import React, {useRef, useState} from "react";
import {Button, Card, Tabs, Form, Row, Col, Modal} from "antd";
import {WarningOutlined} from '@ant-design/icons'
import _pick from 'lodash/pick'
import _head from 'lodash/head'
import HolderMsg from "./holder-msg";
import OtherMsg from "./other-msg";
import AccountMsg from "./account-msg";
import TableForm from "./table-form";
import EditableTable from "./text-form";
import FooterToolbar from "../footer-tool-bar";
import {findSameElementInArray} from "../../utils/tools";
import {requireNameObj, allFormList} from "../../data/is-require-name";
import {tabPaneKeyObj} from "../../data/tabpane-key-data";
import {holderMsgNameList, otherMsgNameList, accountMsgNameList, phoneTableNameList, emailTableNameList} from "../../data/form-item-name";
import {useCustomerInfo} from "./store/useCustomerInfo";
import store from "../../store/store";
import {submitAccountMsg, submitHolderMsg, submitOtherMsg, submitTextFormPhone, submitTextFormEmail} from "../../api/request";
import {log} from "util";

const { TabPane } = Tabs;
const {Item} = Form

const CustomerInfo = () => {

    const [form] = Form.useForm()
    const [holderMsgErr, setHolderMsgErr] = useState(false),
        [otherMsgErr, setOtherMsgErr] = useState(false),
        [accountMsgErr, setAccountMsgErr] = useState(false),
        [phoneTableErr, setPhoneTableErr] = useState(false),
        [emailTableErr, setEmailTableErr] = useState(false),
        [addressTableErr, setAddressTableErr] = useState(false);

    const [hasMsgErr, setMsgErr] = useState(false)

    const [activeKey, setActiveKey] = useState('tableForm')
    const {updateHolderMsgData, updateOtherMsgData, updateAccountMsgData} = useCustomerInfo()

    const handleFinish = (value: any) => {
        console.log('handleFinish',value)

        // 筛选各表单中的value
        const {customerInfo} = store.getState()
        const originCustomerInfoData = customerInfo.toJS()
        const {holderMsgData, otherMsgData, accountMsgData, phoneTableData, emailTableData, textForm} = originCustomerInfoData
        console.log(textForm)
        // 校验获取的手机号是否存在或齐全
        if(textForm.phoneTableData.length === 0) {
            // 清除错误提示
            setHolderMsgErr(false)
            setOtherMsgErr(false)
            setAccountMsgErr(false)
            // phoneTable出现错误提示
            setPhoneTableErr(true)

            setActiveKey('tableForm')
            Modal.error({title: '提示', content: '手机号信息不全'})
            return
        }

        // 校验获取的邮箱是否存在或齐全
        if(textForm.emailTableData.length === 0) {
            // 清除错误提示
            setHolderMsgErr(false)
            setOtherMsgErr(false)
            setAccountMsgErr(false)
            // phoneTable出现错误提示
            setEmailTableErr(true)

            setActiveKey('tableForm')
            Modal.error({title: '提示', content: '邮箱信息不全'})
            return
        }


        // 提交持有人信息数据
        submitHolderMsg(holderMsgData)
        submitOtherMsg(otherMsgData)
        submitAccountMsg(accountMsgData)
        submitTextFormPhone(textForm.phoneTableData)
        submitTextFormPhone(textForm.emailTableData)

        // 清除phoneTable，emailTable出现错误提示
        setEmailTableErr(false)
        setPhoneTableErr(false)
        setHolderMsgErr(false)
        setOtherMsgErr(false)
        setAccountMsgErr(false)

    }

    const handleFinishFailed = () => {
        form.validateFields().then(res => {
        }).catch(err => {
            const {customerInfo} = store.getState()
            const originCustomerInfoData = customerInfo.toJS()
            const {textForm} = originCustomerInfoData
            console.log('textForm.phoneTableData.length > 0',textForm.phoneTableData.length > 0)

            // 校验获取的手机号是否存在或齐全
            if(textForm.phoneTableData.length > 0) {
                // phoneTable清除错误提示
                setPhoneTableErr(false)
            }

            // 校验获取的邮箱是否存在或齐全
            if(textForm.emailTableData.length > 0) {
                // phoneTable清除错误提示
                setEmailTableErr(false)
            }

            console.log('err',err)
            const errorNameList: any[] = []
            err.errorFields.forEach((item: any) => {
                if(item.errors.length !== 0) {
                    errorNameList.push(item.name[0])
                }
            })
           console.log('errorNameList',errorNameList)

            // 验证不通过的表单
            const hasErrFormList = findSameElementInArray(requireNameObj, errorNameList)

            setActiveKey(hasErrFormList[0])
            const firstForm =_head(hasErrFormList)
            // @ts-ignore
            const firstFormArr = firstForm.split(' ')

            allFormList.forEach(el => {
                console.log('el', el)
                firstFormArr.forEach(item => {
                    console.log('item', item)
                    console.log(el === item)
                    if(el === item && item === 'holderMsg') {
                        setHolderMsgErr(true)
                    }
                    if(hasErrFormList.indexOf('holderMsg') < 0) {
                        setHolderMsgErr(false)

                    }
                    if(el === item && item === 'otherMsg') {
                        setOtherMsgErr(true)
                    }
                    if(hasErrFormList.indexOf('otherMsg') < 0) {
                        setOtherMsgErr(false)

                    }
                    if(el === item && item === 'accountMsg') {
                        setAccountMsgErr(true)

                    }
                    if(hasErrFormList.indexOf('accountMsg') < 0) {
                        setAccountMsgErr(false)

                    }
                })
            })
        })
    }

    const handleValuesChange = (_: any, allValues: any) => {
        // 当用户改变数据时实时存储到store
        const holderMsgValue = _pick(allValues, holderMsgNameList)
        const otherMsgValue = _pick(allValues, otherMsgNameList)
        const accountMsgValue = _pick(allValues, accountMsgNameList)
        updateHolderMsgData(holderMsgValue)
        updateOtherMsgData(otherMsgValue)
        updateAccountMsgData(accountMsgValue)
    }

    const handleTabsChange = (activeKey: string) => {
        setActiveKey(activeKey)
    }


    return (
        <>
            <Card title="客户信息">
                <Tabs defaultActiveKey="tableForm" activeKey={activeKey} onChange={handleTabsChange}>
                    <TabPane forceRender tab={holderMsgErr ? errStyleNode('持有人信息') : '持有人信息'} key="holderMsg">
                        <HolderMsg form={form} />
                    </TabPane>
                    <TabPane forceRender tab={otherMsgErr ? errStyleNode('其他信息') : '其他信息'} key="otherMsg">
                        <OtherMsg form={form} />
                    </TabPane>
                    <TabPane forceRender tab={accountMsgErr ? errStyleNode('账户信息') : '账户信息'} key="accountMsg">
                        <AccountMsg form={form} />
                    </TabPane>
                    <TabPane forceRender key="tableForm" tab={phoneTableErr || emailTableErr ? errStyleNode('表格') : '表格'}>
                        {/*<TableForm form={form} />*/}
                        <EditableTable form={form} />
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