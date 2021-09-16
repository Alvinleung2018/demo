import React, {useState, useContext, useEffect} from "react";
import {Table, Modal, Button, Form, Input, message} from "antd";
import PhoneEditModal from "./phoneEditModal";
import {phoneFormData, emailFormData} from "../../../data/table-data";
import {useCustomerInfo} from "../store/useCustomerInfo";
import {phoneTableNameList} from "../../../data/form-item-name";

const CustomContext = React.createContext(null)

const TableForm = (props) => {

    const {form} = props
    const [phoneData, setPhoneData] = useState(phoneFormData),
        [phoneEditModalVisible, setPhoneEditModalVisible] = useState(false),
        [phoneCreateModalVisible, setPhoneCreateModalVisible] = useState(false);

    const [emailEditModalVisible, setEmailEditModalVisible] = useState(false),
        [emailData, setEmailData] = useState(emailFormData)

    const {updatePhoneTableData, updateEmailTableData} = useCustomerInfo()

    useEffect(() => {
        savePhoneDataToStore()
        saveEmailDataToStore()
    }, [])

    function savePhoneDataToStore() {
        if(!phoneData) return
        updatePhoneTableData(phoneFormData[0])
    }

    function saveEmailDataToStore() {
        if(!emailData) return
        updateEmailTableData(emailFormData[0])
    }


    // 自定义行元素
    const CustomPhoneTableRow: React.FC = (props) => {
        console.log('row', props)
        return (
            <Form form={form} component={false}>
                <CustomContext.Provider value={form}>
                    <tr {...props} />
                </CustomContext.Provider>
            </Form>
        )
    }

// 自定义单元格
    const CustomPhoneTableCell: React.FC = (props) => {
        console.log('cell',props)
        const {children, title, dataIndex, record, ...restProps} = props
        const form = useContext(CustomContext)
        console.log(dataIndex)

        let childNode;
        console.log(dataIndex)
        if(record && record[dataIndex]) {
            // 把数据放入表单
            form.setFieldsValue({ [dataIndex]: record[dataIndex] })
        } else {
            form.setFieldsValue({ [dataIndex]: '' })
        }
        childNode = (
            <Form.Item name={dataIndex}
            >
                <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }}>
                    {children}
                </div>
            </Form.Item>
        )

        return <td {...restProps}>{childNode}</td>;
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
                       <PhoneEditModal visible={phoneEditModalVisible} title="编辑手机号码" mode="phone" handleCancel={phoneEditModalCancel} record={record} recordIndex={index} onOk={handleEditPhone}>
                           <Button onClick={phoneEditModalOpen}>Edit</Button>
                       </PhoneEditModal>
                       <Button type="primary" danger style={{marginLeft: '30px'}} onClick={deletePhoneData}>Delete</Button>
                   </span>
                )
            }
        }
    ]

    const createColumns = () => {
        return phoneColumns.map(col => {
            return {
                ...col,
                onCell: (record) => {
                    return {
                        record,
                        dataIndex: col.dataIndex,
                        title: col.title,
                    }
                }
            }
        })
    }

    // 自定义行元素
    const CustomEmailTableRow: React.FC = (props) => {
        console.log('row', props)
        return (
            <Form form={form} component={false}>
                <CustomContext.Provider value={form}>
                    <tr {...props} />
                </CustomContext.Provider>
            </Form>
        )
    }

// 自定义单元格
    const CustomEmailTableCell: React.FC = (props) => {
        console.log('cell',props)
        const {children, title, dataIndex, record, ...restProps} = props
        const form = useContext(CustomContext)
        let childNode;
        if(record && record[dataIndex]) {
            // 把数据放入表单
            form.setFieldsValue({ [dataIndex]: record[dataIndex] })
        } else {
            form.setFieldsValue({ [dataIndex]: '' })
        }
        childNode = (
            <Form.Item name={dataIndex}
            >
                <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }}>
                    {children}
                </div>
            </Form.Item>
        )

        return <td {...restProps}>{childNode}</td>;
    }

    const emailTableComponents = {
        body: {
            row: CustomEmailTableRow,
            cell: CustomEmailTableCell,
        },
    }

    const emailColumns = [
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
                       <PhoneEditModal visible={emailEditModalVisible} title="编辑邮箱" mode="email" handleCancel={emailEditModalCancel} onOk={handleEditEmail}>
                           <Button onClick={emailEditModalOpen}>Edit</Button>
                       </PhoneEditModal>
                         <Button style={{marginLeft: '30px'}} type="primary" danger onClick={deleteEmailData}>Delete</Button>
                   </span>
                )
            }
        }
    ]

    const createEmailColumns = () => {
        return emailColumns.map(col => {
            return {
                ...col,
                onCell: (record) => {
                    return {
                        record,
                        dataIndex: col.dataIndex,
                        title: col.title,
                    }
                }
            }
        })
    }

    const phoneEditModalOpen = () => {
        setPhoneEditModalVisible(true)
    }

    const phoneEditModalCancel = () => {
        setPhoneEditModalVisible(false)
    }

    const phoneCreateModalOpen = () => {
        setPhoneCreateModalVisible(true)
    }

    const phoneCreateModalCancel = () => {
        setPhoneCreateModalVisible(false)
    }

    // 提交新增手机号表单
    const handleCreatePhone = (value) => {
        setPhoneData([...phoneData, value])
        setPhoneCreateModalVisible(false)
        message.success('新增成功')
    }

    //提交编辑手机号表单
    const handleEditPhone = (value) => {
        setPhoneData(value)
        setPhoneEditModalVisible(false)
        message.success('修改成功')
    }

    // 打开邮箱编辑框
    const emailEditModalOpen = () => {
        setEmailEditModalVisible(true)
    }

    // 关闭邮箱编辑框
    const emailEditModalCancel = () => {
        setEmailEditModalVisible(false)
    }

    const handleEditEmail = (value) => {
        setEmailData([value])
        setEmailEditModalVisible(false)
        message.success('修改邮箱成功')
    }

    // 删除手机信息
    const deletePhoneData = () => {
        setPhoneData([])
        updatePhoneTableData({})
    }

    // 删除手机信息
    const deleteEmailData = () => {
        setEmailData([])
        updateEmailTableData({})
    }

    return (
        <>
            <PhoneEditModal title="新增手机号" mode="phone" visible={phoneCreateModalVisible} handleCancel={phoneCreateModalCancel} onOk={handleCreatePhone}>
                <Button type="primary" onClick={phoneCreateModalOpen}>Create</Button>
            </PhoneEditModal>
            <Table rowKey="phoneTable"
                   bordered
                   dataSource={phoneData}
                   columns={createColumns()}
                   components={phoneTableComponents}

            />
            <Table rowKey="emailTable"
                   bordered
                   dataSource={emailData}
                   columns={emailColumns}
                   components={emailTableComponents}
            />
            <Table rowKey="addressTable"

            />
        </>
    )
}

export default TableForm