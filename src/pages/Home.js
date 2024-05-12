import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/shared/Spinner'
import Layout from '../components/shared/Layout/Layout'
import Modal from '../components/shared/modal/Modal'
import API from '../services/API'
import moment from 'moment'
import { Card } from 'react-bootstrap';


const Home = () => {
    const { loading, error, user } = useSelector((state) => state.auth)
    const [data, setData] = useState([])
    const navigate = useNavigate()
    //get function
    const getBloodRecords = async () => {
        try {
            const { data } = await API.get('/inventory/get-inventory')
            if (data?.success) {
                setData(data?.inventory)
                // console.log(data)
                // console.log("Success")
                // console.log(typeof data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getBloodRecords()
    }, [])
    return (
        <Layout>
            {(user?.role === "admin" && navigate("/admin")) || (user?.role === "donar" && navigate("/organisation")) || (user?.role === "hospital" && navigate("/organisation"))}
            {error && <span>{alert(error)}</span>}
            {loading ? (
                <Spinner />
            ) : (
                <>

                    <div className='container' style={{ position: 'relative', minHeight: '100vh' }}>
                        <img src="https://c0.wallpaperflare.com/preview/547/942/519/laboratory-medical-medicine-hand.jpg" alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />
                        <h4 className='ms-4'
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            style={{ cursor: 'pointer', padding: 20 }}>
                            <i className="fa-solid fa-plus-minus"></i>
                            Set Donation/Transfusion
                        </h4>
                        {/* <style>
                            {`
                .table-transparent {
                    background-color: transparent !important;
                }
                `}
                        </style> */}
                        <Card style={{ width: '100%', backgroundColor: 'rgba(210, 130, 240, 0.5)', opacity: 0.7 }}>
                            <Card.Body>
                                <table className="table mt-3" style={{ backgroundColor: 'rgba(210, 130, 240, 0.5)', opacity: 0.7, '!important': true }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">Blood Group</th>
                                            <th scope="col">Inventory Type</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Donor/Hospital Email</th>
                                            <th scope="col">Time & Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.map((record) => (
                                            <tr key={record._id}>
                                                <td>{record.bloodGroup}</td>
                                                <td>{record.inventoryType}</td>
                                                <td>{record.quantity} (ML)</td>
                                                <td>{record.email}</td>
                                                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </Card.Body>
                        </Card>

                        <Modal />
                    </div>
                </>
            )}
        </Layout>
    )
}

export default Home
