import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import API from '../../services/API'
import moment from 'moment'
import { Card } from 'react-bootstrap';

const Donar = () => {
    const [data, setData] = useState([])
    const getDonars = async () => {
        try {
            const { data } = await API.get('/inventory/get-donars')
            // console.log(data)
            if (data?.success) {
                setData(data?.donars)
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
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Date</th>

                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((record) => (
                                    <tr key={record._id}>
                                        <td>{record.name || record.organisationName + " (ORG)"}</td>
                                        <td>{record.email}</td>
                                        <td>{record.phone}</td>
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

export default Donar
