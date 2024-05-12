import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import moment from 'moment'
import API from '../../services/API'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap';

const Consumer = () => {
    const { user } = useSelector((state) => state.auth)
    const [data, setData] = useState([])
    const getDonars = async () => {
        try {
            const { data } = await API.post('/inventory/get-inventory-hospital', {
                filters: {
                    inventoryType: 'out',
                    hospital: user?._id
                }
            })

            if (data?.success) {
                setData(data?.inventory)
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getDonars()
    }, [])

    return (
        <Layout>
            <div className='container' style={{ position: 'relative', minHeight: '100vh', paddingTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                <img src="https://c0.wallpaperflare.com/preview/547/942/519/laboratory-medical-medicine-hand.jpg" alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />
                <Card style={{ width: '100%', backgroundColor: 'rgba(210, 130, 240, 0.5)', opacity: 0.7 }}>
                    <Card.Body>
                        <table className="table" style={{ backgroundColor: 'rgba(210, 130, 240, 0.5)', opacity: 0.7, '!important': true }}>
                            <thead>
                                <tr>
                                    <th scope="col">Blood Group</th>
                                    <th scope="col">Inventory Type</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Date</th>

                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((record) => (
                                    <tr key={record._id}>
                                        <td>{record.bloodGroup}</td>
                                        <td>{record.inventoryType}</td>
                                        <td>{record.quantity}</td>
                                        <td>{record.email}</td>
                                        <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    )
}

export default Consumer
