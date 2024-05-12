import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import moment from 'moment'
import API from '../../services/API'

const OrgList = () => {
    const [data, setData] = useState([])
    const getDonars = async () => {
        try {
            const { data } = await API.get('/admin/org-list')
            // console.log(data)
            if (data?.success) {
                setData(data?.orgData)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getDonars()
    }, [])

    //Delete Function
    const handleDelete = async (id) => {
        try {
            let answer = window.prompt('Are you sure you want to delete this record', 'Sure')
            if (!answer) return
            const { data } = await API.delete(`/admin/delete-donar/${id}`)
            alert(data?.message)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <div className='container' style={{ position: 'relative', minHeight: '100vh', paddingTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                <img src="https://c0.wallpaperflare.com/preview/547/942/519/laboratory-medical-medicine-hand.jpg" alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />
                <table className="table" style={{ backgroundColor: 'rgba(210, 130, 240, 0.5)', opacity: 0.7, '!important': true }}>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((record) => (
                            <tr key={record._id}>
                                <td>{record.organisationName}</td>
                                <td>{record.email}</td>
                                <td>{record.phone}</td>
                                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => handleDelete(record._id)}>
                                        DELETE
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default OrgList
