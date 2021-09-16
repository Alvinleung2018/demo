import React, {useState, useContext, useEffect} from "react";
import {Table, Modal, Button, Form, Input, message} from "antd";
import {emailFormData, getEmailFormData, getPhoneFormData, phoneFormData} from "../../../data/table-data";
import PhoneEditModal from "../table-form/phoneEditModal";
import {useCustomerInfo} from "../store/useCustomerInfo";
import {lowerFirst} from "lodash";

const TextForm = () => {

    const [phoneData, setPhoneData] = useState([]),
        [phoneRecordIndex, setPhoneRecordIndex] = useState(false),
        [phoneEditModalVisible, setPhoneEditModalVisible] = useState(false),
        [phoneCreateModalVisible, setPhoneCreateModalVisible] = useState(false);

    const [emailData, setEmailData] = useState([]),
        [emailRecordIndex, setEmailRecordIndex] = useState(false),
        [emailEditModalVisible, setEmailEditModalVisible] = useState(false),
        [emailCreateModalVisible, setEmailCreateModalVisible] = useState(false);

    const {updatePhoneTableData, updateEmailTableData} = useCustomerInfo()


    useEffect(() => {
        getPhoneFormData().then((res: any) => {
            setPhoneData(res)
            savePhoneDataToStore(res)
        })

        getEmailFormData().then((res: any) => {
            setEmailData(res)
            saveEmailDataToStore(res)
        })
    }, [])

    function savePhoneDataToStore(data) {
        if(!data) return
        updatePhoneTableData(data)
    }

    function saveEmailDataToStore(data) {
        if(!data) return
        updateEmailTableData(data)
    }

    const CustomPhoneTableRow: React.FC = (props) => {
        console.log('row', props)
        return <tr {...props} />
    }

    const CustomPhoneTableCell: React.FC  = (props) => {
        console.log('cell',props)
        const {children} = props
        return (
            <td>
                <div>{children}</div>
            </td>
        )
    }

    const phoneTableComponents = {
        body: {
            row: CustomPhoneTableRow,
            cell: CustomPhoneTableCell,
        },
    }

    const phoneColumns = [
        {
            title: '区号',
            dataIndex: 'areaCode'
        },
        {
            title: '手机号',
            dataIndex: 'phoneNumber'
        },
        {
            title: '默认',
            dataIndex: 'isDefault'
        },
        {
            title: '操作',
            dataIndex: 'operation',
            // eslint-disable-next-line react/display-name
            render: (text, record, index) => {
                return (
                    <span>
                       <PhoneEditModal visible={phoneEditModalVisible}
                                       title="编辑手机号码"
                                       mode="phone"
                                       handleCancel={phoneEditModalCancel}
                                       onOk={handleEditPhone}
                       >
                           <Button onClick={() => {phoneEditModalOpen(index)}}>Edit</Button>
                       </PhoneEditModal>
                       <Button type="primary" danger style={{marginLeft: '30px'}} onClick={() => {deletePhoneData(index)}}>Delete</Button>
                   </span>
                )
            }
        }
    ]

    const createPhoneColumns = () => {
        return phoneColumns.map(col => {
            console.log('col',col)
            return {
                ...col,
                onCell: (record, rowIndex) => {
                    return {
                        record,
                        dataIndex: col.dataIndex,
                        title: col.title,
                    }
                }
            }
        })
    }

    const emailColumn = [
        {
            title: '邮箱',
            dataIndex: 'email'
        },
        {
            title: '默认',
            dataIndex: 'emailIsDefault'
        },
        {
            title: '操作',
            dataIndex: 'operation',
            // eslint-disable-next-line react/display-name
            render: (text, record, index) => {
                return (
                    <span>
                       <PhoneEditModal visible={emailEditModalVisible}
                                       title="编辑邮箱"
                                       mode="email"
                                       handleCancel={emailCreateModalCancel}
                                       onOk={handleEditEmail}
                       >
                           <Button onClick={() => {emailEditModalOpen(index)}}>Edit</Button>
                       </PhoneEditModal>
                       <Button type="primary" danger style={{marginLeft: '30px'}} onClick={() => {deleteEmailData(index)}}>Delete</Button>
                   </span>
                )
            }
        }
    ]


    function phoneEditModalOpen(index) {
        // 获取当前记录下标
        setPhoneRecordIndex(index)
        setPhoneEditModalVisible(true)
    }

    function phoneEditModalCancel() {
        setPhoneEditModalVisible(false)
    }

    // 提交新增手机号表单
    const handleCreatePhone = (value) => {
        // @ts-ignore
        setPhoneData([...phoneData, value])
        savePhoneDataToStore([...phoneData, value])
        setPhoneCreateModalVisible(false)
        message.success('新增成功')
    }

    //提交编辑手机号表单
    function handleEditPhone(value: any) {
        const cloneArr = [...phoneData]
        // @ts-ignore
        cloneArr[phoneRecordIndex] = value
        savePhoneDataToStore(cloneArr)
        setPhoneData(cloneArr)
        setPhoneEditModalVisible(false)
        message.success('修改成功')
    }

    function deletePhoneData(index) {
        const cloneArr = [...phoneData]
        // @ts-ignore
        delete cloneArr[index]
        const filterArr = cloneArr.filter(item => item)
        savePhoneDataToStore(filterArr)
        setPhoneData(filterArr)
        setPhoneEditModalVisible(false)
        message.success('删除成功')
    }

    const phoneCreateModalOpen = () => {
        setPhoneCreateModalVisible(true)
    }

    const phoneCreateModalCancel = () => {
        setPhoneCreateModalVisible(false)
    }

    const emailCreateModalOpen = () => {
        setEmailCreateModalVisible(true)
    }

    const emailCreateModalCancel = () => {
        setPhoneCreateModalVisible(false)
    }

    const handleCreateEmail = (value) => {
        // @ts-ignore
        setEmailData([...emailData, value])
        saveEmailDataToStore([...emailData, value])
        setEmailCreateModalVisible(false)
        message.success('新增成功')
    }

    const handleEditEmail = (value) => {
        const cloneArr = [...emailData]
        // @ts-ignore
        cloneArr[emailRecordIndex] = value
        saveEmailDataToStore(cloneArr)
        setEmailData(cloneArr)
        setEmailEditModalVisible(false)
        message.success('修改成功')
    }

    const deleteEmailData = (index: number) => {
        const cloneArr = [...emailData]
        // @ts-ignore
        delete cloneArr[index]
        const filterArr = cloneArr.filter(item => item)
        saveEmailDataToStore(filterArr)
        setEmailData(filterArr)
        setEmailEditModalVisible(false)
        message.success('删除成功')
    }

    const emailEditModalOpen = (index: number) => {
        setEmailRecordIndex(index)
        setEmailEditModalVisible(true)
    }

    return (
        <>
            <PhoneEditModal title="新增手机号" mode="phone" visible={phoneCreateModalVisible} handleCancel={phoneCreateModalCancel} onOk={handleCreatePhone}>
                <Button type="primary" onClick={phoneCreateModalOpen}>Create</Button>
            </PhoneEditModal>
            <Table rowKey="phoneTextForm"
                   bordered
                   dataSource={phoneData}
                   components={phoneTableComponents}
                   columns={createPhoneColumns()}
            />
            <PhoneEditModal title="新增邮箱号" mode="email" visible={emailCreateModalVisible} handleCancel={emailCreateModalCancel} onOk={handleCreateEmail}>
                <Button type="primary" onClick={emailCreateModalOpen}>Create</Button>
            </PhoneEditModal>
            <Table rowKey="emailTextForm"
                   bordered
                   dataSource={emailData}
                   components={phoneTableComponents}
                   columns={emailColumn}
            />
        </>
    )
}

export default TextForm